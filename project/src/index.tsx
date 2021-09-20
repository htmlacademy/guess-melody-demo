import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {questions} from './mocks/questions';

const Setting = {
  ERRORS_COUNT: 3,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      errorsCount = {Setting.ERRORS_COUNT}
      questions = {questions}
    />
  </React.StrictMode>,
);
