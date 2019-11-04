import React from 'react';
import renderer from 'react-test-renderer';

import AudioPlayer from './audio-player.jsx';

const mock = {
  song: {
    src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`
  }
};

it(`AudioPlayer is rendered correctly`, () => {
  const {song} = mock;
  const onPlayButtonClick = jest.fn();

  const tree = renderer.create(<AudioPlayer
    isPlaying={false}
    onPlayButtonClick={onPlayButtonClick}
    src={song.src}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
