import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {GameType, FIRST_GAME_STEP} from '../../const';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen';

const GameScreen = (props) => {
  const [step, setStep] = useState(FIRST_GAME_STEP);

  const {questions} = props;
  const question = questions[step];

  if (step >= questions.length || !question) {
    return (
      <Redirect to="/" />
    );
  }

  switch (question.type) {
    case GameType.ARTIST:
      return (
        <ArtistQuestionScreen
          question={question}
          onAnswer={() => setStep((prevStep) => prevStep + 1)}
        />
      );
    case GameType.GENRE:
      return (
        <GenreQuestionScreen
          question={question}
          onAnswer={() => setStep((prevStep) => prevStep + 1)}
        />
      );
  }

  return <Redirect to="/" />;
};

GameScreen.propTypes = {
  questions: PropTypes.array.isRequired,
};

export default GameScreen;
