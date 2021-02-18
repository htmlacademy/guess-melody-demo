import {Question, UserAnswer} from './question';

export enum ActionType {
  CheckUserAnswer = 'game/checkUserAnswer',
  IncrementStep = 'game/incrementStep',
  ResetGame = 'game/reset',
}

export type CheckUserAnswerAction = {
  type: ActionType.CheckUserAnswer;
  payload: {
    question: Question;
    userAnswer: UserAnswer;
  };
};

export type IncrementStepAction = {
  type: ActionType.IncrementStep;
};

export type ResetGameAction = {
  type: ActionType.ResetGame;
};

export type Actions = CheckUserAnswerAction | IncrementStepAction | ResetGameAction;
