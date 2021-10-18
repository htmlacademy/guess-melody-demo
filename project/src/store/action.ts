import {ActionType} from '../types/action';
import {Question, UserAnswer} from '../types/question';

export const checkUserAnswer = (question: Question, userAnswer: UserAnswer) => ({
  type: ActionType.CheckUserAnswer,
  payload: {
    question,
    userAnswer,
  },
} as const);

export const incrementStep = () => ({
  type: ActionType.IncrementStep,
} as const);

export const resetGame = () => ({
  type: ActionType.ResetGame,
} as const);
