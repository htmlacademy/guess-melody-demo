import { makeFakeArtistQuestion } from '../../utils/mocks';
import { fetchQuestionAction } from '../api-actions';
import { gameData } from './game-data';

describe('GameData Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      questions: [],
      isQuestionsDataLoading: false,
      hasError: false
    };

    const result = gameData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      questions: [],
      isQuestionsDataLoading: false,
      hasError: false
    };

    const result = gameData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isQuestionsDataLoading" to "true", "hasError" to "false" with "fetchQuestionAction.pending"', () => {
    const expectedState = {
      questions: [],
      isQuestionsDataLoading: true,
      hasError: false,
    };

    const result = gameData.reducer(undefined, fetchQuestionAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "questions" to array with question, "isQuestionsDataLoading" to "false" with "fetchQuestionAction.fulfilled"', () => {
    const mockArtistQuestion = makeFakeArtistQuestion();
    const expectedState = {
      questions: [mockArtistQuestion],
      isQuestionsDataLoading: false,
      hasError: false,
    };

    const result = gameData.reducer(
      undefined,
      fetchQuestionAction.fulfilled(
        [mockArtistQuestion], '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isQuestionsDataLoading" to "true", "hasError" to "true" with "fetchQuestionAction.rejected', () => {
    const expectedState = {
      questions: [],
      isQuestionsDataLoading: false,
      hasError: true,
    };

    const result = gameData.reducer(
      undefined,
      fetchQuestionAction.rejected
    );

    expect(result).toEqual(expectedState);
  });
});
