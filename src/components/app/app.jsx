import React, {Component} from "react";
import PropTypes from "prop-types";

import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import QuestionGenreScreen from "../genre-question-screen/genre-question-screen.jsx";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";


const Type = {
  ARTIST: `game--artist`,
  GENRE: `game--genre`,
};


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };
  }

  _getScreen(question, onClick) {
    if (!question) {
      const {
        errorCount,
        gameTime,
      } = this.props;

      return <WelcomeScreen
        errorCount={errorCount}
        gameTime={gameTime}
        onClick={onClick}
      />;
    }

    switch (question.type) {
      case `genre`: return <QuestionGenreScreen
        question={question}
        onAnswer={onClick}
      />;

      case `artist`: return <ArtistQuestionScreen
        question={question}
        onAnswer={onClick}
      />;
    }

    return null;
  }

  render() {
    const {questions} = this.props;
    const {question} = this.state;

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

      {this._getScreen(questions[question], () => {
        this.setState({
          question: question + 1 >= questions.length
            ? -1
            : question + 1,
        });
      })}
    </section>;
  }
}


App.propTypes = {
  errorCount: PropTypes.number.isRequired,
  gameTime: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};


export default App;
