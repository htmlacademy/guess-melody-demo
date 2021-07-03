import {render} from '@testing-library/react';
import Mistakes from './mistakes';

describe('Component: Mistakes', () => {
  it('should render correctly', () => {
    const mistakesCount = 3;
    const {container} = render(<Mistakes count={mistakesCount} />);
    expect(container.querySelectorAll('.game__mistakes .wrong').length).toBe(mistakesCount);
  });
});
