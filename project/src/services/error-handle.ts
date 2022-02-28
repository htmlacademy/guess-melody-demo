import request from 'axios';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';
import {ErrorType} from '../types/error';

export const errorHandle = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const errorHandlerList = [
    StatusCodes.BAD_REQUEST,
    StatusCodes.UNAUTHORIZED,
    StatusCodes.NOT_FOUND
  ];

  const {response} = error;

  if (response && errorHandlerList.includes(response.status)) {
    toast.warn(response.data.error);
  }
};
