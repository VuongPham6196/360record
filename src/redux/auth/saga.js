import { login } from 'api/httpClient';
import { call, put, takeLatest } from 'redux-saga/effects';
import { authActionTypes } from './actions';

function* fetchAuth(action) {
  console.log('saga called');

  try {
    const data = yield call(
      login,
      action.payload.email,
      action.payload.password
    );

    if (data.errors) {
      yield put({
        type: authActionTypes.GET_AUTH_REQUEST_FAILED,
        payload: 'Invalid Username/Password',
      });
    } else {
      yield put({
        type: authActionTypes.GET_AUTH_REQUEST_SUCCESS,
        payload: { ...data, remember: action.payload.remember, errorMsg: null },
      });
    }
  } catch (error) {
    yield put({
      type: authActionTypes.GET_AUTH_REQUEST_FAILED,
      payload: 'Some thing went wrong. Please try again later!',
    });
  }
}

function* authSaga() {
  yield takeLatest(authActionTypes.GET_AUTH_REQUEST, fetchAuth);
}

export default authSaga;
