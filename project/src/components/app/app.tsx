import {connect, ConnectedProps} from 'react-redux';
import {Switch, Route} from 'react-router-dom';
import {AppRoute, MAX_MISTAKE_COUNT} from '../../const';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import AuthScreen from '../auth-screen/auth-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import WinScreen from '../win-screen/win-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import GameScreen from '../game-screen/game-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import {isCheckedAuth} from '../../game';
import {State} from '../../types/state';

const mapStateToProps = ({USER, DATA}: State) => ({
  authorizationStatus: USER.authorizationStatus,
  isDataLoaded: DATA.isDataLoaded,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App(props: PropsFromRedux): JSX.Element {
  const {authorizationStatus, isDataLoaded} = props;

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Switch>
      <Route exact path={AppRoute.Root}>
        <WelcomeScreen
          errorsCount={MAX_MISTAKE_COUNT}
        />
      </Route>
      <Route exact path={AppRoute.Login}>
        <AuthScreen />
      </Route>
      <PrivateRoute
        exact
        path={AppRoute.Result}
        render={({history}) => (
          <WinScreen
            onReplayButtonClick={() => history.push(AppRoute.Game)}
          />
        )}
      />
      <Route
        exact
        path={AppRoute.Lose}
        render={({history}) => (
          <GameOverScreen
            onReplayButtonClick={() => history.push(AppRoute.Game)}
          />
        )}
      />
      <Route exact path={AppRoute.Game}>
        <GameScreen />
      </Route>
      <Route>
        <NotFoundScreen />
      </Route>
    </Switch>
  );
}

export {App};
export default connector(App);
