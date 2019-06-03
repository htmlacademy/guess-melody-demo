import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import ArtistQuestionScreen from "./artist-question-screen";
import {Type} from "../../types";

configure({adapter: new Adapter()});

const mock = {
  question: {
    type: Type.ARTIST,
    song: {
      artist: ``,
      src: ``
    },
    answers: [
      {
        artist: `one`,
        picture: `pic-one`,
      },
      {
        artist: `two`,
        picture: `pic-two`,
      },
      {
        artist: `three`,
        picture: `pic-three`,
      },
    ],
  }
};


const mockEvent = {
  preventDefault() {}
};


it(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();

  const screen = shallow(<ArtistQuestionScreen
    onAnswer={onAnswer}
    renderPlayer={jest.fn()}
    question={question}
  />);

  const answerInputs = screen.find(`input`);
  const answerOne = answerInputs.at(0);
  const answerTwo = answerInputs.at(1);
  const answerThree = answerInputs.at(2);

  answerOne.simulate(`click`, mockEvent);
  answerTwo.simulate(`click`, mockEvent);
  answerThree.simulate(`click`, mockEvent);

  expect(onAnswer).toHaveBeenCalledTimes(3);

  expect(onAnswer).toHaveBeenNthCalledWith(1, {
    artist: `one`,
    picture: `pic-one`,
  });

  expect(onAnswer).toHaveBeenNthCalledWith(2, {
    artist: `two`,
    picture: `pic-two`,
  });

  expect(onAnswer).toHaveBeenNthCalledWith(3, {
    artist: `three`,
    picture: `pic-three`,
  });
});
