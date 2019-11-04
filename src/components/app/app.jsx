import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {ActionCreator} from "../../reducer";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";


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
        onWelcomeScreenClick
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
      step
    } = this.props;

    switch (question.type) {
      case `genre`: return <GenreQuestionScreen
        step={step}
        question={question}
        onAnswer={(userAnswer) => onUserAnswer(
            userAnswer,
            question,
            mistakes,
            maxMistakes
        )}
      />;

      case `artist`: return <ArtistQuestionScreen
        step={step}
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

        <div className="timer__value">
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
