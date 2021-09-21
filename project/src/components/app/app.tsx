import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import WelcomeScreen from '../welcome-screen/welcome-screen';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import AuthScreen from '../auth-screen/auth-screen';
import GameOverScreen from '../game-over-screen/game-over-screen';
import WinScreen from '../win-screen/win-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import {Questions, QuestionGenre} from '../../types/question';

type AppScreenProps = {
  errorsCount: number;
  questions: Questions;
}

function App({errorsCount, questions}: AppScreenProps): JSX.Element {
  const [firstQuestion] = questions;

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
          <GenreQuestionScreen
            question={firstQuestion as QuestionGenre}
            onAnswer={() => {
              throw new Error('Function \'onAnswer\' isn\'t implemented.');
            }}
          />
        </Route>
        <Route exact path={AppRoute.Login}>
          <AuthScreen />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Result}
          render={() => <WinScreen />}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
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
