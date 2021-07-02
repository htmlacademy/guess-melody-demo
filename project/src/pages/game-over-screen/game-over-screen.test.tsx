import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import userEvent from '@testing-library/user-event';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
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
        <HistoryRouter history={history}>
          <HelmetProvider>
            <GameOverScreen />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Какая жалость!/i)).toBeInTheDocument();
    expect(screen.getByText(/У вас закончились все попытки/i)).toBeInTheDocument();
    expect(screen.getByText(/Попробовать ещё раз/i)).toBeInTheDocument();
  });

  it('when user click "Replay Button" should redirect', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Lose}
                element={<GameOverScreen />}
              />
              <Route
                path={AppRoute.Game}
                element={<h1>Mock Game Screen</h1>}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByText(/Попробовать ещё раз/i));

    expect(screen.getByText(/Mock Game Screen/i)).toBeInTheDocument();
  });
});
