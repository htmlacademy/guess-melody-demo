import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {GameData} from '../../types/state';
import {fetchQuestionAction} from '../api-actions';

const initialState: GameData = {
  questions: [],
  isQuestionsDataLoading: false,
  hasError: false,
};

export const gameData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestionAction.pending, (state) => {
        state.isQuestionsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchQuestionAction.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.isQuestionsDataLoading = false;
      })
      .addCase(fetchQuestionAction.rejected, (state) => {
        state.isQuestionsDataLoading = false;
        state.hasError = true;
      });
  }
});
