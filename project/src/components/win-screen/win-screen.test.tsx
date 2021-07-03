import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import WinScreen from './win-screen';
import {AppRoute} from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Result);

const store = mockStore({
  GAME: {step: 10, mistakes: 2},
});

describe('Component: WinScreen', () => {
  it('should render correctly', () => {
    const correctlyQuestionsCount = 8;
    const mistakes = 2;
    render(
      <Provider store={store}>
        <Router history={history}>
          <WinScreen
            onReplayButtonClick={jest.fn()}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Вы настоящий меломан!/i)).toBeInTheDocument();
    expect(screen.getByText(/Вы ответили правильно/i)).toHaveTextContent(correctlyQuestionsCount.toString());
    expect(screen.getByText(/Вы ответили правильно/i)).toHaveTextContent(mistakes.toString());
  });

  it('should redirect when user click "Replay Button"', () => {
    const replayButtonClickHandle = jest.fn(
      () => history.push(AppRoute.Game));

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.Result}>
              <WinScreen
                onReplayButtonClick={replayButtonClickHandle}
              />
            </Route>
            <Route exact path={AppRoute.Game}><h1>Game Screen</h1></Route>
          </Switch>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText(/Сыграть ещё раз/i));
    expect(replayButtonClickHandle).toBeCalled();
    expect(screen.getByText('Game Screen')).toBeInTheDocument();
  });
});
