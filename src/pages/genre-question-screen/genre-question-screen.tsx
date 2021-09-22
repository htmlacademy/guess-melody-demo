import {useState, FormEvent, ChangeEvent} from 'react';
import {Helmet} from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import {QuestionGenre, UserGenreQuestionAnswer} from '../../types/question';

type GenreQuestionScreenProps = {
  question: QuestionGenre;
  onAnswer: (question: QuestionGenre, answers: UserGenreQuestionAnswer) => void;
  renderPlayer: (src: string, playerIndex: number) => JSX.Element;
};

function GenreQuestionScreen(props: GenreQuestionScreenProps): JSX.Element {
  const {question, onAnswer, renderPlayer} = props;
  const {answers, genre} = question;

  const [userAnswers, setUserAnswers] = useState([false, false, false, false]);

  return (
    <section className="game game--genre">
      <Helmet>
        <title>Угадай мелодию. Выберите треки</title>
      </Helmet>
      <header className="game__header">
        <Logo />

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: 'url(#blur)', transform: 'rotate(-90deg) scaleY(-1)', transformOrigin: 'center'}}
          />
        </svg>

        <div className="game__mistakes">
          <div className="wrong"/>
          <div className="wrong"/>
          <div className="wrong"/>
        </div>
      </header>

      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(evt: FormEvent<HTMLFormElement>) => {
            evt.preventDefault();
            onAnswer(question, userAnswers);
          }}
        >
          {answers.map((answer, id) => {
            const keyValue = `${id}-${answer.src}`;
            return (
              <div key={keyValue} className="track">
                {renderPlayer(answer.src, id)}
                <div className="game__answer">
                  <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${id}`}
                    id={`answer-${id}`}
                    checked={userAnswers[id]}
                    onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                      const value = target.checked;
                      setUserAnswers([...userAnswers.slice(0, id), value, ...userAnswers.slice(id + 1)]);
                    }}
                  />
                  <label className="game__check" htmlFor={`answer-${id}`}>Отметить</label>
                </div>
              </div>
            );
          })}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>
  );
}

export default GenreQuestionScreen;
