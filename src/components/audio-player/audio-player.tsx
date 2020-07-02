import React from "react";


interface Props {
  isLoading: boolean;
  isPlaying: boolean;
  onPlayButtonClick: () => void;
}

const AuditPlayer: React.FC<Props> = ({isLoading, isPlaying, onPlayButtonClick, children}): JSX.Element => {
  return (
    <>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        disabled={isLoading}
        onClick={() => onPlayButtonClick()}
      />
      <div className="track__status">
        {children}
      </div>
    </>
  );
}

export default AuditPlayer;
