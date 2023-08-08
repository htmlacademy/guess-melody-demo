import { FIRST_GAME_STEP } from '../../const';
import { makeFakeArtistQuestion } from '../../utils/mocks';
import { checkUserAnswer, gameProcess, incrementStep, resetGame } from './game-process';

describe('GameProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = { mistakes: 333, step: 10 };

    const result = gameProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = { mistakes: 0, step: FIRST_GAME_STEP };

    const result = gameProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should reset game with "resetGame" action', () => {
    const initialState = { mistakes: 333, step: 10 };
    const expectedState = { mistakes: 0, step: FIRST_GAME_STEP };

    const result = gameProcess.reducer(initialState, resetGame);

    expect(result).toEqual(expectedState);
  });

  it('should increment step with "incrementStep" action', () => {
    const initialState = { mistakes: 333, step: 4 };
    const expectedStep = 5;

    const result = gameProcess.reducer(initialState, incrementStep);

    expect(result.step).toBe(expectedStep);
  });

  it('should not increment mistake count with "checkUserAnswer" action and correct answer', () => {
    const initialState = { mistakes: 0, step: 4 };
    const expectedMistakeCount = 0;
    const question = makeFakeArtistQuestion();
    const { artist: userAnswer } = question.song;

    const result = gameProcess.reducer(initialState, checkUserAnswer({ question, userAnswer }));

    expect(result.mistakes).toBe(expectedMistakeCount);
  });

  it('should increment mistake count with "checkUserAnswer" action and not correct answer', () => {
    const initialState = { mistakes: 0, step: 4 };
    const expectedMistakeCount = 1;
    const question = makeFakeArtistQuestion();
    const userAnswer = 'unknown artist';

    const result = gameProcess.reducer(initialState, checkUserAnswer({ question, userAnswer }));

    expect(result.mistakes).toBe(expectedMistakeCount);
  });

});
