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

      this.playButtonClickHandlers = {};
    }

    // Сложный для понимания метод. Так стоит делать только в крайних методах.
    getOnPlayButtonClick(id) {
      if (!this.playButtonClickHandlers.hasOwnProperty(id)) {
        // Если обработчика нет, то создаем его и кешируем. Если он уже создан, то берем из кеша.
        this.playButtonClickHandlers[id] = () => {
          const {activePlayer} = this.state;
          this.setState({
            activePlayer: activePlayer === id ? -1 : id
          });
        };
      }

      return this.playButtonClickHandlers[id];
    }

    render() {
      const {activePlayer} = this.state;

      return <Component
        {...this.props}
        renderPlayer={(it, i) => {
          return <AudioPlayerWrapped
            src={it.src}
            isPlaying={i === activePlayer}
            onPlayButtonClick={this.getOnPlayButtonClick(i)}
          />;
        }}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
