import axios from 'axios';

export const createAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/guess-melody`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.status === 403) {
      onLoginFail();
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
