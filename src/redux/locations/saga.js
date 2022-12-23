import { getLOCATIONS } from 'api/httpClient';
import { call, put, takeLatest } from 'redux-saga/effects';
import { locationsActionTypes } from './actions';
import { authActionTypes } from 'redux/auth/actions';

function* fetchLocations(action) {
  let respone;
  try {
    respone = yield call(getLOCATIONS, action.payload);
    yield put({
      type: locationsActionTypes.GET_LOCATIONS_REQUEST_SUCCESS,
      payload: respone.data.locations,
    });
  } catch (error) {
    yield put({
      type: locationsActionTypes.GET_LOCATIONS_REQUEST_FAILED,
      payload: 'Some thing went wrong. Please try again later!',
    });
    yield put({
      type: authActionTypes.GET_AUTH_REQUEST_FAILED,
      payload: respone,
    });
  }
}

function* fetchMoreLocations(action) {
  try {
    const respone = yield call(getLOCATIONS, action.payload);

    yield put({
      type: locationsActionTypes.GET_MORELOCATIONS_REQUEST_SUCCESS,
      payload: { ...respone.data.locations },
    });
  } catch (error) {
    yield put({
      type: locationsActionTypes.GET_LOCATIONS_REQUEST_FAILED,
      payload: 'Some thing went wrong. Please try again later!',
    });
    yield put({
      type: authActionTypes.GET_AUTH_REQUEST_FAILED,
      payload: 'Some thing went wrong. Please try again later!',
    });
  }
}

function* locationsSaga() {
  yield takeLatest(locationsActionTypes.GET_LOCATIONS_REQUEST, fetchLocations);
  yield takeLatest(
    locationsActionTypes.GET_MORELOCATIONS_REQUEST,
    fetchMoreLocations
  );
}

export default locationsSaga;
