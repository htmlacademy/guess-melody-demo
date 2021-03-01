import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {incrementStep, incrementMistake} from '../../store/action';
import {GameType, MAX_MISTAKE_COUNT, AppRoute} from '../../const';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';
import Mistakes from '../mistakes/mistakes';
import LoadingScreen from '../loading-screen/loading-screen';
import {fetchQuestionList} from "../../store/api-actions";
import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';

const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);

const GameScreen = () => {
  const {step, mistakes} = useSelector((state) => state.GAME);
  const {questions, isDataLoaded} = useSelector((state) => state.DATA);

  const dispatch = useDispatch();

  const onUserAnswer = (question, answer) => {
    dispatch(incrementStep());
    dispatch(incrementMistake(question, answer));
  };

  const question = questions[step];
  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchQuestionList());
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  if (mistakes >= MAX_MISTAKE_COUNT) {
    return (
      <Redirect to={AppRoute.LOSE} />
    );
  }

  if (step >= questions.length || !question) {
    return (
      <Redirect to={AppRoute.RESULT} />
    );
  }

  switch (question.type) {
    case GameType.ARTIST:
      return (
        <ArtistQuestionScreenWrapped
          key={step}
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </ArtistQuestionScreenWrapped>
      );
    case GameType.GENRE:
      return (
        <GenreQuestionScreenWrapped
          key={step}
          question={question}
          onAnswer={onUserAnswer}
        >
          <Mistakes count={mistakes} />
        </GenreQuestionScreenWrapped>
      );
  }

  return <Redirect to={AppRoute.ROOT} />;
};

export default GameScreen;
