import React, {Fragment, useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';

const AudioPlayer = ({defaultIsPlaying, src}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(defaultIsPlaying);

  const audioRef = useRef();

  useEffect(() => {
    audioRef.current.oncanplaythrough = () => setIsLoading(false);
    audioRef.current.onplay = () => setIsPlaying(true);
    audioRef.current.onpause = () => setIsPlaying(false);

    return () => {
      audioRef.current.oncanplaythrough = null;
      audioRef.current.onplay = null;
      audioRef.current.onpause = null;
      audioRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      return;
    }

    audioRef.current.pause();
  }, [isPlaying]);

  return (
    <Fragment>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={() => setIsPlaying(!isPlaying)}
      />
      <div className="track__status">
        <audio src={src} ref={audioRef} />
      </div>
    </Fragment>
  );
};

AudioPlayer.propTypes = {
  defaultIsPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
};

export default AudioPlayer;
