import { cookies } from 'api/httpClient';
import { authActionTypes } from './actions';

const initialState = {
  loading: false,
  token: localStorage.getItem('token') || cookies.get('token') || null,
  errorMsg: null,
};

const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case authActionTypes.GET_AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        errorMsg: null,
      };
    case authActionTypes.GET_AUTH_REQUEST_SUCCESS:
      const { token } = action.payload.data.authenticate;
      const { remember } = action.payload;

      if (remember) {
        localStorage.setItem('token', token);
      } else {
        cookies.set('token', token);
      }
      return { ...state, loading: false, token: token, errorMsg: null };

    case authActionTypes.GET_AUTH_REQUEST_FAILED:
      localStorage.removeItem('token');
      cookies.remove('token');
      return {
        ...state,
        loading: false,
        token: null,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
