import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withActivePlayer from "./with-active-player";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const MockComponentWrapped = withActivePlayer(MockComponent);

it.skip(`Should `, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.state().activePlayer).toEqual(-1);
});
