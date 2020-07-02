import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {ActionCreator} from '../game';

export const useUserAnswer = () => {
  const dispatch = useDispatch();

  return useCallback((question, answer) => {
    dispatch(ActionCreator.incrementMistake(question, answer));
    dispatch(ActionCreator.incrementStep());
  }, [dispatch]);
};