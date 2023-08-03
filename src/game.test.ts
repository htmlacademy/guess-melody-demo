import { isArtistAnswerCorrect } from './game';
import { makeFakeArtistQuestion } from './utils/mocks';

describe('Function: isArtistAnswerCorrect', () => {
  it('should return "true" when answer is correct', () => {
    // Arrange
    const mockArtiestQuestion = makeFakeArtistQuestion();
    const { artist: correctAnswer } = mockArtiestQuestion.song;

    // Act
    const result = isArtistAnswerCorrect(mockArtiestQuestion, correctAnswer);

    // Assert
    expect(result).toBe(true);
  });
});
