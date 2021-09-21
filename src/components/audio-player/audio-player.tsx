import {Fragment, useState, useEffect, useRef} from 'react';

type AudioPlayerProps = {
  autoPlay: boolean;
  src: string;
}

function AudioPlayer({autoPlay, src}: AudioPlayerProps): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleDataLoaded = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    const playerElement = audioRef.current;

    if (!playerElement) {
      return;
    }

    playerElement.addEventListener('loadeddata', handleDataLoaded);

    return () => {
      playerElement.removeEventListener('loadeddata', handleDataLoaded);
    };
  }, []);

  useEffect(() => {
    const playerElement = audioRef.current;

    if (!isLoaded || !playerElement) {
      return;
    }

    if (isPlaying) {
      playerElement.play();
      return;
    }

    playerElement.pause();
  }, [isPlaying, isLoaded]);

  return (
    <Fragment>
      <button
        className="track__button track__button--play"
        type="button"
        disabled={!isLoaded}
        onClick={() => setIsPlaying(!isPlaying)}
      />
      <div className="track__status">
        <audio
          src={src}
          ref={audioRef}
          data-testid="audio"
        />
      </div>
    </Fragment>
  );
}

export default AudioPlayer;
