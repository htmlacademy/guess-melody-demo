import {useSelector} from 'react-redux';

import {getStep} from '../selectors';

export const useStep = (): number => {
  return useSelector(getStep);
};