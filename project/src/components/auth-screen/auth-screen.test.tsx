import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import AuthScreen from './auth-screen';

const mockStore = configureMockStore();

describe('Component: AuthScreen', () => {
  it('should render "AuthScreen" when user navigate to "login" url', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <AuthScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Сыграть ещё раз/i)).toBeInTheDocument();
    expect(screen.getByText(/Хотите узнать свой результат\? Представьтесь!/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'keks');
    userEvent.type(screen.getByTestId('password'), '123456');

    expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
  });
});
