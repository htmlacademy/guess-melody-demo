import {createReducer} from '@reduxjs/toolkit';
import {GameData} from '../../types/state';
import {loadQuestions} from '../action';

const initialState: GameData = {
  questions: [],
  isDataLoaded: false,
};

const gameData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadQuestions, (state, action) => {
      const {questions} = action.payload;

      state.questions = questions;
      state.isDataLoaded = true;
    });
});

export {gameData};
