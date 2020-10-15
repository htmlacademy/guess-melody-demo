export const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET_GAME: `RESET_GAME`,
};

export const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  }),
  resetGame: () => ({
    type: ActionType.RESET_GAME,
  })
};
