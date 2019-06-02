import * as React from 'react';
import {Subtract} from "utility-types";
import AudioPlayer from "../../components/audio-player/audio-player";
import withAudio from "../with-audio/with-audio";


interface State {
  activePlayer: number,
}

// Пропсы, которые добавляет хок в компонент
interface InjectedProps {
  renderPlayer: (song: {src: string}, id: number) => typeof AudioPlayerWrapped,
}

const AudioPlayerWrapped = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {
  // Получаем пропсы переданного компонента
  type P = React.ComponentProps<typeof Component>;

  // Вычисляем реальные пропсы, которые нужно передать снаружи в обернутый компонент.
  // P - пропсы компонента, InjectedProps - добавляемые хоком пропсы.
  // T - пропсы, которые нужно передать в обернутый хоком компонент.
  // Условно: T = P - InjectedProps
  // Например: P = {foo: string, bar: string}, InjectedProps = {bar: string}
  // Тогда: T = {foo: string}
  type T = Subtract<P, InjectedProps>;

  class WithActivePlayer extends React.PureComponent<T, State> {
    private playButtonClickHandlers: {};

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

  return WithActivePlayer;
};

export default withActivePlayer;
