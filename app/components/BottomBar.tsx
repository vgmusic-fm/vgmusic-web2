import React from "react";

import { FaCloudRain, FaForward, FaPause, FaPlay, FaVolumeUp } from "react-icons/fa";

import type { Track } from "~/track";
import { ProgressBar } from "./ProgressBar";
import { Spinner } from "./Spinner";

type BottomBarProps = {
  track: Track;
  onNextTrack: () => void;
}

export const BottomBar: React.FC<BottomBarProps> = ({ track, onNextTrack }) => {
  const audioPlayer = React.useRef<HTMLAudioElement>(null);
  const rainPlayer = React.useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = React.useState<boolean>(false);
  const [currentVolume, setCurrentVolume] = React.useState<number>(50);
  const [volumeDisplayed, setVolumeDisplayed] = React.useState<boolean>(false);
  const [currentRainVolume, setCurrentRainVolume] = React.useState<number>(0);
  const [rainVolumeDisplayed, setRainVolumeDisplayed] = React.useState<boolean>(false);
  const [currentPosition, setCurrentPosition] = React.useState<number>(0);
  const [currentProgress, setCurrentProgress] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);

  const togglePlayer = async () => {
    if (!audioPlayer.current) return;

    if (!playing) {
      await startPlaying();
    }

    if (playing) {
      await pausePlaying();
    }
  }

  const startPlaying = async () => {
    if (!audioPlayer.current) return;

    await audioPlayer.current.play();

    setPlaying(true);
  }

  const pausePlaying = async () => {
    if (!audioPlayer.current) return;

    audioPlayer.current.pause()

    setPlaying(false);
  }

  const onNextTrackClick = () => {
    setLoading(true);
    onNextTrack();
  }

  const onRainClick = async () => {
    if (!rainPlayer.current) return;

    if (volumeDisplayed) {
      setVolumeDisplayed(false);
    }

    setRainVolumeDisplayed(!rainVolumeDisplayed);

    await rainPlayer.current.play();
  }

  const onVolumeClick = () => {
    if (rainVolumeDisplayed) {
      setRainVolumeDisplayed(false)
    }

    setVolumeDisplayed(!volumeDisplayed);
  }

  React.useEffect(() => {
    if (!rainPlayer.current) return;

    rainPlayer.current.volume = currentRainVolume * 0.01;
  }, [currentRainVolume]);

  React.useEffect(() => {
    if (!audioPlayer.current) return;

    const progress = (currentPosition / audioPlayer.current.duration) * 100;

    setCurrentProgress(progress);
  }, [currentPosition]);

  React.useEffect(() => {
    if (!audioPlayer.current) return;

    audioPlayer.current.addEventListener("loadeddata", () => {
      setCurrentPosition(0);
    });

    audioPlayer.current.addEventListener("timeupdate", () => {
      if (!audioPlayer.current) return;

      setCurrentPosition(audioPlayer.current.currentTime);
    });
  }, [audioPlayer]);

  React.useEffect(() => {
    if (!audioPlayer.current) return;

    setLoading(false);

    audioPlayer.current.setAttribute("src", track.fileUrl);

    setCurrentPosition(0);
    setCurrentProgress(0);

    if (playing) {
      startPlaying();
    }
  }, [track]);

  React.useEffect(() => {
    if (!audioPlayer.current) return;

    audioPlayer.current.volume = currentVolume * 0.01;
  }, [currentVolume]);

  return (
    <>
      <audio preload="none" ref={audioPlayer} className="hidden" src={track.fileUrl} />
      <audio preload="none" ref={rainPlayer} className="hidden" src="/audio/rain.mp3" />
      <div className="flex flex-col">
        <div className="flex flex-row-reverse text-neutral-100 text-lg pb-1 pr-0.5">
          <div className="ml-2 bg-slate-900 p-2 opacity-80 rounded-lg" onClick={() => onNextTrackClick()}>
            <FaForward />
          </div>
          <div className="ml-2 bg-slate-900 p-2 opacity-80 rounded-lg flex flex-col">
            <input
              className={`absolute bottom-32 -right-1 transition duration-100 ease-in-out opacity-70 vertical-slider track-volume ${volumeDisplayed ? "block" : "hidden"}`}
              type="range"
              value={currentVolume}
              // @ts-ignore
              orient="vertical"
              min={0}
              max={100}
              step={1}
              onChange={(e) => setCurrentVolume(parseInt(e.target.value, 10))}
            />
            <FaVolumeUp onClick={() => onVolumeClick()} />
          </div>
          <div className="bg-slate-900 p-2 opacity-80 rounded-lg flex flex-col">
            <input
              className={`absolute bottom-32 right-10 transition duration-100 ease-in-out opacity-70 vertical-slider rain-volume ${rainVolumeDisplayed ? "block" : "hidden"}`}
              type="range"
              value={currentRainVolume}
              // @ts-ignore
              orient="vertical"
              min={0}
              max={100}
              step={1}
              onChange={(e) => setCurrentRainVolume(parseInt(e.target.value, 10))}
            />
            <FaCloudRain onClick={() => onRainClick()} />
          </div>
        </div>
        <div className="flex flex-row justify-between w-full h-20 bg-gradient-to-t from-black to-gray-900 opacity-95 text-white">
          <div className="w-full h-20 flex flex-row">
            <div className="w-20 h-20 min-w-min object-cover bg-black relative group">
              {!loading && (
                <img
                  className={`w-20 h-20 hover:opacity-50 transition duration-300 ease-in-out object-cover ${!playing ? "opacity-50" : "opacity-100"}`}
                  src={track.cover}
                  alt={track.game}
                />
              )}
              {loading && (
                <div className="w-11 ml-4 mt-4 absolute top-0 z-30">
                  <Spinner width="12" height="10" />
                </div>
              )}
              {!playing && !loading && (
                <div className="text-5xl ml-4 mt-4 text-neutral-100 opacity-90 absolute top-0 z-30" onClick={togglePlayer}>
                  <FaPlay />
                </div>
              )}
              {playing && (
                <div className="text-5xl hidden group-hover:block opacity-90 ml-4 mt-4 text-neutral-100 absolute top-0 z-30" onClick={togglePlayer}>
                  <FaPause />
                </div>
              )}
            </div>
            {!loading && (
              <div className="flex w-full ml-1 flex-col pl-3 pr-3 pt-0.5 overflow-hidden whitespace-nowrap">
                <div className="text-3xl block overflow-hidden overflow-ellipsis">
                  {track.title}
                </div>
                <div className="text-xs block overflow-hidden overflow-ellipsis">
                  {track.artists[0] ?? "Unknown Artist"}
                </div>
                <div className="text-xs block overflow-hidden overflow-ellipsis">
                  {track.game ?? "Unknown Game"}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-0.5 absolute bottom-0">
          <ProgressBar currentProgress={currentProgress} />
        </div>
      </div>
    </>
  )
}
