import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute} from '../../const';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import AuthScreen from '../auth-screen/auth-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import WinScreen from '../win-screen/win-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type AppScreenProps = {
  errorsCount: number;
}

function App({errorsCount}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <WelcomeScreen
            errorsCount={errorsCount}
          />
        </Route>
        <Route exact path={AppRoute.DevArtist}>
          <ArtistQuestionScreen />
        </Route>
        <Route exact path={AppRoute.DevGenre}>
          <GenreQuestionScreen />
        </Route>
        <Route exact path={AppRoute.Login}>
          <AuthScreen />
        </Route>
        <Route exact path={AppRoute.Result}>
          <WinScreen />
        </Route>
        <Route exact path={AppRoute.Lose}>
          <GameOverScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
