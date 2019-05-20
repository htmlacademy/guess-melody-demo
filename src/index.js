import {createStore} from "redux";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";
import questions from "./mocks/questions";
import {reducer} from "./reducer";
import withScreenSwitch from "./hocs/with-screen-switch/with-screen-switch";

const gameSettings = {
  gameTime: 5,
  errorCount: 3,
};
const AppWrapped = withScreenSwitch(App);


const init = (gameQuestions) => {
  const {errorCount, gameTime} = gameSettings;
  const store = createStore(reducer);

  ReactDOM.render(<Provider store={store}>
    <AppWrapped
      maxMistakes={errorCount}
      gameTime={gameTime}
      questions={gameQuestions}
    />
  </Provider>,
  document.querySelector(`.main`));
};

init(questions);
