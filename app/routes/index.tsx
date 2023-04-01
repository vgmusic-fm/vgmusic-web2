import React from "react";

import type { LoaderArgs } from "@remix-run/cloudflare";
import type { Track } from "~/track";

import { json } from "@remix-run/cloudflare";
import { useFetcher, useLoaderData } from "@remix-run/react";

import { BackgroundVideo } from "~/components/BackgroundVideo";
import { BottomBar } from "~/components/BottomBar";
import { TopBar } from "~/components/TopBar";
import { getRandomTrack } from "~/track";
import { randomVideo } from "~/util";

export const loader = async (args: LoaderArgs) => {
  const randomTrack = await getRandomTrack(args.context.SUPABASE_URL, args.context.SUPABASE_SECRET);
  const randomVideoUrl = randomVideo();

  return json({ track: randomTrack, video: randomVideoUrl });
}

export default function Index() {
  const fetcher = useFetcher<typeof loader>();
  const randomData = useLoaderData<typeof loader>();

  const [track, setTrack] = React.useState<Track>(randomData.track);

  React.useEffect(() => {
    if (fetcher.data) {
      setTrack(fetcher.data.track);
    }
  }, [fetcher.data])

  const onNextTrack = () => {
    fetcher.submit({});
  }

  return (
    <>
      <BackgroundVideo initialVideo={randomData.video} />
      <div className="flex flex-col h-full w-full justify-between z-10 fixed bottom-0">
        <TopBar />
        <BottomBar
          track={track}
          onNextTrack={onNextTrack}
        />
      </div>
    </>
  );
}
