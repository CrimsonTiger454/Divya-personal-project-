import { createStore, applyMiddleware } from "redux";
import promiseMiddleWare from 'redux-promise-middleware';

import reducer from "./dux/reducer";

let middleware = applyMiddleware(promiseMiddleWare());

export default createStore(reducer, middleware);