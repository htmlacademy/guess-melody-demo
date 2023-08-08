import { NameSpace } from '../../const';
import { makeFakeArtistQuestion } from '../../utils/mocks';
import { getErrorStatus, getQuestions, getQuestionsDataLoadingStatus } from './selectors';

describe('GameData selectors', () => {
  const mockArtistQuestion = makeFakeArtistQuestion();
  const state = {
    [NameSpace.Data]: {
      questions: [mockArtistQuestion],
      isQuestionsDataLoading: true,
      hasError: false,
    }
  };

  it('should return questions from state', () => {
    const { questions } = state[NameSpace.Data];
    const result = getQuestions(state);
    expect(result).toEqual(questions);
  });

  it('should return questions data loading status', () => {
    const { isQuestionsDataLoading } = state[NameSpace.Data];
    const result = getQuestionsDataLoadingStatus(state);
    expect(result).toBe(isQuestionsDataLoading);
  });

  it('should return error status from state', () => {
    const { hasError } = state[NameSpace.Data];
    const result = getErrorStatus(state);
    expect(result).toBe(hasError);
  });
});
