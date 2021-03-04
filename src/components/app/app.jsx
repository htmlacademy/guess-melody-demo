import React from 'react';
import {Switch, Route} from 'react-router-dom';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import AuthScreen from '../auth-screen/auth-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import WinScreen from '../win-screen/win-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import GameScreen from '../game-screen/game-screen';
import PrivateRoute from '../private-route/private-route';
import {MAX_MISTAKE_COUNT, AppRoute} from '../../const';

const App = () => {
  return (
    <Switch>
      <Route exact path={AppRoute.ROOT}>
        <WelcomeScreen
          errorsCount={MAX_MISTAKE_COUNT}
        />
      </Route>
      <Route exact path={AppRoute.LOGIN}>
        <AuthScreen />
      </Route>
      <PrivateRoute
        exact
        path={AppRoute.RESULT}
        render={({history}) => {
          return (
            <WinScreen
              onReplayButtonClick={() => history.push(AppRoute.GAME)}
            />
          );
        }}
      />
      <Route exact
        path={AppRoute.LOSE}
        render={({history}) => (
          <GameOverScreen
            onReplayButtonClick={() => history.push(AppRoute.GAME)}
          />
        )}
      />
      <Route exact path={AppRoute.GAME}>
        <GameScreen />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
};

App.propTypes = {};

export default App;
