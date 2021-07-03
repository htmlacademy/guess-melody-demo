import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route/history-route';
import WelcomeScreen from './welcome-screen';
import {AppRoute} from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});
const errorsCount = 3;

describe('Component: WelcomeScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Root}
                element={<WelcomeScreen errorsCount={errorsCount} />}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.getByText(/Правила игры/i)).toBeInTheDocument();
    expect(screen.getByText(/Нужно ответить на все вопросы/i)).toBeInTheDocument();
    expect(screen.getByText(`Можно допустить ${errorsCount} ошибки.`)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Начать игру');
  });

  it('should redirect to /game when user clicked to start button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Root}
                element={<WelcomeScreen errorsCount={errorsCount} />}
              />
              <Route
                path={AppRoute.Game}
                element={<h1>This is Game</h1>}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);

    expect(screen.queryByText(/This is Game/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/This is Game/i)).toBeInTheDocument();

    const actions = store.getActions();

    expect(actions[0].type).toBe('GAME/resetGame');
  });
});
