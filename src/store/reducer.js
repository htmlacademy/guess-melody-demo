import {extend} from "../utils";
import {ActionType} from "./action";
import questions from "../mocks/questions";
import {MAX_MISTAKE_COUNT} from "../const";

const initialState = {
  mistakes: 0,
  step: 0,
  questions,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      let nextStep = state.step + action.payload;

      return extend(state, {
        step: nextStep,
      });

    case ActionType.INCREMENT_MISTAKES:
      const mistakes = state.mistakes + action.payload;

      if (mistakes >= MAX_MISTAKE_COUNT) {
        return extend({}, initialState);
      }

      return extend(state, {
        mistakes: state.mistakes + action.payload,
      });

    case ActionType.RESET_GAME:
      return extend({}, initialState);
  }

  return state;
};


export {reducer};
