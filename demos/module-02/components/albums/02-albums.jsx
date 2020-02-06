/*
  02. Больше валидаторов: genre и albums
*/
import React from "react";
import PropTypes from "prop-types";

const APPROVED_GENRES = [`Rock`, `Folk`, `Pop`];

const Albums = ({albums, band, genre, albumsCount}) => (
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
    <p>Количество альбомов: {albumsCount}</p>
  </React.Fragment>
);

Albums.propTypes = {
  band: PropTypes.string.isRequired,
  albums: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired
      })
  ).isRequired,

  // Дополнительные примеры валидации пропсов
  genre: PropTypes.oneOf(APPROVED_GENRES),
  albumsCount: PropTypes.number.isRequired,
};

export default Albums;
