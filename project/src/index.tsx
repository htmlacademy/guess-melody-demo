import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {questions} from './mocks/questions';
import {store} from './store';

const Setting = {
  ERRORS_COUNT: 3,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        errorsCount = {Setting.ERRORS_COUNT}
        questions = {questions}
      />
    </Provider>
  </React.StrictMode>,
);
