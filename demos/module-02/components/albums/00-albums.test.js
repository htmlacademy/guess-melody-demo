import React from "react";
import renderer from "react-test-renderer";
import Albums from "./00-albums.jsx";

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
// npm run test.jest -- -t '<Albums /> should render Cinderella'
it(`<Albums /> should render Cinderella`, () => {
  const tree = renderer
    .create(<Albums
      albums={albums}
      band={band}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
