import {render} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import NotFoundScreen from './not-found-screen';
import HistoryRouter from '../../components/history-route/history-route';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    const {container} = render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <NotFoundScreen />
        </HelmetProvider>
      </HistoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
