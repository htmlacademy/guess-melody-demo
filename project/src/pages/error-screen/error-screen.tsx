import {useAppDispatch} from '../../hooks';
import {fetchQuestionAction} from '../../store/api-actions';

function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <>
      <p className="error__text">Не удалось загрузить вопросы</p>
      <button
        onClick={() => {
          dispatch(fetchQuestionAction());
        }}
        className="replay replay--error"
        type="button"
      >
        Попробовать ещё раз
      </button>
    </>
  );
}

export default ErrorScreen;
