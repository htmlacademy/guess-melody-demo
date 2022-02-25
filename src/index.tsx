import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {Setting} from './const';
import {questions} from './mocks/questions';
import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App
        errorsCount = {Setting.ErrorsCount}
        questions = {questions}
      />
    </Provider>
  </React.StrictMode>,
);
