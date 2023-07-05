import {Fragment, useState, useEffect, useRef} from 'react';
import cn from 'classnames';
import {useElementListener} from '../../hooks/use-element-listener';

type AudioPlayerProps = {
  isPlaying: boolean;
  src: string;
  onPlayButtonClick: () => void;
}

function AudioPlayer({isPlaying, src, onPlayButtonClick}: AudioPlayerProps): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleDataLoaded = () => {
    setIsLoaded(true);
  };

  useElementListener('loadeddata', audioRef, handleDataLoaded);

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
        className={cn(
          'track__button',
          {'track__button--play': !isPlaying},
          {'track__button--pause': isPlaying}
        )}
        type="button"
        disabled={!isLoaded}
        onClick={onPlayButtonClick}
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
