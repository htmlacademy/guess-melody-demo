import {createAction} from '@reduxjs/toolkit';
import {Question, Questions, UserAnswer} from '../types/question';
import {AuthorizationStatus} from '../const';

export const incrementStep = createAction('game/incrementStep');

export const checkUserAnswer = createAction<{question: Question; userAnswer: UserAnswer}>('game/checkUserAnswer');

export const resetGame = createAction('game/reset');

export const loadQuestions = createAction<Questions>('data/loadQuestions');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
