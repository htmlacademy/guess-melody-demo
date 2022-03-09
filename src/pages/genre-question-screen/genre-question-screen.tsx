import {PropsWithChildren} from 'react';
import {Helmet} from 'react-helmet-async';
import Logo from '../../components/logo/logo';
import GenreQuestionList from '../../components/genre-question-list/genre-question-list';
import {QuestionGenre, UserGenreQuestionAnswer} from '../../types/question';

type GenreQuestionScreenProps = PropsWithChildren<{
  question: QuestionGenre;
  onAnswer: (question: QuestionGenre, answers: UserGenreQuestionAnswer) => void;
  renderPlayer: (src: string, playerIndex: number) => JSX.Element;
}>;

function GenreQuestionScreen(props: GenreQuestionScreenProps): JSX.Element {
  const {question, onAnswer, renderPlayer, children} = props;
  const {genre} = question;

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

        {children}
      </header>

      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <GenreQuestionList
          question={question}
          onAnswer={onAnswer}
          renderPlayer={renderPlayer}
        />
      </section>
    </section>
  );
}

export default GenreQuestionScreen;
