import React from "react";
import renderer from "react-test-renderer";
import Mistakes from "./mistakes.jsx";

describe(`Should Mistakes render correctly`, () => {
  it(`With one zero count`, () => {
    const tree = renderer
      .create(<Mistakes
        count={0}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With one one count`, () => {
    const tree = renderer
      .create(<Mistakes
        count={1}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
