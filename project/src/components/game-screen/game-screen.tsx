import {Redirect} from 'react-router-dom';
import {Dispatch} from 'redux';
import {connect, ConnectedProps} from 'react-redux';
import {incrementStep} from '../../store/action';
import {AppRoute, GameType} from '../../const';
import {State} from '../../types/state';
import {Actions} from '../../types/action';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import {QuestionArtist, QuestionGenre, Questions} from '../../types/question';
import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';

const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);
const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);

type GameScreenProps = {
  questions: Questions;
};

const mapStateToProps = ({step}: State) => ({
  step,
});

// Без использования bindActionCreators
const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onUserAnswer() {
    dispatch(incrementStep());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & GameScreenProps;

function GameScreen(props: ConnectedComponentProps): JSX.Element {
  const {questions, step, onUserAnswer} = props;
  const question = questions[step];

  if (step >= questions.length || !question) {
    return (
      <Redirect to={AppRoute.Root} />
    );
  }

  switch (question.type) {
    case GameType.Artist:
      return (
        <ArtistQuestionScreenWrapped
          key={step}
          question={question as QuestionArtist}
          onAnswer={onUserAnswer}
        />
      );
    case GameType.Genre:
      return (
        <GenreQuestionScreenWrapped
          key={step}
          question={question as QuestionGenre}
          onAnswer={onUserAnswer}
        />
      );
    default:
      return <Redirect to={AppRoute.Root} />;
  }
}

export {GameScreen};
export default connector(GameScreen);
