export enum ActionType {
  IncrementMistake = 'game/incrementMistake',
  IncrementStep = 'game/incrementStep',
}

export type IncrementMistakeAction = {
  type: ActionType.IncrementMistake;
  payload: number;
};

export type IncrementStepAction = {
  type: ActionType.IncrementStep;
};

export type Actions = IncrementMistakeAction | IncrementStepAction;
