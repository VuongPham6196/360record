import { authActionTypes } from './actions';

const initialState = {
  loading: false,
  loginStatus: false,
};

const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case authActionTypes.GET_AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authActionTypes.GET_AUTH_REQUEST_SUCCESS:
      return { ...state, loading: false, loginStatus: action.payload };
    case authActionTypes.GET_AUTH_REQUEST_FAILED:
      return { ...state, loading: false, loginStatus: action.payload };
    default:
      return state;
  }
};

export default loginReducer;
