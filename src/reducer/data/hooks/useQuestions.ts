import {useSelector} from 'react-redux';

import {getQuestions} from '../selectors';
import { QuestionArtist, QuestionGenre } from '../../../types';

type Question = QuestionArtist | QuestionGenre;

export const useQuestions = (): Array<Question> => {
  return useSelector(getQuestions);
};