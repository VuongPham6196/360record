import { createStore, combineReducers, applyMiddleware } from 'redux';
import { spawn } from 'redux-saga/effects';
import createSagaMiddleware from '@redux-saga/core';

import loginReducer from './auth/reducer';
import authSaga from './auth/saga';
import companiesReducer from './companies/reducer';
import companiesSaga from './companies/saga';
import inspectionsReducer from './inspections/reducer';
import inspectionsSaga from './inspections/saga';
import locationsReducer from './locations/reducer';
import locationsSaga from './locations/saga';
import regionsReducer from './regions/reducer';
import regionsSaga from './regions/saga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: loginReducer,
  companies: companiesReducer,
  inspections: inspectionsReducer,
  locations: locationsReducer,
  regions: regionsReducer,
});

function* rootSaga() {
  yield spawn(authSaga);
  yield spawn(companiesSaga);
  yield spawn(inspectionsSaga);
  yield spawn(locationsSaga);
  yield spawn(regionsSaga);
}
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
