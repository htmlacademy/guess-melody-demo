import * as React from 'react';
import {Subtract} from "utility-types";


interface Props {
  answers: {
    src: string,
    genre: string,
  }[],
  onAnswer: (answers: boolean[]) => void,
}

interface State {
  userAnswers: boolean[],
}

interface InjectedProps {
  userAnswer: boolean[],
  onChange: (i: number) => void,
  onAnswer: () => void,
}

const withUserAnswer = (Component) => {
  // Так же, как и в `with-active-player`,
  // только добавляем пропсы, которые нужны самому хоку.
  type P = Props & React.ComponentProps<typeof Component>;

  class WithUserAnswer extends React.PureComponent<Subtract<P, InjectedProps>, State> {
    constructor(props) {
      super(props);
      this.state = {
        userAnswers: new Array(props.answers.length).fill(false),
      };

      this._onAnswer = this._onAnswer.bind(this);
      this._onChange = this._onChange.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        userAnswer={this.state.userAnswers}
        onChange={this._onChange}
        onAnswer={this._onAnswer}
      />;
    }

    _onChange(i) {
      const userAnswers = this.state.userAnswers.slice(0);
      userAnswers[i] = !userAnswers[i];
      this.setState({userAnswers});
    }

    _onAnswer() {
      this.props.onAnswer(this.state.userAnswers);
    }
  }

  return WithUserAnswer;
};

export default withUserAnswer;
