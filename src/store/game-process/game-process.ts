import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {isAnswerCorrect} from '../../game';
import {NameSpace, FIRST_GAME_STEP} from '../../const';
import {GameProcess} from '../../types/state';
import {Question, UserAnswer} from '../../types/question';

const initialState: GameProcess = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
};

const STEP_COUNT = 1;

export const gameProcess = createSlice({
  name: NameSpace.Game,
  initialState,
  reducers: {
    incrementStep: (state) => {
      state.step = state.step + STEP_COUNT;
    },
    checkUserAnswer: (state, action: PayloadAction<{question: Question; userAnswer: UserAnswer}>) => {
      const {question, userAnswer} = action.payload;

      state.mistakes += Number(!isAnswerCorrect(question, userAnswer));
    },
    resetGame: (state) => {
      state.mistakes = 0;
      state.step = FIRST_GAME_STEP;
    },
  },
});

export const {incrementStep, checkUserAnswer, resetGame} = gameProcess.actions;
