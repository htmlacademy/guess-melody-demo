import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withUserAnswer from "./with-user-answer";
import {GameType, QuestionGenre} from "../../types";
import {noop} from "../../utils";


configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withUserAnswer(MockComponent);

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

it(`Should change answers`, () => {
  const wrapper = shallow(<MockComponentWrapped
    question={question}
    onAnswer={noop}
  />);

  expect(wrapper.props().userAnswers).toEqual([false, false, false, false]);

  wrapper.props().onChange(0, true);
  expect(wrapper.props().userAnswers).toEqual([true, false, false, false]);

  wrapper.props().onChange(0, false);
  expect(wrapper.props().userAnswers).toEqual([false, false, false, false]);

  wrapper.props().onChange(1, true);
  expect(wrapper.props().userAnswers).toEqual([false, true, false, false]);
});
