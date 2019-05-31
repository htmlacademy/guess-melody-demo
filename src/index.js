import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import {compose} from "recompose";

import App from "./components/app/app.jsx";
import {createAPI} from './api';
import reducer from "./reducer";
import {Operation} from "./reducer/data/data";
import withScreenSwitch from "./hocs/with-screen-switch/with-screen-switch";

const gameSettings = {
  gameTime: 5,
  errorCount: 3,
};
const AppWrapped = withScreenSwitch(App);


const init = () => {
  const {errorCount, gameTime} = gameSettings;
  const api = createAPI(() => history.pushState(null, null, `/login`));

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
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
