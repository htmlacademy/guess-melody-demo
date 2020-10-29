import React from "react";
import renderer from "react-test-renderer";
import Albums from "./albums";

// Для тестов мы готовим отдельные моки.
// Не следует импортировать моки, которые
// применяются для приложения.
const albums = [
  {id: 11, title: `Night Songs`, year: 1986},
  {id: 22, title: `Long Cold Winter `, year: 1988},
  {id: 33, title: `Heartbreak Station`, year: 1990}
];
const band = `Cinderella`;
const genre = `Rock`;
const singer = `Carl Thomas Keifer`;

// Вы можете запустить все тесты или только определённый
// npm run test.jest -- -t "<Albums /> render"
describe(`<Albums /> render`, () => {
  it(`renders correctly with full of information`, () => {
    const tree = renderer
      .create(<Albums
        albums={albums}
        band={band}
        genre={genre}
        singer={singer}
        onFavotitesButtonClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders correctly without singer name`, () => {
    const tree = renderer
      .create(<Albums
        albums={albums}
        band={band}
        genre={genre}
        onFavotitesButtonClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

