import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {ActionCreator} from '../game';

export const useResetGame = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(ActionCreator.resetGame());
  }, [dispatch]);
};