import request from 'axios';
import {StatusCodes} from 'http-status-codes';
import {store} from '../store';
import {setError} from '../store/action';
import {clearErrorAction} from '../store/api-actions';
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

  const handleError = (message: string) => {
    store.dispatch(setError(message));
    store.dispatch(clearErrorAction());
  };

  const {response} = error;

  if (response && errorHandlerList.includes(response.status)) {
    handleError(response.data.error);
  }
};
