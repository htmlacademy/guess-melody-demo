import * as React from 'react';
import {Switch, Route, Router} from 'react-router-dom';

import PrivateRoute from 'components/private-route/private-route';

import LoginScreen from './#login/login';
import LoseScreen from './#lose/lose';
import ResultScreen from './#result/result';
import RootScreen from './#/root';

import history from '../../history';
import {AppRoute} from '../../const';

const App: React.FC = (): JSX.Element => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <RootScreen />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <LoginScreen />
        </Route>
        <Route exact path={AppRoute.LOSE}>
          <LoseScreen />
        </Route>
        <PrivateRoute exact path={AppRoute.RESULT}>
          <ResultScreen />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};


export {App};
export default App;
