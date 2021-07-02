import {redirect} from './redirect';
import {redirectToRoute} from '../action';
import {AppRoute} from '../../const';

const mockRedux = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };

  const next = jest.fn();
  const invoke = (action) => redirect(store)(next)(action);
  return {store, next, invoke};
};

const fakeHistory = {
  location: {pathname: ''},
  push(path) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

describe('Middleware: redirect', () => {
  it('action should passes to next middleware', () => {
    const {invoke, next} = mockRedux();
    const action = redirectToRoute(AppRoute.ROOT);
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('route should be added to fakeHistory', () => {
    const {invoke} = mockRedux();
    invoke(redirectToRoute(AppRoute.LOGIN));
    expect(fakeHistory.location.pathname).toBe(AppRoute.LOGIN);

    invoke(redirectToRoute(AppRoute.LOSE));
    expect(fakeHistory.location.pathname).toBe(AppRoute.LOSE);
  });

  it('should not redirect because bad action', () => {
    const url = '/test-url';
    const {invoke} = mockRedux();
    invoke({type: 'TEST_ACTION', payload: url});
    expect(fakeHistory.location.pathname).not.toBe(url);
  });
});

