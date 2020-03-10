import * as React from "react";
import {QuestionArtist, AnswerArtist} from "../../types";


interface Props {
  onAnswer: (question: QuestionArtist, answer: AnswerArtist) => void;
  question: QuestionArtist;
  renderPlayer: (string, number) => React.ReactNode;
}

const ArtistQuestionScreen: React.FunctionComponent<Props> = (props: Props) => {
  const {onAnswer, question, renderPlayer} = props;
  const {
    answers,
    song,
  } = question;

  return (
    <section className="game__screen">
      <h2 className="game__title">Кто исполняет эту песню?</h2>
      <div className="game__track">
        <div className="track">
          {renderPlayer(song.src, 0)}
        </div>
      </div>

      <form className="game__artist">
        {answers.map((answer, i) => (
          <div key={answer.artist} className="artist">
            <input className="artist__input visually-hidden" type="radio" name="answer" value={`answer-${i}`} id={`answer-${i}`}
              onChange={(evt) => {
                evt.preventDefault();
                onAnswer(question, answer);
              }}
            />
            <label className="artist__name" htmlFor={`answer-${i}`}>
              <img className="artist__picture" src={answer.picture} alt={answer.artist} />
              {answer.artist}
            </label>
          </div>
        ))}
      </form>
    </section>
  );
};


export default ArtistQuestionScreen;
