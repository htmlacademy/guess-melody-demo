import {useSelector} from 'react-redux';

import {getMaxMistakes} from '../selectors';

export const useMaxMistakes = (): number => {
  return useSelector(getMaxMistakes);
};