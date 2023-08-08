import { NameSpace } from '../../const';
import { getMistakeCount, getStep } from './selectors';

describe('GameProcess selectors', () => {
  const state = {
    [NameSpace.Game]: {
      mistakes: 3,
      step: 4,
    }
  };

  it('should return mistakes count from state', () => {
    const { mistakes } = state[NameSpace.Game];
    const result = getMistakeCount(state);
    expect(result).toBe(mistakes);
  });

  it('should return step number from state', () => {
    const { step } = state[NameSpace.Game];
    const result = getStep(state);
    expect(result).toBe(step);
  });
});
