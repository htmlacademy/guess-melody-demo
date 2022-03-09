import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../const';

export const redirectToRoute = createAction<AppRoute>('game/redirectToRoute');
