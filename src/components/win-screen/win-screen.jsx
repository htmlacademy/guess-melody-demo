import React from 'react';
import {useHistory} from 'react-router-dom';

const WinScreen = () => {
  const history = useHistory();

  return (
    <section className="result">
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на 6 вопросов и совершили 2 ошибки</p>
      <button
        onClick={() => history.push(`/game`)}
        className="replay"
        type="button"
      >
        Сыграть ещё раз
      </button>
    </section>
  );
};

export default WinScreen;
