export const authActionTypes = {
  GET_AUTH_REQUEST: 'GET_AUTH_REQUEST',
  GET_AUTH_REQUEST_SUCCESS: 'GET_AUTH_REQUEST_SUCCESS',
  GET_AUTH_REQUEST_FAILED: 'GET_AUTH_REQUEST_FAILED',
};

export const getAuth = (payload: any) => {
  return {
    type: authActionTypes.GET_AUTH_REQUEST,
    payload,
  };
};
