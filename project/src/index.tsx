import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {questions} from './mocks/questions';
import {store} from './store';

const Setting = {
  ERRORS_COUNT: 3,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        errorsCount = {Setting.ERRORS_COUNT}
        questions = {questions}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
