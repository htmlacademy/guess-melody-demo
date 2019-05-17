import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import AudioPlayer from "../audio-player/audio-player.jsx";


class GenreQuestionScreen extends PureComponent {
  render() {
    const {
      activePlayer,
      question,
      onAnswer,
      onChange,
      onPlayButtonClick,
      userAnswer,
    } = this.props;

    const {
      answers,
      genre,
    } = question;

    return <section className="game__screen">
      <h2 className="game__title">Выберите {genre} треки</h2>
      <form className="game__tracks" onSubmit={(evt) => {
        evt.preventDefault();
        onAnswer();
      }}>
        {answers.map((it, i) => <div className="track" key={`answer-${i}`}>
          <AudioPlayer
            src={it.src}
            isPlaying={i === activePlayer}
            onPlayButtonClick={() => onPlayButtonClick(i)}
          />
          <div className="game__answer">
            <input
              checked={userAnswer[i]}
              className="game__input visually-hidden"
              type="checkbox"
              name="answer"
              value={`answer-${i}`}
              id={`answer-${i}`}
              onChange={() => onChange(i)}
            />
            <label className="game__check" htmlFor={`answer-${i}`}>
              Отметить
            </label>
          </div>
        </div>)}

        <button className="game__submit button" type="submit">Ответить</button>
      </form>
    </section>;
  }
}


GenreQuestionScreen.propTypes = {
  activePlayer: PropTypes.number.isRequired,
  onAnswer: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.oneOf([`rock`, `jazz`, `blues`]).isRequired,
    })).isRequired,
    genre: PropTypes.oneOf([`rock`, `jazz`, `blues`]).isRequired,
    type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
  }).isRequired,
  userAnswer: PropTypes.arrayOf(PropTypes.bool).isRequired,
};


export default GenreQuestionScreen;
