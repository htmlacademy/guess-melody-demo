import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import WinScreen, {WinScreen as WinScreenWithoutStore} from "./win-screen";

const noop = () => {};

describe(`Should WinScreen render correctly`, () => {
  describe(`With 3 questions`, () => {
    it(`With 0 mistake`, () => {
      const tree = renderer
        .create(
            <WinScreenWithoutStore
              questionsCount={3}
              mistakesCount={0}
              onReplayButtonClick={noop}
              resetGameAction={noop}
            />

        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`With 1 mistake`, () => {
      const tree = renderer
        .create(
            <WinScreenWithoutStore
              questionsCount={3}
              mistakesCount={1}
              onReplayButtonClick={noop}
              resetGameAction={noop}
            />

        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`With 2 questions`, () => {
    it(`With 0 mistake`, () => {
      const tree = renderer
        .create(
            <WinScreenWithoutStore
              questionsCount={2}
              mistakesCount={0}
              onReplayButtonClick={noop}
              resetGameAction={noop}
            />
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`With 1 mistake`, () => {
      const tree = renderer
        .create(
            <WinScreenWithoutStore
              questionsCount={2}
              mistakesCount={1}
              onReplayButtonClick={noop}
              resetGameAction={noop}
            />
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

describe(`Render connected to store component`, () => {
  const mockStore = configureStore([]);
  let store = null;
  let winScreenComponent = null;

  beforeEach(() => {
    store = mockStore({
      GAME: {
        step: 33,
        mistakes: 2,
      }
    });

    store.dispatch = jest.fn();

    winScreenComponent = renderer.create(
        <Provider store={store}>
          <WinScreen
            onReplayButtonClick={noop}
            resetGameAction={noop}
          />
        </Provider>
    );
  });

  it(`Should WinScreen connected to store render correctly`, () => {
    expect(winScreenComponent.toJSON()).toMatchSnapshot();
  });

  it(`Should call dispatch when button click`, () => {
    renderer.act(() => {
      winScreenComponent.root.findByType(`button`).props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

});
