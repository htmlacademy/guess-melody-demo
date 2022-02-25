import {createAction} from '@reduxjs/toolkit';

export const incrementStep = createAction('game/incrementStep');

export const resetGame = createAction('game/reset');
