import {store} from '../store/index.js';
import {Questions} from './question.js';
import {AuthorizationStatus} from '../const.js';

export type GameData = {
  questions: Questions;
  isQuestionsDataLoading: boolean;
  hasError: boolean;
};

export type GameProcess = {
  mistakes: number;
  step: number;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
