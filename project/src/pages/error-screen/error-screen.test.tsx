import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import ErrorScreen from './error-screen';

const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: ErrorScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ErrorScreen />
      </Provider>
    );

    expect(screen.getByText(/Не удалось загрузить вопросы/i)).toBeInTheDocument();
    expect(screen.getByText(/Попробовать ещё раз/i)).toBeInTheDocument();
  });
});
