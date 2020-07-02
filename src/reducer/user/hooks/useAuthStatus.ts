import {useSelector} from 'react-redux';

import {getAuthorizationStatus} from '../selectors';

export const useAuthStatus = (): string => {
  return useSelector(getAuthorizationStatus);
};