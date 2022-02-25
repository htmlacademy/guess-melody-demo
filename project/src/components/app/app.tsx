import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {AppRoute, AuthorizationStatus, MAX_MISTAKE_COUNT} from '../../const';
import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';
import AuthScreen from '../../pages/auth-screen/auth-screen';
import GameOverScreen from '../../pages/game-over-screen/game-over-screen';
import WinScreen from '../../pages/win-screen/win-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import GameScreen from '../../pages/game-screen/game-screen';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<WelcomeScreen errorsCount={MAX_MISTAKE_COUNT} />}
          />
          <Route
            path={AppRoute.Login}
            element={<AuthScreen />}
          />
          <Route
            path={AppRoute.Result}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.NoAuth}
              >
                <WinScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Lose}
            element={<GameOverScreen />}
          />
          <Route
            path={AppRoute.Game}
            element={
              <GameScreen />
            }
          />
          <Route
            path="*"
            element={<NotFoundScreen />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
