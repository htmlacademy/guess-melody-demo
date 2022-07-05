import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse
} from 'axios';
import {toast} from 'react-toastify';
import {StatusCodes} from 'http-status-codes';
import {getToken} from './token';

const HTTPErrorCodesMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (response: AxiosResponse): boolean => !!HTTPErrorCodesMapping[response.status];

const BACKEND_URL = 'https://9.react.pages.academy/guess-melody';
const REQUEST_TIMEOUT = 5000;


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const { response } = error;

      if (response && shouldDisplayError(response)) {
        toast.warn(response.data.error);
      }

      throw error;
    }
  );

  return api;
};
