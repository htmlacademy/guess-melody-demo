import {useSelector} from 'react-redux';

import {getMistakes} from '../selectors';

export const useMistakes = (): number => {
  return useSelector(getMistakes);
};