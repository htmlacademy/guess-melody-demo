import { AuthorizationStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

describe('UserProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { authorizationStatus: AuthorizationStatus.Auth };

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { authorizationStatus: AuthorizationStatus.Unknown };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "checkAuthAction.fulfilled" action', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.NoAuth };
    const expectedState = { authorizationStatus: AuthorizationStatus.Auth };

    const result = userProcess.reducer(initialState, checkAuthAction.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Auth };
    const expectedState = { authorizationStatus: AuthorizationStatus.NoAuth };

    const result = userProcess.reducer(initialState, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "loginAction.fulfilled" action', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.NoAuth };
    const expectedState = { authorizationStatus: AuthorizationStatus.Auth };

    const result = userProcess.reducer(initialState, loginAction.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Auth };
    const expectedState = { authorizationStatus: AuthorizationStatus.NoAuth };

    const result = userProcess.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth", with "logoutAction.fulfilled" action', () => {
    const initialState = { authorizationStatus: AuthorizationStatus.Auth };
    const expectedState = { authorizationStatus: AuthorizationStatus.NoAuth };

    const result = userProcess.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
