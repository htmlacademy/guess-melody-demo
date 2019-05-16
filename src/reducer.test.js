import {reducer} from "./reducer";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    step: -1,
    mistakes: 0,
  });
});

it(`Reducer should increment current step by a given value`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: `INCREMENT_STEP`,
    payload: 1,
  })).toEqual({
    step: 0,
    mistakes: 0,
  });

  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: `INCREMENT_STEP`,
    payload: 0,
  })).toEqual({
    step: -1,
    mistakes: 0,
  });
});

it(`Reducer should increment number of mistakes by a given value`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: `INCREMENT_MISTAKES`,
    payload: 1,
  })).toEqual({
    step: -1,
    mistakes: 1,
  });

  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: `INCREMENT_MISTAKES`,
    payload: 0,
  })).toEqual({
    step: -1,
    mistakes: 0,
  });
});
