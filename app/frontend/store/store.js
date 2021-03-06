import thunk from "redux-thunk";
// import logger from "redux-logger";
import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers/root_reducer";

export default (preloadedState = {}) => createStore(rootReducer,preloadedState,applyMiddleware(thunk));