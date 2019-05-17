import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import GenreQuestionScreen from "./genre-question-screen.jsx";

configure({adapter: new Adapter()});

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `blues`,
      },
    ],
  },
};

it(`When user answers genre question form is not sent`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const genreQuestion = shallow(<GenreQuestionScreen
    activePlayer={-1}
    onAnswer={onAnswer}
    onPlayButtonClick={jest.fn()}
    question={question}
  />);

  const form = genreQuestion.find(`form`);
  const formSendPrevention = jest.fn();
  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});

it(`Rendered checkboxes are synchronized with state`, () => {
  const {question} = mock;
  const genreQuestion = shallow(<GenreQuestionScreen
    activePlayer={-1}
    onAnswer={jest.fn()}
    onPlayButtonClick={jest.fn()}
    question={question}
  />);

  expect(genreQuestion.state(`userAnswer`)).toEqual([false, false, false, false]);

  const inputs = genreQuestion.find(`input`);
  const inputOne = inputs.at(0);
  const inputTwo = inputs.at(1);

  inputOne.simulate(`change`);
  expect(genreQuestion.state(`userAnswer`)).toEqual([true, false, false, false]);

  inputOne.simulate(`change`);
  expect(genreQuestion.state(`userAnswer`)).toEqual([false, false, false, false]);

  inputTwo.simulate(`change`);
  expect(genreQuestion.state(`userAnswer`)).toEqual([false, true, false, false]);
});

it(`User answer passed to callback is consistent with internal component state`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const genreQuestion = shallow(<GenreQuestionScreen
    activePlayer={-1}
    onAnswer={onAnswer}
    onPlayButtonClick={jest.fn()}
    question={question}
  />);

  const form = genreQuestion.find(`form`);
  const inputTwo = genreQuestion.find(`input`).at(1);
  inputTwo.simulate(`change`);
  form.simulate(`submit`, {preventDefault() {}});

  expect(genreQuestion.state(`userAnswer`)).toEqual([false, true, false, false]);
  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(onAnswer).toHaveBeenNthCalledWith(1, [false, true, false, false]);
});
