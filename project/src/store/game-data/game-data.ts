import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {GameData} from '../../types/state';

const initialState: GameData = {
  questions: [],
  isDataLoaded:false,
};

export const gameData = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadQuestions: (state, action) => {
      state.questions = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const {loadQuestions} = gameData.actions;
