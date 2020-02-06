/*
  01. Добавляем PropTypes для `albums` и `band`
*/

import React from "react";
import PropTypes from "prop-types";

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


// Подключаем PropTypes и описываем
// правила валидации.
Albums.propTypes = {
  // Только строки
  band: PropTypes.string.isRequired,

  // Массив из объектов определённой
  // структуры
  albums: PropTypes.arrayOf(
      // См. также exact
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired
      })
  ).isRequired,
};

export default Albums;
