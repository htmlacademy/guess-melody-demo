import * as React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import Result from "./result";
import history from "../../../history";


describe(`Should WinScreen render correctly`, () => {
  describe(`With 3 questions`, () => {
    it(`With 0 mistake`, () => {
      const tree = renderer
        .create(
            <Router
              history={history}
            >
              <Result />
            </Router>
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`With 1 mistake`, () => {
      const tree = renderer
        .create(
            <Router
              history={history}
            >
              <Result />
            </Router>
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`With 2 questions`, () => {
    it(`With 0 mistake`, () => {
      const tree = renderer
        .create(
            <Router
              history={history}
            >
              <Result />
            </Router>
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`With 1 mistake`, () => {
      const tree = renderer
        .create(
            <Router
              history={history}
            >
              <Result />
            </Router>
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
