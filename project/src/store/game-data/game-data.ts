import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {GameData} from '../../types/state';
import {fetchQuestionAction} from '../api-actions';

const initialState: GameData = {
  questions: [],
  isDataLoaded:false,
};

export const gameData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestionAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchQuestionAction.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.isDataLoaded = false;
      });
  }
});
