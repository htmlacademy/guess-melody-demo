import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import questions from "./mocks/questions";

const Settings = {
  ERRORS_COUNT: 3
};

ReactDOM.render(
    <App
      errorsCount={Settings.ERRORS_COUNT}
      questions={questions}
    />,
    document.querySelector(`#root`)
);
