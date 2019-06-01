import * as React from "react";
import {QuestionArtist} from "../../types";


interface Props {
  onAnswer: () => void,
  renderPlayer: () => React.ReactElement,
  question: QuestionArtist,
}

class ArtistQuestionScreen extends React.PureComponent<Props, null> {
  render() {
    const {question, onAnswer, renderPlayer} = this.props;
    const {
      answers,
      song,
    } = question;

    return <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        {renderPlayer(song, 0)}
      </div>

      <form className="game__artist">
        {answers.map((it, i) => <div className="artist" key={i}>
          <input
            className="artist__input visually-hidden"
            type="radio"
            name="answer"
            value={`artist-${i}`}
            id={`artist-${i}`}
            onClick={() => onAnswer(it)}
          />
          <label className="artist__name" htmlFor={`artist-${i}`}>
            <img className="artist__picture" src={it.picture} alt={it.artist} />
            {it.artist}
          </label>
        </div>)}
      </form>
    </section>;
  }
}


export default ArtistQuestionScreen;
