import React from "react";
import renderer from "react-test-renderer";
import WelcomeScreen from "./welcome-screen";

it(`Should WelcomeScreen render correctly`, () => {
  const tree = renderer
    .create(<WelcomeScreen
      errorsCount={3}
      onPlayButtonClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
