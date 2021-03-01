import browserHistory from '../../browser-history';
import {Middleware} from 'redux';
import {State} from '../../types/state';
import {ActionType} from '../../types/action';

export const redirect: Middleware<unknown, State> =
  (_store) =>
    (next) =>
      (action) => {

        if (action.type === ActionType.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
