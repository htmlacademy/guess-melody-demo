import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import NotFoundScreen from './not-found-screen';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const {container} = render(
      <Router history={history}>
        <NotFoundScreen />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
