import React from "react";
import PropTypes from "prop-types";

const APPROVED_GENRES = [`Rock`, `Folk`, `Pop`];

const Albums = ({albums, band, genre, singer, onFavotitesButtonClick}) => (
  <React.Fragment>
    <h1>{band}</h1>
    <button type="button" onClick={onFavotitesButtonClick}>
      Add to favorites
    </button>
    <ul>
      {albums.map((album) => (
        <li key={album.id}>{album.title}</li>
      ))}
    </ul>
    <p>Группа играет в жанре: {genre}</p>
    <p>Вокалист группы: {singer}</p>
    <p>Количество альбомов: {albums.length}</p>
  </React.Fragment>
);

Albums.defaultProps = {
  singer: `Unknown`
};

Albums.propTypes = {
  albums: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired
      })
  ).isRequired,
  band: PropTypes.string.isRequired,
  genre: PropTypes.oneOf(APPROVED_GENRES),
  singer: PropTypes.string.isRequired,
  onFavotitesButtonClick: PropTypes.func.isRequired
};

export default Albums;
