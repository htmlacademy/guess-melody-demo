import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActivePlayer from "./with-active-player";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActivePlayer(MockComponent);

it(`Should change activePlayer when call onPlayButtonClick`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.props().activePlayer).toEqual(-1);

  wrapper.props().onPlayButtonClick(1);
  expect(wrapper.props().activePlayer).toEqual(1);

  wrapper.props().onPlayButtonClick(2);
  expect(wrapper.props().activePlayer).toEqual(2);

  wrapper.props().onPlayButtonClick(2);
  expect(wrapper.props().activePlayer).toEqual(-1);
});
