import {ActionType, Actions} from '../../types/action';
import {GameData} from '../../types/state';

const initialState: GameData = {
  questions: [],
  isDataLoaded: false,
};

const gameData = (state = initialState, action: Actions): GameData => {
  switch (action.type) {
    case ActionType.LoadQuestions: {
      const {questions} = action.payload;
      return {
        ...state,
        questions,
        isDataLoaded: true,
      };
    }
    default:
      return state;
  }
};

export {gameData};
