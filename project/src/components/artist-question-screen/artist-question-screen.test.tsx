import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import ArtistQuestionScreen from './artist-question-screen';
import {makeFakeArtistQuestion} from '../../utils/mocks';

const mockArtist = makeFakeArtistQuestion();
const history = createMemoryHistory();

describe('Component: ArtistQuestionScreen', () => {
  it('should render correctly', () => {
    const [firstArtist, secondArtist, thirdArtist] = mockArtist.answers;
    render(
      <Router history={history}>
        <ArtistQuestionScreen
          question={mockArtist}
          onAnswer={jest.fn()}
          renderPlayer={jest.fn(() => <h1>Fake player</h1>)}
        >
          <span>Something component</span>
        </ArtistQuestionScreen>
      </Router>);

    expect(screen.getByText(/Кто исполняет эту песню/i)).toBeInTheDocument();
    expect(screen.getByText(/Fake player/i)).toBeInTheDocument();
    expect(screen.getByText(/Something component/i)).toBeInTheDocument();
    expect(screen.getByText(firstArtist.artist)).toBeInTheDocument();
    expect(screen.getByText(secondArtist.artist)).toBeInTheDocument();
    expect(screen.getByText(thirdArtist.artist)).toBeInTheDocument();
  });

  it('onAnswer should called when user choose answer', () => {
    const onAnswer = jest.fn();
    render(
      <Router history={history}>
        <ArtistQuestionScreen
          question={mockArtist}
          onAnswer={onAnswer}
          renderPlayer={jest.fn(() => <h1>Fake player</h1>)}
        >
          <span>Something component</span>
        </ArtistQuestionScreen>
      </Router>);

    const [firstAnswerData, secondAnswerData, thirdAnswerData] = mockArtist.answers;
    const [firstAnswer, secondAnswer, thirdAnswer] = screen.queryAllByRole('radio');

    userEvent.click(firstAnswer);
    userEvent.click(secondAnswer);
    userEvent.click(thirdAnswer);

    expect(onAnswer).toBeCalledTimes(3);
    expect(onAnswer).nthCalledWith(1, mockArtist, firstAnswerData.artist);
    expect(onAnswer).nthCalledWith(2, mockArtist, secondAnswerData.artist);
    expect(onAnswer).nthCalledWith(3, mockArtist, thirdAnswerData.artist);
  });
});
