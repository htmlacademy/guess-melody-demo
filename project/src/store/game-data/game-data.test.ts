import {gameData} from './game-data';
import {makeFakeArtistQuestion, makeFakeGenreQuestion} from '../../utils/mocks';
import {fetchQuestionAction} from '../api-actions';

const questions = [makeFakeArtistQuestion(), makeFakeGenreQuestion()];

describe('Reducer: gameData', () => {
  it('without additional parameters should return initial state', () => {
    expect(gameData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({questions: [], isQuestionsDataLoading: false, hasError: false});
  });

  it('should update questions by load questions', () => {
    const state = {questions: [], isQuestionsDataLoading: false, hasError: false};
    expect(gameData.reducer(state, {type: fetchQuestionAction.fulfilled.type, payload: questions}))
      .toEqual({questions, isQuestionsDataLoading: false, hasError: false});
  });

  it('should set hasError flag if server is unavailable', () => {
    const state = {questions: [], isQuestionsDataLoading: false, hasError: false};
    expect(gameData.reducer(state, {type: fetchQuestionAction.rejected.type}))
      .toEqual({questions: [], isQuestionsDataLoading: false, hasError: true});
  });
});
