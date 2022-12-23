import { cookies } from 'api/httpClient';
import { authActionTypes } from './actions';

const initialState = {
  loading: false,
  token: localStorage.getItem('token') || cookies.get('token') || null,
  user: localStorage.getItem('user') || cookies.get('user'),
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
      const { user } = action.payload.data.authenticate;
      const { remember } = action.payload;

      if (remember) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        cookies.set('token', token);
        cookies.set('user', JSON.stringify(user));
      }

      return {
        ...state,
        loading: false,
        token: token,
        user: user,
        errorMsg: null,
      };

    case authActionTypes.GET_AUTH_REQUEST_FAILED:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      cookies.remove('token');
      cookies.remove('user');
      return {
        ...state,
        loading: false,
        token: null,
        user: null,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
