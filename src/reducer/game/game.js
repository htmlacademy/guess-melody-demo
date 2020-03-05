import {extend} from "../../utils.js";
import {GameType} from "../../const.js";


const initialState = {
  mistakes: 0,
  maxMistakes: 3,
  step: -1,
};

const ActionType = {
  GO_TO_WELCOME: `GO_TO_WELCOME`,
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET: `RESET`,
};

const isArtistAnswerCorrect = (question, userAnswer) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((it, i) => {
    return it === (question.answers[i].genre === question.genre);
  });
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),

  incrementMistake: (question, userAnswer) => {
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
      type: ActionType.INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1,
    };
  },

  resetGame: () => {
    return {
      type: ActionType.RESET,
      payload: null,
    };
  },

  goToWelcome: () => {
    return {
      type: ActionType.GO_TO_WELCOME,
      payload: null,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + action.payload,
      });

    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });

    case ActionType.RESET:
      return extend(initialState, {
        step: 0,
      });

    case ActionType.GO_TO_WELCOME:
      return extend(initialState, {
        step: -1,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
