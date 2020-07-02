import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {GameType} from "../../types";
import Mistakes from "../mistakes/mistakes";
import {getMistakes} from "../../reducer/game/selectors";
import {useGoToWelcome} from "../../reducer/game/hooks/useGoToWelcome";
import {AppRoute} from "../../const";


interface Props {
  type: GameType;
  children: React.ReactNode;
}

const GameScreen: React.FC<Props> = ({ children, type }): JSX.Element => {
  const mistakes = useSelector(getMistakes);

  const goToWelcome = useGoToWelcome();

  return (
    <section className={`game game--${type}`}>
      <header className="game__header">
        <Link
          className="game__back"
          to={AppRoute.ROOT}
          onClick={goToWelcome}
        >
          <span className="visually-hidden">Сыграть ещё раз</span>
          <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
        </Link>

        <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
          <circle className="timer__line" cx="390" cy="390" r="370"
            style={{filter: `url(#blur)`, transform: `rotate(-90deg) scaleY(-1)`, transformOrigin: `center`}}/>
        </svg>

        <Mistakes
          count={mistakes}
        />
      </header>

      {children}
    </section>
  );
};

export default GameScreen;
