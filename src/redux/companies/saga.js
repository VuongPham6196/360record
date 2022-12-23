import { getCOMPANIES } from 'api/httpClient';
import { call, put, takeLatest } from 'redux-saga/effects';
import { companiesActionTypes } from './actions';
import { authActionTypes } from 'redux/auth/actions';

function* fetchCompanies(action) {
  let respone;
  try {
    respone = yield call(getCOMPANIES, action.payload);

    yield put({
      type: companiesActionTypes.GET_COMPANIES_REQUEST_SUCCESS,
      payload: { ...respone.data.companies },
    });
  } catch (error) {
    yield put({
      type: companiesActionTypes.GET_COMPANIES_REQUEST_FAILED,
      payload: 'Some thing went wrong. Please try again later!',
    });
    yield put({
      type: authActionTypes.GET_AUTH_REQUEST_FAILED,
      payload: respone,
    });
  }
}

function* fetchMoreCompanies(action) {
  try {
    const respone = yield call(getCOMPANIES, action.payload);

    yield put({
      type: companiesActionTypes.GET_MORECOMPANIES_REQUEST_SUCCESS,
      payload: respone.data.companies,
    });
  } catch (error) {
    yield put({
      type: companiesActionTypes.GET_COMPANIES_REQUEST_FAILED,
      payload: 'Some thing went wrong. Please try again later!',
    });
    yield put({
      type: authActionTypes.GET_AUTH_REQUEST_FAILED,
      payload: 'Some thing went wrong. Please try again later!',
    });
  }
}

function* companiesSaga() {
  yield takeLatest(companiesActionTypes.GET_COMPANIES_REQUEST, fetchCompanies);
  yield takeLatest(
    companiesActionTypes.GET_MORECOMPANIES_REQUEST,
    fetchMoreCompanies
  );
}

export default companiesSaga;
