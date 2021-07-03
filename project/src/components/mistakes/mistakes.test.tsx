import {render, screen} from '@testing-library/react';
import Mistakes from './mistakes';

describe('Component: Mistakes', () => {
  it('should render correctly', () => {
    const mistakesCount = 3;

    render(<Mistakes count={mistakesCount} />);

    expect(screen.getAllByTestId('mistake').length).toBe(mistakesCount);
  });
});
