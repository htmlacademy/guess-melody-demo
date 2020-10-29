import React from "react";
import renderer from "react-test-renderer";
import {GameScreen} from "./game-screen";
import {MAX_MISTAKE_COUNT} from "../../const";

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `blues`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `jazz`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }],
  }, {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [{
      picture: `https://api.adorable.io/avatars/128/1`,
      artist: `John Snow`,
    }, {
      picture: `https://api.adorable.io/avatars/128/2`,
      artist: `Jack Daniels`,
    }, {
      picture: `https://api.adorable.io/avatars/128/3`,
      artist: `Jim Beam`,
    }],
  },
];

describe(`Render GameScreen`, () => {
  it(`Render GenreQuestionScreen`, () => {
    const tree = renderer
      .create(
          <GameScreen
            errorCount={MAX_MISTAKE_COUNT}
            step={0}
            mistakes={0}
            questions={questions}
            onUserAnswer={() => {}}
            resetGameAction={() => {}}
          />
          , {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render ArtistQuestionScreen`, () => {
    const tree = renderer
      .create(
          <GameScreen
            errorCount={MAX_MISTAKE_COUNT}
            step={1}
            mistakes={0}
            questions={questions}
            onUserAnswer={() => {}}
            resetGameAction={() => {}}
          />
          , {
            createNodeMock: () => {
              return {};
            }
          }
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
