import * as React from "react";
import {useMemo} from "react";
import {Link} from "react-router-dom";

import {AppRoute} from "../../../const";
import {useQuestions} from 'reducer/data';
import {useMistakes, useResetGame} from 'reducer/game';


const Result: React.FC = (): JSX.Element => {
  const mistakesCount = useMistakes();
  const questions = useQuestions();
  const onReplayButtonClick = useResetGame();
  const questionsCount = useMemo(() => {
    return questions.length;
  }, [questions]);

  const correctlyQuestionsCount = useMemo(() => {
    return questionsCount - mistakesCount;
  }, [mistakesCount, questionsCount]);

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">
        Вы ответили правильно на {correctlyQuestionsCount} вопросов и совершили {mistakesCount} ошибки
      </p>
      <Link
        className="replay"
        to={AppRoute.ROOT}
        onClick={onReplayButtonClick}
      >
        Сыграть ещё раз
      </Link>
    </section>
  );
};


export default Result;
