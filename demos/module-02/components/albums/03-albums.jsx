/*
  03. Значения для пропс по умолчанию
*/
import React from "react";
import PropTypes from "prop-types";

const APPROVED_GENRES = [`Rock`, `Folk`, `Pop`];

const Albums = ({albums, band, genre, albumsCount, singer}) => (
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
    <p>Группа играет в жанре: {genre}</p>
    <p>Вокалист группы: {singer}</p>
    <p>Количество альбомов: {albumsCount}</p>
  </React.Fragment>
);

// Мы можем указать значение по умолчанию для
// пропсов.
Albums.defaultProps = {
  singer: `Unknown`,
};

Albums.propTypes = {
  band: PropTypes.string.isRequired,
  albums: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired
      })
  ).isRequired,
  genre: PropTypes.oneOf(APPROVED_GENRES),
  albumsCount: PropTypes.number.isRequired,

  // Обратите внимание, для этого пропса мы указываем значение
  // по умолчанию, см. defaultProps
  singer: PropTypes.string.isRequired,
};

export default Albums;
