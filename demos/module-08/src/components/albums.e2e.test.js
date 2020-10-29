import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Albums from "./albums";

configure({adapter: new Adapter()});

const albums = [
  {id: 11, title: `Night Songs`, year: 1986},
  {id: 22, title: `Long Cold Winter `, year: 1988},
  {id: 33, title: `Heartbreak Station`, year: 1990}
];
const band = `Cinderella`;
const genre = `Rock`;
const singer = `Carl Thomas Keifer`;

test(`click on "Add to favorites" button`, () => {
  const onFavotitesButtonClick = jest.fn();
  const wrapper = shallow(
      <Albums
        albums={albums}
        band={band}
        genre={genre}
        singer={singer}
        onFavotitesButtonClick={onFavotitesButtonClick}
      />
  );

  wrapper.find(`button`).simulate(`click`);
  expect(onFavotitesButtonClick).toHaveBeenCalledTimes(1);
});

