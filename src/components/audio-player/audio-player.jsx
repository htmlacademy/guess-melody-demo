import React, {Fragment} from "react";
import PropTypes from "prop-types";


const AudioPlayer = (props) => {
  const {isLoading, onPlayButtonClick, isPlaying, children} = props;

  return (
    <Fragment>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={onPlayButtonClick}
      />
      <div className="track__status">
        {children}
      </div>
    </Fragment>
  );
};

AudioPlayer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};

export default AudioPlayer;
