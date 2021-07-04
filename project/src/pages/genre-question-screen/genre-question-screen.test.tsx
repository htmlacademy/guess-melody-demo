import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-route/history-route';
import GenreQuestionScreen from './genre-question-screen';
import {makeFakeGenreQuestion} from '../../utils/mocks';
import {UserGenreQuestionAnswer} from '../../types/question';

const history = createMemoryHistory();
const mockGenreQuestion = makeFakeGenreQuestion();

describe('Component: GenreQuestionScreen', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <GenreQuestionScreen
            onAnswer={jest.fn()}
            question={mockGenreQuestion}
            renderPlayer={jest.fn(() => <h1>Fake player</h1>)}
          >
            <span>Something component</span>
          </GenreQuestionScreen>
        </HelmetProvider>
      </HistoryRouter>);

    expect(screen.getByText(new RegExp(`Выберите ${mockGenreQuestion.genre} треки`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Something component/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Fake player/i).length).toBe(mockGenreQuestion.answers.length);
    expect(screen.getByRole('button').textContent).toBe('Ответить');
    expect(screen.getAllByRole('checkbox').length).toBe(mockGenreQuestion.answers.length);
  });

  it('onAnswer should called when user choose answer', async () => {
    const onAnswer = jest.fn();

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <GenreQuestionScreen
            onAnswer={onAnswer}
            question={mockGenreQuestion}
            renderPlayer={jest.fn(() => <h1>Fake player</h1>)}
          >
            <span>Something component</span>
          </GenreQuestionScreen>
        </HelmetProvider>
      </HistoryRouter>);

    const [
      firstAnswerElement,,
      thirdAnswerElement,
    ] = screen.getAllByRole('checkbox');

    const expectedAnswers: UserGenreQuestionAnswer = [true, false, true, false];

    await userEvent.click(firstAnswerElement);
    await userEvent.click(thirdAnswerElement);
    await userEvent.click(screen.getByRole('button'));

    expect(firstAnswerElement).toBeChecked();
    expect(thirdAnswerElement).toBeChecked();

    expect(onAnswer).toBeCalled();
    expect(onAnswer).nthCalledWith(1, mockGenreQuestion, expectedAnswers);
  });
});
