import { createClient } from "@supabase/supabase-js";
import { Database } from "./database";

export type Track = {
  title: string;
  fileUrl: string;
  cover: string;
  tags: string[];
  artists: string[];
  game: string;
}

export async function getRandomTrack(dbUrl: string, dbAuthKey: string): Promise<Track> {
  const supabase = createClient<Database>(dbUrl, dbAuthKey, {
    global: {
      fetch: fetch.bind(globalThis),
    }
  });

  const randomTrack = await supabase
    .from("vgmusic_random_track")
    .select("*")
    .limit(1)
    .single();

  if (!randomTrack.data || !randomTrack.data.file) {
    throw Error("Unable to fetch random track");
  }
  
  const igdbImageId = randomTrack.data.igdb_image_id;

  const cover = igdbImageId ?
    `https://images.igdb.com/igdb/image/upload/t_cover_small/${igdbImageId}.jpg` :
    "https://placekitten.com/128/128";


  const track: Track = {
    title: randomTrack.data.title ?? "Untitled",
    fileUrl: randomTrack.data.file,
    tags: randomTrack.data.tags ?? ["unknown"],
    artists: randomTrack.data.artists?.filter((artist) => artist !== "") ?? ["Unknown Artist"],
    game: randomTrack.data.game_title ?? "Unknown Game",
    cover,
  };

  return track;
}
