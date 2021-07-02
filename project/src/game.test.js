import {isArtistAnswerCorrect, isGenreAnswerCorrect} from './game';

describe('Business Login: check user\'s answer', () => {
  let mockArtistQuestion = null;
  let mockGenreQuestion = null;

  describe('Function: isArtistAnswerCorrect', () => {
    beforeAll(() => {
      mockArtistQuestion = {
        type: 'artist',
        song: {
          artist: 'Bon Jovi',
        },
        answers: [
          {
            artist: 'Bon Jovi',
          },
          {
            artist: 'Cinderella',
          },
          {
            artist: 'Skid Row',
          },
        ],
      };
    });

    it('should return "true" when answer is correct', () => {
      const correctAnswer = {artist: 'Bon Jovi'};
      expect(isArtistAnswerCorrect(mockArtistQuestion, correctAnswer)).toBe(true);
    });

    it('should return "false" when answer is incorrect', () => {
      const incorrectAnswer = {artist: 'Cinderella'};
      expect(isArtistAnswerCorrect(mockArtistQuestion, incorrectAnswer)).toBe(false);
    });
  });

  describe('Function: isGenreAnswerCorrect', () => {
    beforeAll(() => {
      mockGenreQuestion = {
        type: 'genre',
        genre: 'jazz',
        answers: [
          {
            genre: 'rock',
            src: '',
          },
          {
            genre: 'jazz',
            src: '',
          },
          {
            genre: 'blues',
            src: '',
          },
          {
            genre: 'jazz',
            src: '',
          },
        ],
      };
    });

    it('should return "true" when answer is correct', () => {
      const correctAnswer = [false, true, false, true];
      expect(isGenreAnswerCorrect(mockGenreQuestion, correctAnswer)).toBe(true);
    });

    it('should be return "false" when answer is incorrect', () => {
      const incorrectAnswer = [true, true, true, false];
      expect(isGenreAnswerCorrect(mockGenreQuestion, incorrectAnswer)).toBe(false);
    });
  });
});

