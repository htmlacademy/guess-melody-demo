import * as React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import Lose from "./lose";
import history from "../../../history";


it(`Should GameOverScreen render correctly`, () => {
  const tree = renderer
    .create(
        <Router
          history={history}
        >
          <Lose />
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
