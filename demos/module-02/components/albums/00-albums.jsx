/*
  00. Демонстрация компонента без PropTypes
*/

import React from "react";

/* eslint-disable react/prop-types */
const Albums = ({albums, band}) => (
  <React.Fragment>
    <h1>{band}</h1>
    <ul>
      {albums.map((album, index) => (
        // Будьте внимательны! Index элемента для key
        // применяется только для демонстрации.
        // В реальном приложении используйте идентификаторы.
        <li key={index}>{album.title}</li>
      ))}
    </ul>
  </React.Fragment>
);

export default Albums;
