import * as React from "react";
import {Subtract} from "utility-types";
import {QuestionGenre} from "../../types";


interface Props {
  question: QuestionGenre;
  onAnswer: (question: QuestionGenre, answers: Answer) => void;
}

interface State {
  answers: Answer;
}

interface InjectedProps {
  userAnswer: Answer;
  onChange: (answerIndex: number) => void;
  onAnswer: () => void;
}

type Answer = boolean[];

const withUserAnswer = (Component) => {
  // Так же, как и в `with-active-player`,
  // только добавляем пропсы, которые нужны самому хоку.
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithUserAnswer extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        answers: new Array(props.question.answers.length).fill(false),
      };

      this.handleAnswer = this.handleAnswer.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleAnswer() {
      const {onAnswer, question} = this.props;
      const {answers} = this.state;

      onAnswer(question, answers);
    }

    handleChange(i, value) {
      const {answers} = this.state;

      const userAnswers = answers.slice(0);
      userAnswers[i] = value;

      this.setState({
        answers: userAnswers,
      });
    }

    render() {
      const {answers} = this.state;

      return (
        <Component
          {...this.props}
          userAnswers={answers}
          onAnswer={this.handleAnswer}
          onChange={this.handleChange}
        />
      );
    }
  }

  return WithUserAnswer;
};


export default withUserAnswer;
