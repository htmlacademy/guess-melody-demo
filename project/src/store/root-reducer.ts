import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {gameData} from './game-data/game-data';
import {gameProcess} from './game-process/game-process';
import {userProcess} from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.data]: gameData.reducer,
  [NameSpace.game]: gameProcess.reducer,
  [NameSpace.user]: userProcess.reducer,
});
