import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import App from "./components/app/app.jsx";
import reducer from "./reducer/reducer.js";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducer/user/user.js";
import {createAPI} from "./api.js";


const api = createAPI(() => {});

const store = createStore(
    reducer,
    applyMiddleware(thunk.withExtraArgument(api))
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
