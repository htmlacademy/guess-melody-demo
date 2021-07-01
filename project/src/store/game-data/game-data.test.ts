import {gameData} from './game-data';
import {makeFakeArtistQuestion, makeFakeGenreQuestion} from '../../utils/mocks';
import {loadQuestions} from '../action';

const questions = [makeFakeArtistQuestion(), makeFakeGenreQuestion()];

describe('Reducer: gameData', () => {
  it('without additional parameters should return initial state', () => {
    expect(gameData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({questions: [], isDataLoaded: false});
  });

  it('should update questions by load questions', () => {
    const state = {questions: [], isDataLoaded: false};
    expect(gameData(state, loadQuestions(questions)))
      .toEqual({questions, isDataLoaded: true});
  });
});
