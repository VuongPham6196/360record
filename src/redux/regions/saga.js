import { getREGIONS } from 'api/httpClient';
import { call, put, takeLatest } from 'redux-saga/effects';
import { regionsActionTypes } from './actions';
import { authActionTypes } from 'redux/auth/actions';

function* fetchRegions(action) {
  let respone;
  try {
    respone = yield call(getREGIONS, action.payload);

    yield put({
      type: regionsActionTypes.GET_REGIONS_REQUEST_SUCCESS,
      payload: { ...respone.data.regions },
    });
  } catch (error) {
    yield put({
      type: regionsActionTypes.GET_REGIONS_REQUEST_FAILED,
      payload: 'Some thing went wrong. Please try again later!',
    });
    yield put({
      type: authActionTypes.GET_AUTH_REQUEST_FAILED,
      payload: respone,
    });
  }
}

function* fetchMoreRegions(action) {
  try {
    const respone = yield call(getREGIONS, action.payload);

    yield put({
      type: regionsActionTypes.GET_MOREREGIONS_REQUEST_SUCCESS,
      payload: respone.data.regions,
    });
  } catch (error) {
    yield put({
      type: regionsActionTypes.GET_REGIONS_REQUEST_FAILED,
      payload: 'Some thing went wrong. Please try again later!',
    });
    yield put({
      type: authActionTypes.GET_AUTH_REQUEST_FAILED,
      payload: 'Some thing went wrong. Please try again later!',
    });
  }
}

function* regionsSaga() {
  yield takeLatest(regionsActionTypes.GET_REGIONS_REQUEST, fetchRegions);
  yield takeLatest(
    regionsActionTypes.GET_MOREREGIONS_REQUEST,
    fetchMoreRegions
  );
}

export default regionsSaga;
