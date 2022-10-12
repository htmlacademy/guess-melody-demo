import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Questions} from '../../types/question';

export const getQuestions = (state: State): Questions => state[NameSpace.Data].questions;
export const getQuestionsDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isQuestionsDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Data].hasError;
