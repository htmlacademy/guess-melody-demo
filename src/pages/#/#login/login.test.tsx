import * as React from "react";
import renderer from "react-test-renderer";

import Login from "./login";


it(`AuthScreen component render correctly`, () => {
  const tree = renderer.create(
      <Login />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
