import questions from "./mocks/questions";


const initialState = {
  step: -1,
  mistakes: 0,
  questions: [],
};


const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  LOAD_QUESTIONS: `LOAD_QUESTIONS`,
  RESET: `RESET`,
};

const isArtistAnswerCorrect = (userAnswer, question) =>
  userAnswer.artist === question.song.artist;


const isGenreAnswerCorrect = (userAnswer, question) =>
  userAnswer.every((it, i) => it === (
    question.answers[i].genre === question.genre
  ));


const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),

  incrementMistake: (userAnswer, question) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case `artist`:
        answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;
      case `genre`:
        answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
    }

    return {
      type: ActionType.INCREMENT_MISTAKES,
      payload: answerIsCorrect ? 0 : 1,
    };
  },

  loadQuestions: () => {
    return {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions,
    };
  },

  resetGame: () => {
    return {
      type: ActionType.RESET
    };
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return Object.assign({}, state, {
        step: state.step + action.payload,
      });

    case ActionType.INCREMENT_MISTAKES:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload,
      });

    case ActionType.LOAD_QUESTIONS:
      return Object.assign({}, state, {
        questions: action.payload,
      });

    case ActionType.RESET:
      return Object.assign({}, initialState);
  }

  return state;
};


export {
  ActionCreator,
  ActionType,
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  reducer,
};
