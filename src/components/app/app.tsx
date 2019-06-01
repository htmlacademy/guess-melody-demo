import * as React from "react";
import {connect} from "react-redux";
import {getStep} from "../../reducer/game/selectors";
import {getQuestions} from "../../reducer/data/selectors";
import {Type, QuestionArtist, QuestionGenre} from "../../types";


type Question = QuestionArtist | QuestionGenre;

interface Props {
  gameTime: number,
  questions: Question[],
  renderScreen: (question: Question) => React.ReactElement,
  step: number,
}

class App extends React.Component<Props, null> {
  render() {
    const {
      questions,
      renderScreen,
      step,
    } = this.props;

    return <section className={`game game--${Type.ARTIST}`}>
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

      {renderScreen(questions[step])}
    </section>;
  }
}


const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  questions: getQuestions(state),
  step: getStep(state),
});


export {App};

export default connect(mapStateToProps)(App);
