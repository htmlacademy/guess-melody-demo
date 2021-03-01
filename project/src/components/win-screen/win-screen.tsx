import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {requireLogout, resetGame} from '../../store/action';
import {getStep, getMistakeCount} from '../../store/game-process/selectors';

type WinScreenProps = {
  onReplayButtonClick: () => void;
};

function WinScreen(props: WinScreenProps): JSX.Element {
  const {onReplayButtonClick} = props;

  const step = useSelector(getStep);
  const mistakes = useSelector(getMistakeCount);

  const dispatch = useDispatch();

  const correctlyQuestionsCount = step - mistakes;

  return (
    <section className="result">
      <div className="result-logout__wrapper">
        <Link
          className="result-logout__link"
          onClick={(evt) => {
            evt.preventDefault();

            dispatch(requireLogout());
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
          onReplayButtonClick();
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
