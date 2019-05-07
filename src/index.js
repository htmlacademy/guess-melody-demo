import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";
import questions from "./mocks/questions";

const gameSettings = {
  gameTime: 5,
  errorCount: 3,
};

const init = (gameQuestions) => {
  const {errorCount, gameTime} = gameSettings;

  ReactDOM.render(<App
    errorCount={errorCount}
    gameTime={gameTime}
    questions={gameQuestions}
  />,
  document.querySelector(`.main`));
};

init(questions);
