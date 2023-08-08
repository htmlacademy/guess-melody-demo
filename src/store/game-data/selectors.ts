import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Questions} from '../../types/question';

export const getQuestions = (state: Pick<State, NameSpace.Data>): Questions => state[NameSpace.Data].questions;
export const getQuestionsDataLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isQuestionsDataLoading;
export const getErrorStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].hasError;
