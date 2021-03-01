import {FormEvent, PropsWithChildren} from 'react';
import Logo from '../logo/logo';
import GenreQuestionItem from '../genre-question-item/genre-question-item';
import {useUserAnswers} from '../../hooks/use-user-answers';
import {QuestionGenre, UserGenreQuestionAnswer} from '../../types/question';

type GenreQuestionScreenProps = PropsWithChildren<{
  question: QuestionGenre;
  onAnswer: (question: QuestionGenre, answers: UserGenreQuestionAnswer) => void;
  renderPlayer: (src: string, playerIndex: number) => JSX.Element;
}>;

function GenreQuestionScreen(props: GenreQuestionScreenProps): JSX.Element {
  const {question, onAnswer, renderPlayer, children} = props;
  const {answers, genre} = question;

  const [userAnswers, handleAnswer, handleAnswerChange] = useUserAnswers(question, onAnswer);

  return (
    <section className="game game--genre">
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
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(evt: FormEvent<HTMLFormElement>) => {
            evt.preventDefault();
            handleAnswer();
          }}
        >
          {answers.map((answer, id) => {
            const keyValue = `${id}-${answer.src}`;
            return (
              <GenreQuestionItem
                answer={answer}
                id={id}
                key={keyValue}
                onChange={handleAnswerChange}
                renderPlayer={renderPlayer}
                userAnswer={userAnswers[id]}
              />
            );
          })}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>
  );
}

export default GenreQuestionScreen;
