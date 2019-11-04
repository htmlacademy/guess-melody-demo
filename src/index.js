import {createStore} from "redux";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";
import questions from "./mocks/questions";
import {reducer} from "./reducer";


const gameSettings = {
  gameTime: 5,
  errorCount: 3,
};


const init = (gameQuestions) => {
  const {errorCount, gameTime} = gameSettings;
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  );
  /* eslint-enable */

  ReactDOM.render(<Provider store={store}>
    <App
      maxMistakes={errorCount}
      gameTime={gameTime}
      questions={gameQuestions}
    />
  </Provider>,
  document.querySelector(`#root`));
};

init(questions);
