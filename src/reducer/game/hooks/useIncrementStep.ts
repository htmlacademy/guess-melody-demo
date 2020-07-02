import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {ActionCreator} from '../game';

export const useIncrementStep = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.incrementStep());
  }, [dispatch]);
};