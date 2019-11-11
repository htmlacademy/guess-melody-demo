import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withUserAnswer from "./with-user-asnwer";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withUserAnswer(MockComponent);

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

it(`Should change activePlayer when call onPlayButtonClick`, () => {
  const wrapper = shallow(<MockComponentWrapped
    answers={mock.question.answers}
    onAnswer={jest.fn()}
  />);

  expect(wrapper.props().userAnswer).toEqual([false, false, false, false]);

  wrapper.props().onChange(0);
  expect(wrapper.props().userAnswer).toEqual([true, false, false, false]);

  wrapper.props().onChange(0);
  expect(wrapper.props().userAnswer).toEqual([false, false, false, false]);

  wrapper.props().onChange(1);
  expect(wrapper.props().userAnswer).toEqual([false, true, false, false]);
});
