import React, {PureComponent} from 'react';
import AudioPlayer from "../../components/audio-player/audio-player.jsx";
import withAudio from "../with-audio/with-audio";


const AudioPlayerWrapped = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1,
      };
    }

    render() {
      const {activePlayer} = this.state;

      return <Component
        {...this.props}
        renderPlayer={(it, i) => {
          return <AudioPlayerWrapped
            src={it.src}
            isPlaying={i === activePlayer}
            onPlayButtonClick={() => this.setState({
              activePlayer: activePlayer === i ? -1 : i
            })}
          />;
        }}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
