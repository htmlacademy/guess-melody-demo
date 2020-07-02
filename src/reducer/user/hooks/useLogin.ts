import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {Operation} from '../user';

export const useLogin = () => {
  const dispatch = useDispatch();

  return useCallback((authData) => {
    dispatch(Operation.login(authData));
  }, [dispatch]);
};