import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GenreQuestionItem from './genre-question-item';

const mockAnswer = {src: 'fakePath', genre: 'fakeGenre'};
const player = () => <h1>fakePlayer</h1>;

describe('Component: GenreQuestionItem', () => {
  it('should render correctly', () => {
    render(
      <GenreQuestionItem
        answer={mockAnswer}
        id={1}
        onChange={jest.fn()}
        renderPlayer={player}
        userAnswer={false}
      />);

    expect(screen.getByText(/Отметить/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByText('fakePlayer')).toBeInTheDocument();
  });

  it('onChange should called when user choose answer', async () => {
    const onChange = jest.fn();
    const fakeId = 3;

    render(
      <GenreQuestionItem
        answer={mockAnswer}
        id={fakeId}
        onChange={onChange}
        renderPlayer={player}
        userAnswer={false}
      />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();

    await userEvent.click(screen.getByRole('checkbox'));

    expect(onChange).toBeCalled();
    expect(onChange).nthCalledWith(1, fakeId, true);
  });

  it('should checked when user clicked', () => {
    const fakeId = 2;

    const {rerender} = render(
      <GenreQuestionItem
        answer={mockAnswer}
        id={fakeId}
        onChange={jest.fn()}
        renderPlayer={player}
        userAnswer={false}
      />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(
      <GenreQuestionItem
        answer={mockAnswer}
        id={fakeId}
        onChange={jest.fn()}
        renderPlayer={player}
        userAnswer
      />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
