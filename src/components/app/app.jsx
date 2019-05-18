import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {ActionCreator} from "../../reducer";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import QuestionGenreScreen from "../genre-question-screen/genre-question-screen.jsx";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";
import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import withTransformProps from "../../hocs/with-transform-props/with-transform-props";
import withUserAnswer from "../../hocs/with-user-answer/with-user-asnwer";

const transformPlayerToAnswer = (props) => {
  const newProps = Object.assign({}, props, {
    renderAnswer: props.renderPlayer,
  });
  delete newProps.renderPlayer;
  return newProps;
};

const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);
const QuestionGenreScreenWrapped = withUserAnswer(withActivePlayer(
    withTransformProps(transformPlayerToAnswer)(QuestionGenreScreen)));

const Type = {
  ARTIST: `game--artist`,
  GENRE: `game--genre`,
};


class App extends Component {
  _getScreen(question) {
    if (!question) {
      const {
        maxMistakes,
        gameTime,
        onWelcomeScreenClick,
      } = this.props;

      return <WelcomeScreen
        errorCount={maxMistakes}
        gameTime={gameTime}
        onClick={onWelcomeScreenClick}
      />;
    }

    const {
      onUserAnswer,
      mistakes,
      maxMistakes,
    } = this.props;

    switch (question.type) {
      case `genre`: return <QuestionGenreScreenWrapped
        answers={question.answers}
        question={question}
        onAnswer={(userAnswer) => onUserAnswer(
            userAnswer,
            question,
            mistakes,
            maxMistakes
        )}
      />;

      case `artist`: return <ArtistQuestionScreenWrapped
        question={question}
        onAnswer={(userAnswer) => onUserAnswer(
            userAnswer,
            question,
            mistakes,
            maxMistakes
        )}
      />;
    }

    return null;
  }

  render() {
    const {
      questions,
      step,
    } = this.props;

    return <section className={`game ${Type.ARTIST}`}>
      <header className="game__header">
        <a className="game__back" href="#">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{
              filter: `url(#blur)`,
              transform: `rotate(-90deg) scaleY(-1)`,
              transformOrigin: `center`
            }}
          />
        </svg>

        <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
          <span className="timer__mins">05</span>
          <span className="timer__dots">:</span>
          <span className="timer__secs">00</span>
        </div>

        <div className="game__mistakes">
          <div className="wrong"/>
          <div className="wrong"/>
          <div className="wrong"/>
        </div>
      </header>

      {this._getScreen(questions[step])}
    </section>;
  }
}


App.propTypes = {
  mistakes: PropTypes.number.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeScreenClick: PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  step: state.step,
  mistakes: state.mistakes,
});


const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(ActionCreator.incrementStep()),

  onUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(
        userAnswer,
        question,
        mistakes,
        maxMistakes
    ));
  }
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
