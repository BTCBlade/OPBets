import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import modalReducer from './modal';
import sessionReducer from './session';
import betsapiReducer from './betsapi';
import eventsReducer from './events';
import wagerslipReducer from './wagerslip';
import active_wagersReducer from './active_wagers';

const rootReducer = combineReducers({
  session: sessionReducer,
  modal: modalReducer,
  betsapi: betsapiReducer,
  events: eventsReducer,
  wagerslip: wagerslipReducer,
  active_wagers: active_wagersReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
