import React from 'react';
import {useState} from 'react';
import AudioPlayer from '../../components/audio-player/audio-player';

const withAudioPlayer = (Component) => {
  function WithAudioPlayer(props) {
    const [activePlayerId, setActivePlayerId] = useState(0);
    return (
      <Component
        {...props}
        renderPlayer={(src, id) => (
          <AudioPlayer
            src={src}
            isPlaying={id === activePlayerId}
            onPlayButtonClick={() => {
              setActivePlayerId(activePlayerId === id ? -1 : id);
            }}
          />
        )}
      />
    );
  }

  return WithAudioPlayer;
};

export default withAudioPlayer;
