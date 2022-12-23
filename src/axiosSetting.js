import axios from 'axios';

export const setInterceptors = (store) => {
  if (!store) {
    return;
  }

  axios.interceptors.response.use(
    function (response) {
      console.log('inside interceptors', store.getState());
      return response;
    },
    function (error) {
      console.log('inside interceptors - error', store.getState());
      return Promise.reject(error);
    }
  );
};
