import {isArtistAnswerCorrect} from './game';
import {makeFakeArtistQuestion} from './utils/mocks';

const mockArtistQuestion = makeFakeArtistQuestion();

describe('Function: isArtistAnswerCorrect', () => {
  it('should return "true" when answer is correct', () => {
    const {artist: correctAnswer} = mockArtistQuestion.song;
    expect(isArtistAnswerCorrect(mockArtistQuestion, correctAnswer))
      .toBe(true);
  });
});
