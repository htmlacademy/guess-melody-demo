import { render, screen } from '@testing-library/react';
import Mistakes from './mistakes';

describe('Component: Mistakes', () => {
  it('should render correct', () => {
    const expectedCount = 3;
    const mistakeContainerTestId = 'mistake-container';
    const mistakeValueTestId = 'mistake-value';

    render(<Mistakes count={expectedCount} />);
    const mistakesContainer = screen.getByTestId(mistakeContainerTestId);
    const mistakeValues = screen.getAllByTestId(mistakeValueTestId);

    expect(mistakesContainer).toBeInTheDocument();
    expect(mistakeValues.length).toBe(expectedCount);
  });
});
