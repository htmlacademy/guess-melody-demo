import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api';
import {redirect} from './middlewares/redirect';

export const api = createAPI();

export const store = configureStore({
  // Временно удаляем reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
