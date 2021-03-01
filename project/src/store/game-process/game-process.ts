import {createReducer} from '@reduxjs/toolkit';
import {isAnswerCorrect} from '../../game';
import {incrementStep, checkUserAnswer, resetGame} from '../action';
import {GameProcess} from '../../types/state';
import {FIRST_GAME_STEP} from '../../const';

const initialState: GameProcess = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
};

const STEP_COUNT = 1;

const gameProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(incrementStep, (state) => {
      state.step = state.step + STEP_COUNT;
    })
    .addCase(checkUserAnswer, (state, action) => {
      const {question, userAnswer} = action.payload;
      state.mistakes = state.mistakes + Number(!isAnswerCorrect(question, userAnswer));
    })
    .addCase(resetGame, (state) => {
      state.mistakes = 0;
      state.step = FIRST_GAME_STEP;
    });
});

export {gameProcess};
