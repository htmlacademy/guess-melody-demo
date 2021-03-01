import {createReducer} from '@reduxjs/toolkit';
import {requireAuthorization} from '../action';
import {AuthorizationStatus} from '../../const';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const user = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization, (state, action) => {
    return {
      ...state,
      authorizationStatus: action.payload,
    };
  });
});

export {user};
