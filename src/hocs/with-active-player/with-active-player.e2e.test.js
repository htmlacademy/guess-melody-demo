import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActivePlayer from "./with-active-player";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActivePlayer(MockComponent);

it(`Paused by default`, () => {
  const wrapper = mount(<MockComponentWrapped />);

  expect(wrapper.state().activePlayer).toEqual(-1);
});
