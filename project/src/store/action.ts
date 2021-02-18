import {
  ActionType,
  CheckUserAnswerAction,
  IncrementStepAction,
  ResetGameAction
} from '../types/action';
import {Question, UserAnswer} from '../types/question';

export const checkUserAnswer = (question: Question, userAnswer: UserAnswer): CheckUserAnswerAction => ({
  type: ActionType.CheckUserAnswer,
  payload: {
    question,
    userAnswer,
  },
});

export const incrementStep = (): IncrementStepAction => ({
  type: ActionType.IncrementStep,
});

export const resetGame = (): ResetGameAction => ({
  type: ActionType.ResetGame,
});
