import * as React from "react";
import * as renderer from "react-test-renderer";
import GenreQuestionItem from "./genre-question-item";
import {noop} from "../../utils";


const answer = {
  src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  genre: `rock`,
};

it(`GenreQuestionItem is rendered correctly`, () => {
  const tree = renderer.create((
    <GenreQuestionItem
      answer={answer}
      id={0}
      onChange={noop}
      renderPlayer={() => null}
      userAnswer={false}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
