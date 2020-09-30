import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import WelcomeScreen from "../welcome-screen/welcome-screen";
import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen";
import AuthScreen from "../auth-screen/auth-screen";
import GameOverScreen from "../game-over-screen/game-over-screen";
import WinScreen from "../win-screen/win-screen";


const App = (props) => {
  const {errorsCount} = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <WelcomeScreen errorsCount={errorsCount} />
        </Route>
        <Route exact path="/dev-artist">
          <ArtistQuestionScreen />
        </Route>
        <Route exact path="/dev-genre">
          <GenreQuestionScreen />
        </Route>
        <Route exact path="/login">
          <AuthScreen />
        </Route>
        <Route exact path="/result">
          <WinScreen />
        </Route>
        <Route exact path="/lose">
          <GameOverScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
};

export default App;
