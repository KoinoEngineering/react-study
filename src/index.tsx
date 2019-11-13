import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import { reducer } from "./redux/reducer";
import { logger } from "redux-logger";

const store = createStore(reducer, applyMiddleware(logger));

const render = () => {
    ReactDOM.render(<App state={store.getState()} dispatch={store.dispatch} />, document.getElementById("root"));
};

store.subscribe(render);
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
