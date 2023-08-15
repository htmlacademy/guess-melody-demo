import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GenreQuestionItem from './genre-question-item';

describe('Component: GenreQuestionItem', () => {
  const expectedText = 'mockPlayer';
  const mockAnswer = { src: 'fakePath', genre: 'fakeGenre' };
  const mockPlayer = () => <span>{expectedText}</span>;
  const mockId = 2;
  const mockUserAnswer = false;
  const mockHandleChange = vi.fn();

  it('should render correctly', () => {
    render(
      <GenreQuestionItem
        answer={mockAnswer}
        id={mockId}
        onChange={mockHandleChange}
        renderPlayer={mockPlayer}
        userAnswer={mockUserAnswer}
      />);

    expect(screen.getByText(/Отметить/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByText('mockPlayer')).toBeInTheDocument();
  });

  it('onChange should called when user choose answer', async () => {
    render(
      <GenreQuestionItem
        answer={mockAnswer}
        id={mockId}
        onChange={mockHandleChange}
        renderPlayer={mockPlayer}
        userAnswer={mockUserAnswer}
      />);
    await userEvent.click(screen.getByRole('checkbox'));

    expect(mockHandleChange).toBeCalled();
    expect(mockHandleChange).nthCalledWith(1, mockId, true);
  });

  it('should checked when change prop userAnswer', () => {
    const { rerender } = render(
      <GenreQuestionItem
        answer={mockAnswer}
        id={mockId}
        onChange={mockHandleChange}
        renderPlayer={mockPlayer}
        userAnswer={mockUserAnswer}
      />);

    rerender(
      <GenreQuestionItem
        answer={mockAnswer}
        id={mockId}
        onChange={mockHandleChange}
        renderPlayer={mockPlayer}
        userAnswer
      />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
