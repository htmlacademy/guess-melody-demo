import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import WinScreen from "./win-screen.jsx";
import history from "../../history.js";


describe(`Should WinScreen render correctly`, () => {
  describe(`With 3 questions`, () => {
    it(`With 0 mistake`, () => {
      const tree = renderer
        .create(
            <Router
              history={history}
            >
              <WinScreen
                questionsCount={3}
                mistakesCount={0}
                onReplayButtonClick={() => {}}
              />
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
              <WinScreen
                questionsCount={3}
                mistakesCount={1}
                onReplayButtonClick={() => {}}
              />
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
              <WinScreen
                questionsCount={2}
                mistakesCount={0}
                onReplayButtonClick={() => {}}
              />
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
              <WinScreen
                questionsCount={2}
                mistakesCount={1}
                onReplayButtonClick={() => {}}
              />
            </Router>
        )
        .toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
