import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';

function WinScreen(): JSX.Element {
  return (
    <section className="result">
      <Helmet>
        <title>Угадай мелодию. Вы настоящий меломан!</title>
      </Helmet>
      <div className="result-logout__wrapper">
        <Link className="result-logout__link" to="/">Выход</Link>
      </div>
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на 6 вопросов и совершили 2 ошибки</p>
      <button className="replay" type="button">Сыграть ещё раз</button>
    </section>
  );
}

export default WinScreen;
