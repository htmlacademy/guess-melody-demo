import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withActivePlayer from "./with-active-player";
configure({adapter: new Adapter()});

const MockComponent = (props) => {
  console.log(`render:mock-component`, {props});
  return <div />;
};

const MockComponentWrapped = withActivePlayer(MockComponent);

it(`Should change activePlayer when call onPlayButtonClick`, () => {
  const wrapper = shallow(<MockComponentWrapped
    activePlayer={1}
  />);

  const render = wrapper.dive();
  console.error({rr: render.debug()});

  wrapper.props().onPlayButtonClick(11);

  expect(wrapper.props().activePlayer).toEqual(11);
});
