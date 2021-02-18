import {Question, QuestionArtist, QuestionGenre, UserArtistQuestionAnswer, UserGenreQuestionAnswer, UserAnswer} from './types/question';
import {GameType} from './const';

export const isAnswerCorrect = (question: Question, answer: UserAnswer): boolean => {
  if (question.type === GameType.Artist && typeof answer === 'string') {
    return isArtistAnswerCorrect(question as QuestionArtist, answer);
  }

  if (question.type === GameType.Genre && Array.isArray(answer)) {
    return isGenreAnswerCorrect(question as QuestionGenre, answer);
  }

  throw new Error('Unknown question type');
};

export const isArtistAnswerCorrect = (question: QuestionArtist, userAnswer: UserArtistQuestionAnswer): boolean =>
  userAnswer === question.song.artist;

export const isGenreAnswerCorrect = (question: QuestionGenre, userAnswer: UserGenreQuestionAnswer): boolean =>
  userAnswer.every((answer, index) =>
    answer === (question.answers[index].genre === question.genre));
