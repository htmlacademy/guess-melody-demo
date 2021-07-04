import {render, screen} from '@testing-library/react';
import {HelmetProvider} from 'react-helmet-async';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-route/history-route';
import ArtistQuestionScreen from './artist-question-screen';
import {makeFakeArtistQuestion} from '../../utils/mocks';

const mockArtist = makeFakeArtistQuestion();
const history = createMemoryHistory();

describe('Component: ArtistQuestionScreen', () => {
  it('should render correctly', () => {
    const [firstArtist, secondArtist, thirdArtist] = mockArtist.answers;

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <ArtistQuestionScreen
            question={mockArtist}
            onAnswer={jest.fn()}
            renderPlayer={jest.fn(() => <h1>Fake player</h1>)}
          >
            <span>Something component</span>
          </ArtistQuestionScreen>
        </HelmetProvider>
      </HistoryRouter>);

    expect(screen.getByText(/Кто исполняет эту песню/i)).toBeInTheDocument();
    expect(screen.getByText(/Fake player/i)).toBeInTheDocument();
    expect(screen.getByText(/Something component/i)).toBeInTheDocument();
    expect(screen.getByText(firstArtist.artist)).toBeInTheDocument();
    expect(screen.getByText(secondArtist.artist)).toBeInTheDocument();
    expect(screen.getByText(thirdArtist.artist)).toBeInTheDocument();
  });

  it('onAnswer should called when user choose answer', async () => {
    const onAnswer = jest.fn();

    render(
      <HistoryRouter history={history}>
        <HelmetProvider>
          <ArtistQuestionScreen
            question={mockArtist}
            onAnswer={onAnswer}
            renderPlayer={jest.fn(() => <h1>Fake player</h1>)}
          >
            <span>Something component</span>
          </ArtistQuestionScreen>
        </HelmetProvider>
      </HistoryRouter>);

    const [firstAnswerData, secondAnswerData, thirdAnswerData] = mockArtist.answers;
    const [firstAnswer, secondAnswer, thirdAnswer] = screen.queryAllByRole('radio');

    await userEvent.click(firstAnswer);
    await userEvent.click(secondAnswer);
    await userEvent.click(thirdAnswer);

    expect(onAnswer).toBeCalledTimes(3);
    expect(onAnswer).nthCalledWith(1, mockArtist, firstAnswerData.artist);
    expect(onAnswer).nthCalledWith(2, mockArtist, secondAnswerData.artist);
    expect(onAnswer).nthCalledWith(3, mockArtist, thirdAnswerData.artist);
  });
});
