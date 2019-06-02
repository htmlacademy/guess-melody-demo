import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";


const GameOverScreen = ({onRelaunchButtonClick = () => {}}) => {
  return <section className="result">
    <div className="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
    </div>
    <h2 className="result__title">Какая жалость!</h2>
    <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>

    {/*
      NB!
      Вместо бывшей кнопки мы используем компонент
      <Link />, но одновременно с этим мы оставляем
      обработчик события onClick, который на уровне
      приложения вызывает Action в Redux, который
      сбрасывает состояние.

      Если этого не сделать, после того, как произойдет
      редирект на /, отрисуется компонент <AppWrapped />
      в котром, в методе _getScreen написано, что если
      количество ошибок превышает допустимое, нужно
      совершить редирект на /lose. Поскольку сам по себе
      редирект никак не влияет на состояние редьюсера,
      нам нужно прописывать его дополнительно отдельно
    */}
    <Link
      className="replay"
      to="/"
      onClick={onRelaunchButtonClick}
    >Попробовать ещё раз</Link>
  </section>;
};


GameOverScreen.propTypes = {
  onRelaunchButtonClick: PropTypes.func.isRequired,
};


export default GameOverScreen;
