import { render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { MAX_MISTAKE_COUNT, AppRoute, AuthorizationStatus } from '../../const';
import App from './app';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "WelcomeScreen" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Root);

    render(withStoreComponent);

    expect(screen.getByText(/Начать игру/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Можно допустить ${MAX_MISTAKE_COUNT}`, 'i'))).toBeInTheDocument();
  });

  it('should render "AuthScreen" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByText(/Сыграть ещё раз/i)).toBeInTheDocument();
    expect(screen.getByText(/Хотите узнать свой результат\? Представьтесь!/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();
  });

  it('should render "WinScreen" when user navigate to "/result"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth }
    }));
    mockHistory.push(AppRoute.Result);

    render(withStoreComponent);

    expect(screen.getByText(/Вы настоящий меломан!/i)).toBeInTheDocument();
    expect(screen.getByText(/Вы ответили правильно на 8 вопросов/i)).toBeInTheDocument();
    expect(screen.getByText(/Сыграть ещё раз/i)).toBeInTheDocument();
  });

  it('should render "GameOverScreen" when user navigate to "/lose"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth }
    }));
    mockHistory.push(AppRoute.Lose);

    render(withStoreComponent);

    expect(screen.getByText(/Какая жалость!/i)).toBeInTheDocument();
    expect(screen.getByText(/Попробовать ещё раз/i)).toBeInTheDocument();
    expect(screen.getByText(/У вас закончились все попытки. Ничего, повезёт в следующий раз!/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
