import {Route, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {useAppSelector} from '../../hooks';
import {AppRoute, MAX_MISTAKE_COUNT} from '../../const';
import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';
import AuthScreen from '../../pages/auth-screen/auth-screen';
import GameOverScreen from '../../pages/game-over-screen/game-over-screen';
import WinScreen from '../../pages/win-screen/win-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import GameScreen from '../../pages/game-screen/game-screen';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import {getAuthorizationStatus, getAuthCheckedStatus} from '../../store/user-process/selectors';
import {getQuestionsDataLoadingStatus, getErrorStatus} from '../../store/game-data/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isQuestionsDataLoading = useAppSelector(getQuestionsDataLoadingStatus);
  const hasError = useAppSelector(getErrorStatus);

  if (!isAuthChecked || isQuestionsDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  if (hasError) {
    return (
      <ErrorScreen />);
  }

  return (
    <HelmetProvider>
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
              authorizationStatus={authorizationStatus}
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
    </HelmetProvider>
  );
}

export default App;
