import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import GenreQuestionScreen from './genre-question-screen';
import {GameType} from '../../const';

const history = createMemoryHistory();
const mockGenreQuestion = {
  answers: [
    {
      genre: 'rock',
      src: 'fakeRock.ogg',
    },
    {
      genre: 'blues',
      src: 'fakeBlues.ogg',
    },
    {
      genre: 'rock',
      src: 'fakeRock2.ogg',
    },
    {
      genre: 'jazz',
      src: 'fakeJazz.ogg',
    },
  ],
  type: GameType.GENRE,
  genre: 'rock',
};

describe('Component: GenreQuestionScreen', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <GenreQuestionScreen
          onAnswer={jest.fn()}
          question={mockGenreQuestion}
          renderPlayer={jest.fn(() => <h1>Fake player</h1>)}
        >
          <span>Something component</span>
        </GenreQuestionScreen>
      </Router>);

    expect(screen.getByText(/Выберите rock треки/i)).toBeInTheDocument();
    expect(screen.getByText(/Something component/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Fake player/i).length).toBe(mockGenreQuestion.answers.length);
    expect(screen.getByRole('button').textContent).toBe('Ответить');
    expect(screen.getAllByRole('checkbox').length).toBe(mockGenreQuestion.answers.length);
  });

  it('onAnswer should called when user choose answer', () => {
    const onAnswer = jest.fn();
    render(
      <Router history={history}>
        <GenreQuestionScreen
          onAnswer={onAnswer}
          question={mockGenreQuestion}
          renderPlayer={jest.fn(() => <h1>Fake player</h1>)}
        >
          <span>Something component</span>
        </GenreQuestionScreen>
      </Router>);

    const [
      firstAnswerElement,,
      thirdAnswerElement,
    ] = screen.getAllByRole('checkbox');

    const expectedAnswers = [true, false, true, false];

    userEvent.click(firstAnswerElement);
    userEvent.click(thirdAnswerElement);
    userEvent.click(screen.getByRole('button'));

    expect(firstAnswerElement).toBeChecked();
    expect(thirdAnswerElement).toBeChecked();

    expect(onAnswer).toBeCalled();
    expect(onAnswer).nthCalledWith(1, mockGenreQuestion, expectedAnswers);
  });
});
