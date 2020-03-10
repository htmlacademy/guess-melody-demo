import * as React from "react";
import {configure, shallow, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import GenreQuestionScreen from "./genre-question-screen";
import {GameType, QuestionGenre} from "../../types";
import {noop} from "../../utils";


configure({adapter: new Adapter()});

const question: QuestionGenre = {
  type: GameType.GENRE,
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
};

it(`When user answers genre question form is not sent`, () => {
  const onAnswer = jest.fn();
  const genreQuestion = shallow(<GenreQuestionScreen
    onAnswer={onAnswer}
    question={question}
    renderPlayer={() => null}
    onChange={noop}
    userAnswers={[false, false, false, false]}
  />);

  const form = genreQuestion.find(`form`);
  const formSendPrevention = jest.fn();
  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onAnswer).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});

it(`User answer passed to callback is consistent with "userAnswer" prop`, () => {
  const onAnswer = jest.fn((...args) => [...args]);
  const userAnswer = [false, true, false, false];

  const genreQuestion = mount(<GenreQuestionScreen
    onAnswer={onAnswer}
    question={question}
    renderPlayer={() => null}
    onChange={noop}
    userAnswers={userAnswer}
  />);

  const form = genreQuestion.find(`form`);
  const inputTwo = genreQuestion.find(`input`).at(1);

  inputTwo.simulate(`change`, {target: {checked: true}});
  form.simulate(`submit`, {preventDefault: noop});

  expect(onAnswer).toHaveBeenCalledTimes(1);

  expect(onAnswer.mock.calls[0][0]).toEqual(void 0);

  expect(
      genreQuestion.find(`input`).map((it) => it.prop(`checked`))
  ).toEqual(userAnswer);
});
