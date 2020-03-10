import * as React from "react";
import * as renderer from "react-test-renderer";
import AuthScreen from "./auth-screen";
import {noop} from "../../utils";


it(`AuthScreen component render correctly`, () => {
  const tree = renderer.create(
      <AuthScreen
        onReplayButtonClick={noop}
        onSubmit={noop}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
