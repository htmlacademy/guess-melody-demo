import {gameProcess} from './game-process';
import {incrementStep, checkUserAnswer, resetGame} from '../action';
import {makeFakeArtistQuestion, makeFakeGenreQuestion} from '../../utils/mocks';
import {GameProcess} from '../../types/state';

const mockArtistQuestion = makeFakeArtistQuestion();
const mockFakeGenreQuestion = makeFakeGenreQuestion();

describe('Reducer: gameProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(gameProcess(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({step: 0, mistakes: 0});
  });

  it('should increment current step by a given value', () => {
    const state = {step: 0, mistakes: 0};
    expect(gameProcess(state, incrementStep()))
      .toEqual({step: 1, mistakes: 0});
  });

  it('should increase number of mistakes with the wrong answer', () => {
    const state = {step: 0, mistakes: 0};
    const wrongArtistQuestionAnswer = 'unknown';
    const wrongGenreQuestionAnswer = mockFakeGenreQuestion
      .answers
      .map((answer) => answer.genre !== mockFakeGenreQuestion.genre);

    expect(gameProcess(state, checkUserAnswer(mockArtistQuestion, wrongArtistQuestionAnswer)))
      .toEqual({step: 0, mistakes: 1});

    expect(gameProcess(state, checkUserAnswer(mockFakeGenreQuestion, wrongGenreQuestionAnswer)))
      .toEqual({step: 0, mistakes: 1});
  });

  it('should not increase mistakes with the correct answer', () => {
    const state: GameProcess = {step: 0, mistakes: 0};
    const {artist: correctlyArtistQuestionAnswer} = mockArtistQuestion.song;
    const correctlyGenreQuestionAnswer = mockFakeGenreQuestion
      .answers.map((answer) => answer.genre === mockFakeGenreQuestion.genre);

    expect(gameProcess(state, checkUserAnswer(mockArtistQuestion, correctlyArtistQuestionAnswer)))
      .toEqual({step: 0, mistakes: 0});

    expect(gameProcess(state, checkUserAnswer(mockFakeGenreQuestion, correctlyGenreQuestionAnswer)))
      .toEqual({step:0, mistakes: 0});
  });

  it('should have reset game', () => {
    expect(gameProcess({step: 5, mistakes: 1}, resetGame()))
      .toEqual({step: 0, mistakes: 0});

    expect(gameProcess({step: 0, mistakes: 0}, resetGame()))
      .toEqual({step: 0, mistakes: 0});

    expect(gameProcess({step: 2, mistakes: 0}, resetGame()))
      .toEqual({step: 0, mistakes: 0});
  });
});
