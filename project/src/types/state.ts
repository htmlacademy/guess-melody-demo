import {Questions} from './question';
import {RootState} from '../store/root-reducer';
import {AuthorizationStatus} from '../const';

export type GameData = {
  questions: Questions,
  isDataLoaded: boolean,
};

export type GameProcess = {
  mistakes: number,
  step: number,
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
};

export type State = RootState;
