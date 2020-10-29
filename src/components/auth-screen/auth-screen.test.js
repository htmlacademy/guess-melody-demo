import React from "react";
import renderer from "react-test-renderer";
import {AuthScreen} from "./auth-screen";

const noop = () => {};

it(`AuthScreen component render correctly`, () => {
  const tree = renderer.create(
      <AuthScreen
        onReplayButtonClick={noop}
        onSubmit={noop}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
