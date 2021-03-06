import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import { reducer } from "./redux/reducer";
import { createLogger } from "redux-logger";
import { Provider } from "react-redux";

const store = process.env.NODE_ENV === "production" ? createStore(reducer) : createStore(reducer, applyMiddleware(createLogger({
    stateTransformer: (state) => { return state.toJS(); }
})));

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App state={store.getState()} dispatch={store.dispatch} />
        </Provider>,
        document.getElementById("root"));
};

store.subscribe(render);
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
