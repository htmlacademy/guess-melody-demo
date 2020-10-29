import React from "react";
import renderer from "react-test-renderer";
import GenreQuestionItem from "./genre-question-item";


const answer = {
  src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  genre: `rock`,
};

const noop = () => {};

it(`GenreQuestionItem is rendered correctly`, () => {
  const tree = renderer.create((
    <GenreQuestionItem
      answer={answer}
      id={0}
      onChange={noop}
      renderPlayer={noop}
      userAnswer={false}
    />
  )).toJSON();

  expect(tree).toMatchSnapshot();
});
