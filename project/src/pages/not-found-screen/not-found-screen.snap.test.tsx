import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import NotFoundScreen from './not-found-screen';
import HistoryRouter from '../../components/history-route/history-route';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const {container} = render(
      <HistoryRouter history={history}>
        <NotFoundScreen />
      </HistoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
