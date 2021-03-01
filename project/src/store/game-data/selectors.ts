import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Questions} from '../../types/question';

export const getQuestions = (state: State): Questions => state[NameSpace.data].questions;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.data].isDataLoaded;
