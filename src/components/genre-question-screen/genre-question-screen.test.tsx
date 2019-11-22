import * as React from 'react';
import * as renderer from 'react-test-renderer';

import GenreQuestionScreen from './genre-question-screen';
import {Type} from '../../types';

const mock = {
  question: {
    type: Type.GENRE,
    genre: `rock`,
    answers: [
      {
        src: `test.mp3`,
        genre: `rock`,
      },
      {
        src: `test.mp3`,
        genre: `blues`,
      },
      {
        src: `test.mp3`,
        genre: `jazz`,
      },
      {
        src: `test.mp3`,
        genre: `rock`,
      },
    ],
  },
};


it(`GenreQuestionScreen is rendered correctly`, () => {
  const {question} = mock;
  const tree = renderer.create(<GenreQuestionScreen
    onAnswer={jest.fn()}
    onChange={jest.fn()}
    renderAnswer={jest.fn()}
    question={question}
    userAnswer={[false, false, false, false]}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
