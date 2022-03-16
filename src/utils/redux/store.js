import thunk from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";

import view from "./reducers/view";

export default createStore(combineReducers({ view }), applyMiddleware(thunk));
