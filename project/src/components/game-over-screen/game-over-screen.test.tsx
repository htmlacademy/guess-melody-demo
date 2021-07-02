import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import GameOverScreen from './game-over-screen';
import {AppRoute} from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});

describe('Component: GameOverScreen', () => {
  beforeEach(() => {
    history.push(AppRoute.Lose);
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <GameOverScreen
            onReplayButtonClick={jest.fn()}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Какая жалость!/i)).toBeInTheDocument();
    expect(screen.getByText(/У вас закончились все попытки/i)).toBeInTheDocument();
    expect(screen.getByText(/Попробовать ещё раз/i)).toBeInTheDocument();
  });

  it('when user click "Replay Button" should redirect', () => {
    const replayButtonClickHandle = jest.fn();
    replayButtonClickHandle.mockImplementation(
      () => history.push(AppRoute.Game),
    );

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Lose}>
              <GameOverScreen
                onReplayButtonClick={replayButtonClickHandle}
              />
            </Route>
            <Route exact path={AppRoute.Game}><h1>Mock Game Screen</h1></Route>
          </Switch>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText(/Попробовать ещё раз/i));

    expect(replayButtonClickHandle).toBeCalled();
    expect(screen.getByText(/Mock Game Screen/i)).toBeInTheDocument();
  });
});
