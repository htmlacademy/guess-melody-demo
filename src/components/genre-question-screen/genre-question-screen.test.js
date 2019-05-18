import React from 'react';
import renderer from 'react-test-renderer';

import GenreQuestionScreen from './genre-question-screen.jsx';

const mock = {
  question: {
    type: `genre`,
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
    activePlayer={-1}
    onAnswer={jest.fn()}
    onChange={jest.fn()}
    onPlayButtonClick={jest.fn()}
    renderPlayer={jest.fn()}
    question={question}
    userAnswer={[false, false, false, false]}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
