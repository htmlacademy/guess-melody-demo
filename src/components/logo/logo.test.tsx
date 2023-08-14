import Logo from './logo';
import { withHistory } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedText = 'Сыграть ещё раз';
    const expectedAltText = 'Угадай мелодию';
    const preparedComponent = withHistory(<Logo />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
