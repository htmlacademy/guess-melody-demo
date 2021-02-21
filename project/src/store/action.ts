import {ActionType} from '../types/action';
import {Question, Questions, UserAnswer} from '../types/question';

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

export const loadQuestions = (questions: Questions) => ({
  type: ActionType.LoadQuestions,
  payload: {
    questions,
  },
} as const);
