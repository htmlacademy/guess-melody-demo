import {userProcess} from './user-process';
import {AuthorizationStatus} from '../../const';
import {requireAuthorization} from './user-process';

describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown});
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.NoAuth};

    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth});
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.NoAuth};

    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
  });
});
