import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import {compose} from "recompose";

import App from "./components/app/app.jsx";
import {reducer, Operation} from "./reducer";
import withScreenSwitch from "./hocs/with-screen-switch/with-screen-switch";

const gameSettings = {
  gameTime: 5,
  errorCount: 3,
};
const AppWrapped = withScreenSwitch(App);


const init = () => {
  const {errorCount, gameTime} = gameSettings;
  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
  );
  /* eslint-enable */

  store.dispatch(Operation.loadQuestions());

  ReactDOM.render(<Provider store={store}>
    <AppWrapped
      maxMistakes={errorCount}
      gameTime={gameTime}
    />
  </Provider>,
  document.querySelector(`.main`));
};

init();
