import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import WelcomeScreen from './welcome-screen';
import {AppRoute} from '../../const';
import {ActionType} from '../../store/action';

const mockStore = configureStore({});
let history = null;
let store;
const errorsCount = 3;


describe('Component: WelcomeScreen', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    store = mockStore({});
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.ROOT}>
              <WelcomeScreen errorsCount={errorsCount} />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.getByText(/Правила игры/i)).toBeInTheDocument();
    expect(screen.getByText(/Нужно ответить на все вопросы/i)).toBeInTheDocument();
    expect(screen.getByText(`Можно допустить ${errorsCount} ошибки.`)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').firstChild.textContent).toBe('Начать игру');
  });

  it('should redirect to /game when user clicked to start button', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.ROOT}>
              <WelcomeScreen errorsCount={errorsCount} />
            </Route>
            <Route exact path={AppRoute.GAME}>
              <h1>This is Game</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(/This is Game/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/This is Game/i)).toBeInTheDocument();

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(1, {
      type: ActionType.RESET_GAME,
    });
  });
});
