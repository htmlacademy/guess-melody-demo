import React from "react";
import renderer from "react-test-renderer";
import AnotherAlbums from "./another-albums.jsx";

// Для тестов мы готовим отдельные моки.
// Не следует импортировать моки, которые
// применяются для приложения.
const albums = [
  {title: `Night Songs`, year: 1986},
  {title: `Long Cold Winter `, year: 1988},
  {title: `Heartbreak Station`, year: 1990}
];

const band = `Cinderella`;

// Вы можете запустить все тесты или только определённый
// npm run test.jest -- -t '<AnotherAlbums /> should render Cinderella'
describe(`Render another albums`, () => {

  it(`<AnotherAlbums /> should render Cinderella`, () => {
    const tree = renderer
      .create(<AnotherAlbums
        albums={albums}
        band={band}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`<AnotherAlbums /> should render null`, () => {
    const tree = renderer
    .create(<AnotherAlbums
      albums={[]}
      band={``}
    />)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
