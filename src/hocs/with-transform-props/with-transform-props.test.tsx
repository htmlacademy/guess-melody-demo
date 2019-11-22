import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withActivePlayer from "./with-transform-props";

configure({adapter: new Adapter()});

const MockComponent = () => <div />;
const transformFunc = (oldProps) => {
  return {
    fooz: oldProps.foo,
    baz: oldProps.bar,
  };
};
const MockComponentWrapped = withActivePlayer(transformFunc)(MockComponent);

it(`Should change `, () => {
  const wrapper = shallow(<MockComponentWrapped
    foo={`foo`}
    bar={`bar`}
  />);

  expect(wrapper.props().foo).toEqual(undefined);
  expect(wrapper.props().bar).toEqual(undefined);

  expect(wrapper.props().fooz).toEqual(`foo`);
  expect(wrapper.props().baz).toEqual(`bar`);
});
