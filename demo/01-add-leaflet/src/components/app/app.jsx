import React from 'react';
import Map from '../map/map';
import {city, points} from '../../const';

const App = () => {
  return (
    <Map
      city={city}
      points={points}
    />
  );
};

export default App;
