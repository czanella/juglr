import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import { simpleAction } from './middlewares';

const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk, simpleAction),
);

export default store;
