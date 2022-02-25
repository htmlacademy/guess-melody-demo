import {ChangeEvent, PropsWithChildren} from 'react';
import {Helmet} from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import {QuestionArtist, UserArtistQuestionAnswer} from '../../types/question';

type ArtistQuestionScreenProps = PropsWithChildren<{
  question: QuestionArtist;
  onAnswer: (question: QuestionArtist, answer: UserArtistQuestionAnswer) => void;
  renderPlayer: (src: string, playerIndex: number) => JSX.Element;
}>;

function ArtistQuestionScreen(props: ArtistQuestionScreenProps): JSX.Element {
  const {question, onAnswer, renderPlayer, children} = props;
  const {answers, song} = question;

  return (
    <section className="game game--artist">
      <Helmet>
        <title>Угадай мелодию. Кто исполняет эту песню?</title>
      </Helmet>
      <header className="game__header">
        <Logo />

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: 'url(#blur)', transform: 'rotate(-90deg) scaleY(-1)', transformOrigin: 'center'}}
          />
        </svg>

        {children}
      </header>

      <section className="game__screen">
        <h2 className="game__title">Кто исполняет эту песню?</h2>
        <div className="game__track">
          <div className="track">
            {renderPlayer(song.src, 0)}
          </div>
        </div>

        <form className="game__artist">
          {answers.map((answer, id) => (
            <div key={answer.artist} className="artist">
              <input
                className="artist__input visually-hidden"
                type="radio"
                name="answer"
                value={`answer-${id}`}
                id={`answer-${id}`}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                  evt.preventDefault();
                  onAnswer(question, answer.artist);
                }}
              />
              <label className="artist__name" htmlFor={`answer-${id}`}>
                <img className="artist__picture" src={answer.picture} alt={answer.artist} />
                {answer.artist}
              </label>
            </div>
          ))}
        </form>
      </section>
    </section>
  );
}

export default ArtistQuestionScreen;
