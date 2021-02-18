import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import genreQuestionProp from './genre-question.prop';

const GenreQuestionScreen = (props) => {
  const [userAnswers, setUserAnswers] = useState([false, false, false, false]);
  const {onAnswer, question, renderPlayer, children} = props;
  const {answers, genre} = question;

  return (
    <section className="game game--genre">
      <header className="game__header">
        <Link className="game__back" to="/">
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию"/>
        </Link>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
        </svg>

        {children}
      </header>

      <section className="game__screen">
        <h2 className="game__title">Выберите {genre} треки</h2>
        <form
          className="game__tracks"
          onSubmit={(env) => {
            env.preventDefault();
            onAnswer(question, userAnswers);
          }}
        >
          {answers.map((answer, id) => (
            <div key={`${id}-${answer.src}`} className="track">
              {renderPlayer(answer.src, id)}
              <div className="game__answer">
                <input className="game__input visually-hidden" type="checkbox" name="answer" value={`answer-${id}`}
                  id={`answer-${id}`}
                  checked={userAnswers[id]}
                  onChange={({target}) => {
                    const value = target.checked;
                    setUserAnswers([...userAnswers.slice(0, id), value, ...userAnswers.slice(id + 1)]);
                  }}
                />
                <label className="game__check" htmlFor={`answer-${id}`}>Отметить</label>
              </div>
            </div>
          ))}

          <button className="game__submit button" type="submit">Ответить</button>
        </form>
      </section>
    </section>
  );
};

GenreQuestionScreen.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  question: genreQuestionProp,
  renderPlayer: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default GenreQuestionScreen;
