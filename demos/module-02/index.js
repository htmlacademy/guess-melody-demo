import React from "react";
import ReactDOM from "react-dom";
import Albums from "./components/albums/00-albums.jsx";

const albums = [
  {title: `Runaway`, year: 1983, guitarCount: 2},
  {title: `Crush`, year: 2001},
  {title: `Slippery when wet`, year: 1988}
];

const band = `Bon Jovi`;
// const genre = `Rock`;
// const singer = `Jon Bon Jovi`;
// const albumsCount = 10;

ReactDOM.render(
    <Albums
      albums={albums}
      band={band}
      // genre={genre}
      // albumsCount={albumsCount}
      // singer={singer}
    />,
    document.querySelector(`#root`)
);
