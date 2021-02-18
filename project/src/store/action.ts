import {ActionType, IncrementMistakeAction, IncrementStepAction} from '../types/action';

export const incrementMistake = (count: number): IncrementMistakeAction => ({
  type: ActionType.IncrementMistake,
  payload: count,
});

export const incrementStep = (): IncrementStepAction => ({
  type: ActionType.IncrementStep,
});
