import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import * as React from "react";
import * as ReactDOM from "react-dom";
import thunk from "redux-thunk";
import {compose} from "recompose";

import App from "./components/app/app";
import {createAPI} from './api';
import reducer from "./reducer";
import {Operation} from "./reducer/data/data";
import {Operation as UserOperation} from "./reducer/user/user";
import withScreenSwitch from "./hocs/with-screen-switch/with-screen-switch";
import history from './history';

declare const __REDUX_DEVTOOLS_EXTENSION__: () => any;

const gameSettings = {
  gameTime: 5,
  errorCount: 3,
};
const AppWrapped = withScreenSwitch(App);


const init = () => {
  const {errorCount, gameTime} = gameSettings;
  const api = createAPI(() => history.push(`/login`));

  /* eslint-disable no-underscore-dangle */
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
        __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()
      )
  );
  /* eslint-enable */

  store.dispatch(Operation.loadQuestions());
  store.dispatch(UserOperation.checkAuth());

  ReactDOM.render(<Provider store={store}>
    <AppWrapped
      maxMistakes={errorCount}
      gameTime={gameTime}
    />
  </Provider>,
  document.querySelector(`.main`));
};

init();
