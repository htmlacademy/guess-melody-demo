import React from "react";
import ReactDOM from "react-dom";
import Albums from "./components/albums";

const albums = [
  {id: 0, title: `Runaway`, year: 1983, guitarCount: 2},
  {id: 1, title: `Crush`, year: 2001},
  {id: 2, title: `Slippery when wet`, year: 1988}
];

const band = `Bon Jovi`;
const genre = `Rock`;
const singer = `Jon Bon Jovi`;

ReactDOM.render(
    <Albums
      albums={albums}
      band={band}
      genre={genre}
      singer={singer}
      onFavotitesButtonClick={() => {
        alert(`Added to favirites`) // eslint-disable-line
      }}
    />,
    document.querySelector(`#root`)
);
