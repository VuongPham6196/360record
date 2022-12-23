import { getINSPECTIONS } from 'api/httpClient';
import { call, put, takeLatest } from 'redux-saga/effects';
import { inspectionsActionTypes } from './actions';
import { authActionTypes } from 'redux/auth/actions';

function* fetchInspections(action) {
  let respone;
  try {
    respone = yield call(getINSPECTIONS, action.payload);
    yield put({
      type: inspectionsActionTypes.GET_INSPECTIONS_REQUEST_SUCCESS,
      payload: { ...respone.data.inspections },
    });
  } catch (error) {
    yield put({
      type: inspectionsActionTypes.GET_INSPECTIONS_REQUEST_FAILED,
      payload: 'Some thing went wrong. Please try again later!',
    });
    yield put({
      type: authActionTypes.GET_AUTH_REQUEST_FAILED,
      payload: respone,
    });
  }
}

function* fetchMoreInspections(action) {
  try {
    const respone = yield call(getINSPECTIONS, action.payload);

    yield put({
      type: inspectionsActionTypes.GET_MOREINSPECTIONS_REQUEST_SUCCESS,
      payload: { ...respone.data.inspections },
    });
  } catch (error) {
    yield put({
      type: inspectionsActionTypes.GET_INSPECTIONS_REQUEST_FAILED,
      payload: 'Some thing went wrong. Please try again later!',
    });
    yield put({
      type: authActionTypes.GET_AUTH_REQUEST_FAILED,
      payload: 'Some thing went wrong. Please try again later!',
    });
  }
}

function* inspectionsSaga() {
  yield takeLatest(
    inspectionsActionTypes.GET_INSPECTIONS_REQUEST,
    fetchInspections
  );
  yield takeLatest(
    inspectionsActionTypes.GET_MOREINSPECTIONS_REQUEST,
    fetchMoreInspections
  );
}

export default inspectionsSaga;
