import { call, put, takeLatest } from 'redux-saga/effects';
import { getAuthSuccess } from '../../api/auth';
import { authActionTypes } from './actions';

function* fetchAuth(action) {
  console.log('saga called');
  try {
    const status = yield call(getAuthSuccess, action.payload);
    yield put({
      type: authActionTypes.GET_AUTH_REQUEST_SUCCESS,
      payload: status,
    });
  } catch (error) {
    yield put({
      type: authActionTypes.GET_AUTH_REQUEST_FAILED,
      payload: error,
    });
  }
}

function* authSaga() {
  yield takeLatest(authActionTypes.GET_AUTH_REQUEST, fetchAuth);
}

export default authSaga;
