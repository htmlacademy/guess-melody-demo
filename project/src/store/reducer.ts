import {createReducer} from '@reduxjs/toolkit';
import {incrementStep, checkUserAnswer, loadQuestions, requireAuthorization, resetGame, setError} from './action';
import {isAnswerCorrect} from '../game';
import {FIRST_GAME_STEP, AuthorizationStatus} from '../const';
import {Questions} from '../types/question';

const STEP_COUNT = 1;

type InitalState = {
  mistakes: number;
  step: number;
  questions: Questions;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
}

const initialState: InitalState = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
  questions: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(incrementStep, (state) => {
      state.step = state.step + STEP_COUNT;
    })
    .addCase(checkUserAnswer, (state, action) => {
      const {question, userAnswer} = action.payload;

      state.mistakes += Number(!isAnswerCorrect(question, userAnswer));
    })
    .addCase(resetGame, (state) => {
      state.mistakes = 0;
      state.step = FIRST_GAME_STEP;
    })
    .addCase(loadQuestions, (state, action) => {
      state.questions = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
