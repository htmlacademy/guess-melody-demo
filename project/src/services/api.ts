import axios, {AxiosInstance} from 'axios';

const BACKEND_URL = 'https://10.react.pages.academy/guess-melody';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};
