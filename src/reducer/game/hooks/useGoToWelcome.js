import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {ActionCreator} from '../game';

export const useGoToWelcome = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.goToWelcome());
  }, [dispatch]);
};