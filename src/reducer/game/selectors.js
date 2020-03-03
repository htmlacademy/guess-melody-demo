import NameSpace from "../name-space.js";


const NAME_SPACE = NameSpace.GAME;

export const getStep = (state) => {
  return state[NAME_SPACE].step;
};

export const getMistakes = (state) => {
  return state[NAME_SPACE].mistakes;
};

export const getMaxMistakes = (state) => {
  return state[NAME_SPACE].maxMistakes;
};
