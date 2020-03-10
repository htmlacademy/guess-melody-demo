import * as React from "react";
import * as renderer from "react-test-renderer";
import withAudio from "./with-audio";
import {noop} from "../../utils";


interface MockComponentProps {
  children: React.ReactNode;
}

const MockComponent = (props: MockComponentProps) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

const MockComponentWrapped = withAudio(MockComponent);

it(`withAudio is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      isPlaying={false}
      onPlayButtonClick={noop}
      src={``}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
