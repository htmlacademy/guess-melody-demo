import { isArtistAnswerCorrect, isGenreAnswerCorrect } from './game';
import { makeFakeArtistQuestion, makeFakeGenreQuestion } from './utils/mocks';

describe('Business Logic: check user\'s answer', () => {
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

    it('should return "false" when answer is incorrect', () => {
      // Arrange
      const mockArtiestQuestion = makeFakeArtistQuestion();
      const incorrectAnswer = 'unknown';

      // Act
      const result = isArtistAnswerCorrect(mockArtiestQuestion, incorrectAnswer);

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('Function: isGenreAnswerCorrect', () => {
    it('should return "true" when answer is correct', () => {
      // Arrange
      const mockGenreQuestion = makeFakeGenreQuestion();
      const { answers } = mockGenreQuestion;
      const correctAnswer = answers.map((answer) => answer.genre === mockGenreQuestion.genre);

      // Act
      const result = isGenreAnswerCorrect(mockGenreQuestion, correctAnswer);

      // Assert
      expect(result).toBe(true);
    });

    it('should be return "false" when answer is incorrect', () => {
      const mockGenreQuestion = makeFakeGenreQuestion();
      const { answers } = mockGenreQuestion;
      const incorrectAnswer = answers.map((answer) => answer.genre !== mockGenreQuestion.genre);

      const result = isGenreAnswerCorrect(mockGenreQuestion, incorrectAnswer);

      expect(result).toBe(false);
    });
  });
});

