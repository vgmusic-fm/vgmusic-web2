import React from "react";

import { randomVideo } from "~/util";

const TIMER_INTERVAL = 1000 * 60 * 2;

type BackgroundVideoProps = {
  initialVideo: string;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ initialVideo }) => {
  const [currentVideo, setCurrentVideo] = React.useState(initialVideo);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {

      setLoading(true);

      setTimeout(() => {
        setCurrentVideo(randomVideo());
        setLoading(false);
      }, 1000);
      
    }, TIMER_INTERVAL);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <video
      className={`z-0 fixed right-0 left-0 transition-opacity w-full h-full object-cover ${loading ? 'opacity-0' : 'opacity-100'}`}
      autoPlay
      loop
      muted
      src={currentVideo}
    />
  )
}
