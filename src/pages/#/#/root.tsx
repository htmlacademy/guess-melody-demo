import * as React from "react";

import WelcomeScreen from "components/welcome-screen/welcome-screen";
import ArtistQuestionScreen from "components/artist-question-screen/artist-question-screen";
import GameScreen from "components/game-screen/game-screen";
import GenreQuestionScreen from "components/genre-question-screen/genre-question-screen";

import withActivePlayer from "hocs/with-active-player/with-active-player";
import withUserAnswer from "hocs/with-user-answer/with-user-answer";

import {useQuestions} from 'reducer/data';
import {useIncrementStep, useMaxMistakes, useMistakes, useStep, useUserAnswer} from 'reducer/game';
import {AuthorizationStatus, useAuthStatus} from 'reducer/user';


import history from "../../../history";
import {AppRoute} from "../../../const";
import {GameType} from "../../../types";

const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

const RootScreen: React.FC = (): JSX.Element|null => {
  const authorizationStatus = useAuthStatus();
  const mistakes = useMistakes();
  const questions = useQuestions();
  const maxMistakes = useMaxMistakes();
  const step = useStep();
  const onWelcomeButtonClick = useIncrementStep();
  const onUserAnswer = useUserAnswer();

  const question = questions[step];

  if (step === -1) {
    return (
      <WelcomeScreen
        errorsCount={maxMistakes}
        onWelcomeButtonClick={onWelcomeButtonClick}
      />
    );
  }

  if (mistakes >= maxMistakes) {
    history.push(AppRoute.LOSE);
    return null;
  }

  if (step >= questions.length) {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      history.push(AppRoute.RESULT);
    } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(AppRoute.LOGIN);
    }

    return null;
  }

  if (question) {
    switch (question.type) {
      case GameType.ARTIST:
        return (
          <GameScreen
            type={question.type}
          >
            <ArtistQuestionScreenWrapped
              question={question}
              onAnswer={onUserAnswer}
            />
          </GameScreen>
        );
      case GameType.GENRE:
        return (
          <GameScreen
            type={question.type}
          >
            <GenreQuestionScreenWrapped
              question={question}
              onAnswer={onUserAnswer}
            />
          </GameScreen>
        );
    }
  }

  return null;
};

export default RootScreen;
