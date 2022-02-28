import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {incrementStep, checkUserAnswer} from '../../store/action';
import {AppRoute, GameType, MAX_MISTAKE_COUNT} from '../../const';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import Mistakes from '../../components/mistakes/mistakes';
import {Question, UserAnswer} from '../../types/question';
import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';

const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);

function GameScreen(): JSX.Element {
  const step = useAppSelector((state) => state.step);
  const mistakes = useAppSelector((state) => state.mistakes);
  const questions = useAppSelector((state) => state.questions);

  const question = questions[step];

  const dispatch = useAppDispatch();

  if (mistakes >= MAX_MISTAKE_COUNT) {
    return <Navigate to={AppRoute.Lose} />;
  }

  if (step >= questions.length || !question) {
    return <Navigate to={AppRoute.Result} />;
  }

  const handleUserAnswer = (questionItem: Question, userAnswer: UserAnswer) => {
    dispatch(incrementStep());
    dispatch(checkUserAnswer({question: questionItem, userAnswer}));
  };

  switch (question.type) {
    case GameType.Artist:
      return (
        <ArtistQuestionScreenWrapped
          key={step}
          question={question}
          onAnswer={handleUserAnswer}
        >
          <Mistakes count={mistakes} />
        </ArtistQuestionScreenWrapped>
      );
    case GameType.Genre:
      return (
        <GenreQuestionScreenWrapped
          key={step}
          question={question}
          onAnswer={handleUserAnswer}
        >
          <Mistakes count={mistakes} />
        </GenreQuestionScreenWrapped>
      );
    default:
      return <Navigate to={AppRoute.Root} />;
  }
}

export default GameScreen;
