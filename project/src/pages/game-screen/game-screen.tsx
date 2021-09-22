import {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {AppRoute, GameType, FIRST_GAME_STEP} from '../../const';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import {QuestionArtist, QuestionGenre, Questions} from '../../types/question';
import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';

const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);

type GameScreenProps = {
  questions: Questions;
};

function GameScreen({questions}: GameScreenProps): JSX.Element {
  const [step, setStep] = useState(FIRST_GAME_STEP);

  const question = questions[step];

  if (step >= questions.length || !question) {
    return <Navigate to={AppRoute.Root} />;
  }

  switch (question.type) {
    case GameType.Artist:
      return (
        <ArtistQuestionScreenWrapped
          key={step}
          question={question as QuestionArtist}
          onAnswer={() => setStep((prevStep) => prevStep + 1)}
        />
      );
    case GameType.Genre:
      return (
        <GenreQuestionScreenWrapped
          key={step}
          question={question as QuestionGenre}
          onAnswer={() => setStep((prevStep) => prevStep + 1)}
        />
      );
    default:
      return <Navigate to={AppRoute.Root} />;
  }
}

export default GameScreen;
