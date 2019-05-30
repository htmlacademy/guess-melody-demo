import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {compose} from "recompose";
import {Switch, Route} from "react-router-dom";

import ArtistQuestionScreen from "../../components/artist-question-screen/artist-question-screen.jsx";
import AuthorizationScreen from "../../components/authorization-screen/authorization-screen.jsx";
import GameOverScreen from "../../components/game-over-screen/game-over-screen.jsx";
import QuestionGenreScreen from "../../components/genre-question-screen/genre-question-screen.jsx";
import WelcomeScreen from "../../components/welcome-screen/welcome-screen.jsx";
import WinScreen from "../../components/win-screen/win-screen.jsx";

import withActivePlayer from "../../hocs/with-active-player/with-active-player";
import withTransformProps from "../../hocs/with-transform-props/with-transform-props";
import withUserAnswer from "../../hocs/with-user-answer/with-user-asnwer";
import {ActionCreator} from "../../reducer/game/game";

import {getStep, getMistakes} from "../../reducer/game/selectors";
import {getQuestions} from "../../reducer/data/selectors";
import {getAuthorizationStatus} from "../../reducer/user/selectors";

const transformPlayerToAnswer = (props) => {
  const newProps = Object.assign({}, props, {
    renderAnswer: props.renderPlayer,
  });
  delete newProps.renderPlayer;
  return newProps;
};

const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);
const QuestionGenreScreenWrapped = withUserAnswer(withActivePlayer(
    withTransformProps(transformPlayerToAnswer)(QuestionGenreScreen)));


const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends PureComponent {
    constructor(props) {
      super(props);

      this._getScreen = this._getScreen.bind(this);
    }

    render() {
      return <Switch>
        <Route path="/" exact render={() => <Component
          {...this.props}
          renderScreen={this._getScreen}
        />} />
        <Route path="/login" component={AuthorizationScreen} />
      </Switch>;
    }

    _getScreen(question) {
      if (!question) {
        const {step, questions} = this.props;
        if (step > questions.length - 1) {
          return <WinScreen/>;
        } else {
          const {
            maxMistakes,
            gameTime,
            onWelcomeScreenClick,
          } = this.props;

          return <WelcomeScreen
            errorCount={maxMistakes}
            gameTime={gameTime}
            onClick={onWelcomeScreenClick}
          />;
        }
      }

      const {
        onUserAnswer,
        mistakes,
        maxMistakes,
        resetGame,
      } = this.props;

      if (mistakes >= maxMistakes) {
        return <GameOverScreen
          onRelaunchButtonClick={resetGame}
        />;
      }

      switch (question.type) {
        case `genre`: return <QuestionGenreScreenWrapped
          answers={question.answers}
          question={question}
          onAnswer={(userAnswer) => onUserAnswer(
              userAnswer,
              question
          )}
        />;

        case `artist`: return <ArtistQuestionScreenWrapped
          question={question}
          onAnswer={(userAnswer) => onUserAnswer(
              userAnswer,
              question
          )}
        />;
      }

      return null;
    }

  }

  WithScreenSwitch.propTypes = {
    gameTime: PropTypes.number.isRequired,
    isAuthorizationRequired: PropTypes.bool.isRequired,
    questionsLength: PropTypes.number.isRequired,
    maxMistakes: PropTypes.number.isRequired,
    mistakes: PropTypes.number.isRequired,
    onUserAnswer: PropTypes.func.isRequired,
    onWelcomeScreenClick: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired,
    questions: PropTypes.array.isRequired,
    step: PropTypes.number.isRequired,
  };

  return WithScreenSwitch;
};


export {withScreenSwitch};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  questions: getQuestions(state),
  step: getStep(state),
  mistakes: getMistakes(state),
  isAuthorizationRequired: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(ActionCreator.incrementStep()),

  onUserAnswer: (userAnswer, question) => {
    dispatch(ActionCreator.incrementStep());
    dispatch(ActionCreator.incrementMistake(
        userAnswer,
        question
    ));
  },

  resetGame: () => dispatch(ActionCreator.resetGame()),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withScreenSwitch
);
