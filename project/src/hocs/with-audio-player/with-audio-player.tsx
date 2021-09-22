import {ComponentType} from 'react';
import {useState} from 'react';
import AudioPlayer from '../../components/audio-player/audio-player';

type HOCProps = {
  renderPlayer: (src: string, id: number) => void;
};

function withAudioPlayer<T>(Component: ComponentType<T>)
  : ComponentType<Omit<T, keyof HOCProps>> {

  type ComponentProps = Omit<T, keyof HOCProps>;

  function WithAudioPlayer(props: ComponentProps): JSX.Element {
    const [activePlayerId, setActivePlayerId] = useState(0);
    return (
      <Component
        {...props as T}
        renderPlayer={(src: string, id: number) => (
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
}

export default withAudioPlayer;
