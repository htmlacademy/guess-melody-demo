import {isAnswerCorrect} from '../../game';
import {ActionType, Actions} from '../../types/action';
import {GameProcess} from '../../types/state';
import {FIRST_GAME_STEP} from '../../const';

const initialState: GameProcess = {
  mistakes: 0,
  step: FIRST_GAME_STEP,
};

const STEP_COUNT = 1;

const gameProcess = (state = initialState, action: Actions): GameProcess => {
  switch (action.type) {
    case ActionType.IncrementStep: {
      return {...state, step: state.step + STEP_COUNT};
    }
    case ActionType.CheckUserAnswer: {
      const {question, userAnswer} = action.payload;
      return {...state, mistakes: state.mistakes + Number(!isAnswerCorrect(question, userAnswer))};
    }
    case ActionType.ResetGame:
      return {
        ...state,
        mistakes: 0,
        step: FIRST_GAME_STEP,
      };
    default:
      return state;
  }
};

export {gameProcess};
