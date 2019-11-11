import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import GenreQuestionScreen from "./genre-question-screen.jsx";
import withUserAnswer from "../../hocs/with-user-answer/with-user-asnwer";

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
    onChange={jest.fn()}
    onPlayButtonClick={jest.fn()}
    renderAnswer={jest.fn()}
    question={question}
    userAnswer={[]}
  />);

  const form = genreQuestion.find(`form`);
  const formSendPrevention = jest.fn();
  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});

it(`Rendered checkboxes are synchronized with prop "userAnswer"`, () => {
  const GenreQuestionScreenWrapped = withUserAnswer(GenreQuestionScreen);

  const {question} = mock;
  const genreQuestion = shallow(<GenreQuestionScreenWrapped
    activePlayer={-1}
    answers={question.answers}
    onAnswer={jest.fn()}
    onPlayButtonClick={jest.fn()}
    renderAnswer={jest.fn()}
    question={question}
  />);

  const render = genreQuestion.dive();
  const inputs = render.find(`input`);
  const inputOne = inputs.at(0);
  const inputTwo = inputs.at(1);

  inputOne.simulate(`change`);
  expect(genreQuestion.prop(`userAnswer`)).toEqual([true, false, false, false]);

  inputOne.simulate(`change`);
  expect(genreQuestion.prop(`userAnswer`)).toEqual([false, false, false, false]);

  inputTwo.simulate(`change`);
  expect(genreQuestion.prop(`userAnswer`)).toEqual([false, true, false, false]);
});

it(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();
  const userAnswer = [false, true, false, false];
  const genreQuestion = shallow(<GenreQuestionScreen
    activePlayer={-1}
    onAnswer={onAnswer}
    onChange={jest.fn()}
    onPlayButtonClick={jest.fn()}
    renderAnswer={jest.fn()}
    question={question}
    userAnswer={userAnswer}
  />);

  const form = genreQuestion.find(`form`);
  const inputTwo = genreQuestion.find(`input`).at(1);
  inputTwo.simulate(`change`);
  form.simulate(`submit`, {preventDefault() {}});

  expect(genreQuestion.find(`input`).map((it) => it.prop(`checked`)))
    .toEqual(userAnswer);
  expect(onAnswer).toHaveBeenCalledTimes(1);
});
