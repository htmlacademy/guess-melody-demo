import {createAction} from '@reduxjs/toolkit';
import {isArtistAnswerCorrect, isGenreAnswerCorrect} from '../game';
import {GameType} from '../const';

export const ActionType = {
  INCREMENT_MISTAKES: `game/incrementMistake`,
  INCREMENT_STEP: `game/incrementStep`,
  RESET_GAME: `game/reset`,
  REDIRECT_TO_ROUTE: `game/redirectToRoute`,
  LOAD_QUESTIONS: `data/loadQuestions`,
  REQUIRED_AUTHORIZATION: `user/requiredAuthorization`,
};

export const incrementStep = createAction(ActionType.INCREMENT_STEP, () => {
  return {
    payload: 1,
  };
});

export const resetGame = createAction(ActionType.RESET_GAME);

export const incrementMistake = createAction(ActionType.INCREMENT_MISTAKES, (question, userAnswer) => {
  let answerIsCorrect = false;
  switch (question.type) {
    case GameType.ARTIST:
      answerIsCorrect = isArtistAnswerCorrect(question, userAnswer);
      break;
    case GameType.GENRE:
      answerIsCorrect = isGenreAnswerCorrect(question, userAnswer);
      break;
  }

  return {
    payload: answerIsCorrect ? 0 : 1,
  };
});

export const loadQuestions = createAction(ActionType.LOAD_QUESTIONS, (questions) => {
  return {
    payload: questions
  };
});

export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => {
  return {
    payload: status,
  };
});

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => {
  return {
    payload: url,
  };
});
