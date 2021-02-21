import {isAnswerCorrect} from '../game';
import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
import {questions} from '../mocks/questions';
import {FIRST_GAME_STEP} from '../const';

const initialState = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
  questions,
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
      return {...initialState};
    case ActionType.LoadQuestions:
      return {...state, questions};
    default:
      return state;
  }
};

export {reducer};
