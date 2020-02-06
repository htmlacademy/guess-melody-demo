/*
  00. Демонстрация компонента без PropTypes
*/

import React from "react";
import PropTypes from "prop-types";

/* eslint-disable react/prop-types */
const AnotherAlbums = ({albums, band}) => {
  if (albums.length === 0) {
    return null;
  }

  return <React.Fragment>
    <h1>{band}</h1>
    <ul>
      {albums.map((album, index) => (
        // Будьте внимательны! Index элемента для key
        // применяется только для демонстрации.
        // В реальном приложении используйте идентификаторы.
        <li key={index}>{album.title}</li>
      ))}
    </ul>
  </React.Fragment>;
};

AnotherAlbums.propTypes = {
  band: PropTypes.string.isRequired,
  albums: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired
      })
  ).isRequired,
};

export default AnotherAlbums;
