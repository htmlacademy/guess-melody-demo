import * as React from 'react';
import * as renderer from 'react-test-renderer';

import ArtistQuestionScreen from './artist-question-screen';
import {Type} from '../../types';

const mock = {
  question: {
    type: Type.ARTIST,
    song: {
      artist: `Jim Beam`,
      src: `path.mp3`,
    },
    answers: [
      {
        picture: `path.jpg`,
        artist: `John Snow`,
      },
      {
        picture: `path.jpg`,
        artist: `Jack Daniels`,
      },
      {
        picture: `path.jpg`,
        artist: `Jim Beam`,
      },
    ],
  },
};


it(`ArtistQuestionScreen is rendered correctly`, () => {
  const {question} = mock;
  const tree = renderer.create(<ArtistQuestionScreen
    onAnswer={jest.fn()}
    renderPlayer={jest.fn()}
    question={question}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
