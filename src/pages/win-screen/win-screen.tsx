import {Link, useNavigate} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {resetGame} from '../../store/game-process/game-process';
import {logoutAction} from '../../store/api-actions';
import {AppRoute} from '../../const';
import {getMistakeCount, getStep} from '../../store/game-process/selectors';

function WinScreen(): JSX.Element {
  const step = useAppSelector(getStep);
  const mistakes = useAppSelector(getMistakeCount);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const correctlyQuestionsCount = step - mistakes;

  return (
    <section className="result">
      <Helmet>
        <title>Угадай мелодию. Вы настоящий меломан!</title>
      </Helmet>
      <div className="result-logout__wrapper">
        <Link
          className="result-logout__link"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
          to='/'
        >
          Выход
        </Link>
      </div>
      <div className="result__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
      </div>
      <h2 className="result__title">Вы настоящий меломан!</h2>
      <p className="result__total">Вы ответили правильно на {correctlyQuestionsCount} вопросов и совершили {mistakes} ошибки</p>
      <button
        onClick={() => {
          dispatch(resetGame());
          navigate(AppRoute.Game);
        }}
        className="replay"
        type="button"
      >
        Сыграть ещё раз
      </button>
    </section>
  );
}

export default WinScreen;
