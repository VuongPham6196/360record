import { createStore, combineReducers, applyMiddleware } from 'redux';
import { spawn } from 'redux-saga/effects';
import createSagaMiddleware from '@redux-saga/core';

import loginReducer from './auth/reducer';
import authSaga from './auth/saga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: loginReducer,
});

function* rootSaga() {
  yield spawn(authSaga);
}
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
