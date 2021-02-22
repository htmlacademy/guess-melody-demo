import {isAnswerCorrect} from '../game';
import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
import {FIRST_GAME_STEP, AuthorizationStatus} from '../const';

const initialState = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
  questions: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const STEP_COUNT = 1;

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.IncrementStep:
      return {...state, step: state.step + STEP_COUNT};
    case ActionType.CheckUserAnswer: {
      const {question, userAnswer} = action.payload;
      return {...state, mistakes: state.mistakes += Number(!isAnswerCorrect(question, userAnswer))};
    }
    case ActionType.ResetGame:
      return {
        ...state,
        mistakes: 0,
        step: FIRST_GAME_STEP,

      };
    case ActionType.LoadQuestions: {
      const {questions} = action.payload;
      return {...state, questions};
    }
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
        isDataLoaded: true,
      };
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};

export {reducer};
