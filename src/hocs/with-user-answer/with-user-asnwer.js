import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withUserAnswer = (Component) => {
  class WithUserAnswer extends PureComponent {
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

  WithUserAnswer.propTypes = {
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.oneOf([`rock`, `folk`, `pop`, `jazz`, `blues`]).isRequired,
    })),
    onAnswer: PropTypes.func.isRequired,
  };

  return WithUserAnswer;
};

export default withUserAnswer;
