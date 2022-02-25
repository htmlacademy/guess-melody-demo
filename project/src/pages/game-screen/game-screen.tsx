import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {incrementStep} from '../../store/action';
import {AppRoute, GameType} from '../../const';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import Mistakes from '../../components/mistakes/mistakes';
import {Questions} from '../../types/question';
import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';

const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);

type GameScreenProps = {
  questions: Questions;
};

function GameScreen({questions}: GameScreenProps): JSX.Element {
  const step = useAppSelector((state) => state.step);
  const mistakes = useAppSelector((state) => state.mistakes);

  const question = questions[step];

  const dispatch = useAppDispatch();

  if (step >= questions.length || !question) {
    return <Navigate to={AppRoute.Root} />;
  }

  switch (question.type) {
    case GameType.Artist:
      return (
        <ArtistQuestionScreenWrapped
          key={step}
          question={question}
          onAnswer={() => dispatch(incrementStep())}
        >
          <Mistakes count={mistakes} />
        </ArtistQuestionScreenWrapped>
      );
    case GameType.Genre:
      return (
        <GenreQuestionScreenWrapped
          key={step}
          question={question}
          onAnswer={() => dispatch(incrementStep())}
        >
          <Mistakes count={mistakes} />
        </GenreQuestionScreenWrapped>
      );
    default:
      return <Navigate to={AppRoute.Root} />;
  }
}

export default GameScreen;
