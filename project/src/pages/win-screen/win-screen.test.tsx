import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
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
        <HistoryRouter history={history}>
          <HelmetProvider>
            <WinScreen />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Вы настоящий меломан!/i)).toBeInTheDocument();
    expect(screen.getByText(/Вы ответили правильно/i)).toHaveTextContent(correctlyQuestionsCount.toString());
    expect(screen.getByText(/Вы ответили правильно/i)).toHaveTextContent(mistakes.toString());
  });

  it('should redirect when user click "Replay Button"', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Result}
                element={<WinScreen />}
              />
              <Route
                path={AppRoute.Game}
                element={<h1>Game Screen</h1>}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByText(/Сыграть ещё раз/i));

    expect(screen.getByText('Game Screen')).toBeInTheDocument();
  });
});
