import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import AudioPlayer from "../audio-player/audio-player.jsx";


class GenreQuestionScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePlayer: -1,
    };
  }

  render() {
    const {question, onAnswer} = this.props;
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
            isPlaying={i === this.state.activePlayer}
            onPlayButtonClick={() => this.setState({
              activePlayer: this.state.activePlayer === i ? -1 : i
            })}
          />
          <div className="game__answer">
            <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${i}`} id={`answer-${i}`}/>
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
  onAnswer: PropTypes.func.isRequired,
  question: PropTypes.shape({
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.oneOf([`rock`, `jazz`, `blues`]).isRequired,
    })).isRequired,
    genre: PropTypes.oneOf([`rock`, `jazz`, `blues`]).isRequired,
    type: PropTypes.oneOf([`genre`, `artist`]).isRequired,
  }).isRequired,
};


export default GenreQuestionScreen;
