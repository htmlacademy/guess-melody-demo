import {Questions} from './question';
import {AuthorizationStatus} from '../const';

export type State = {
  mistakes: number,
  step: number,
  questions: Questions,
  authorizationStatus: AuthorizationStatus,
};
