import {render} from '@testing-library/react';
import Mistakes from './mistakes';

const count = 3;

describe('Component: Mistakes', () => {
  it('should render correctly', () => {
    const {container} = render(<Mistakes count={count} />);

    expect(container).toMatchSnapshot();
  });
});
