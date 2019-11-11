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
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  );
  /* eslint-enable */

  ReactDOM.render(<Provider store={store}>
    <AppWrapped
      maxMistakes={errorCount}
      gameTime={gameTime}
      questions={gameQuestions}
      questionsLength={gameQuestions.length}
    />
  </Provider>,
  document.querySelector(`#root`));
};

init(questions);
