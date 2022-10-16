import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import ErrorScreen from './error-screen';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: ErrorScreen', () => {

  it('should render correctly', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ErrorScreen />
      </Provider>
    );

    expect(screen.getByText(/Не удалось загрузить вопросы/i)).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Попробовать ещё раз');
  });

  it('should fetch questions if the button is clicked', async () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ErrorScreen />
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('data/fetchQuestions/pending');
  });
});
