import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import {compose} from "recompose";
import {Router} from "react-router-dom";
import {createBrowserHistory} from "history";

import App from "./components/app/app.jsx";
import {createAPI} from './api';
import reducer from "./reducer";
import {Operation} from "./reducer/data/data";
import withScreenSwitch from "./hocs/with-screen-switch/with-screen-switch";

const gameSettings = {
  gameTime: 5,
  errorCount: 3,
};

const history = createBrowserHistory();

const AppWrapped = withScreenSwitch(App);

const init = () => {
  const {errorCount, gameTime} = gameSettings;
  const api = createAPI(() => history.push(`/login`));

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
      )
  );
  /* eslint-enable */

  store.dispatch(Operation.loadQuestions());

  ReactDOM.render(<Provider store={store}>
    <Router history={history}>
      <AppWrapped
        maxMistakes={errorCount}
        gameTime={gameTime}
      />
    </Router>
  </Provider>,
  document.querySelector(`#root`));
};

init();
