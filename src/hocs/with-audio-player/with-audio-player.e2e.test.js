import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActivePlayer from "./with-audio-player";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActivePlayer(MockComponent);

it(`Should activePlayerId eq 0`, () => {
  const wrapper = shallow(<MockComponentWrapped />);
  expect(wrapper.state().activePlayerId).toEqual(0);
});
