import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {AppRoute, GameType} from '../../const';
import GameScreen from './game-screen';

let store;
let history;
let mockStore;
let unknownQuestion;
let mockGenreQuestion;
let mockArtist;

describe('Component: GameScreen', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => {};
    window.HTMLMediaElement.prototype.pause = () => {};
    mockStore = configureStore({});
    history = createMemoryHistory();

    unknownQuestion = {type: 'unknown'};
    mockGenreQuestion = {
      answers: [
        {
          genre: 'rock',
          src: 'fakeRock.ogg',
        },
        {
          genre: 'blues',
          src: 'fakeBlues.ogg',
        },
        {
          genre: 'rock',
          src: 'fakeRock2.ogg',
        },
        {
          genre: 'jazz',
          src: 'fakeJazz.ogg',
        },
      ],
      type: GameType.GENRE,
      genre: 'rock',
    };
    mockArtist = {
      answers: [
        {
          artist: 'Def Leppard',
          picture: 'fakePic',
        },
        {
          artist: 'BonJovi',
          picture: 'fakePic',
        },
        {
          artist: 'Cinderella',
          picture: 'fakePic',
        },
      ],
      song: {
        artist: 'BonJovi',
        src: 'living-on-prayer.ogg',
      },
      type: GameType.ARTIST,
    };
  });

  it('should render GenreQuestionScreen', () => {
    store = mockStore({
      GAME: {step: 0, mistakes: 2},
      DATA: {questions: [mockGenreQuestion]},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <GameScreen />
        </Router>
      </Provider>);

    expect(screen.getByText(/Выберите rock треки/i)).toBeInTheDocument();
    expect(screen.queryByText(/Кто исполняет эту песню/i)).not.toBeInTheDocument();
  });

  it('should render ArtistQuestionScreen', () => {
    store = mockStore({
      GAME: {step: 0, mistakes: 2},
      DATA: {questions: [mockArtist]},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <GameScreen />
        </Router>
      </Provider>);

    expect(screen.queryByText(/Кто исполняет эту песню/i)).toBeInTheDocument();
    expect(screen.queryByText(/Выберите rock треки/i)).not.toBeInTheDocument();
  });

  it('should redirect to "/lose" because mistakes > MAX_MISTAKES', () => {
    store = mockStore({
      GAME: {step: 0, mistakes: 10},
      DATA: {questions: [mockArtist]},
    });

    history.push(AppRoute.GAME);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.LOSE}>
              <h1>Lose screen</h1>
            </Route>
            <GameScreen />
          </Switch>
        </Router>
      </Provider>);

    expect(screen.getByText(/Lose screen/i)).toBeInTheDocument();
  });

  it('should redirect to "/result" because step > questions count', () => {
    store = mockStore({
      GAME: {step: 10, mistakes: 0},
      DATA: {questions: [mockArtist]},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.RESULT}>
              <h1>Result screen</h1>
            </Route>
            <GameScreen />
          </Switch>
        </Router>
      </Provider>);

    expect(screen.getByText(/Result screen/i)).toBeInTheDocument();
  });

  it('should redirect to "/" because unknown question type', () => {
    store = mockStore({
      GAME: {step: 0, mistakes: 0},
      DATA: {questions: [unknownQuestion]},
    });

    history.push(AppRoute.GAME);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.ROOT}>
              <h1>Root screen</h1>
            </Route>
            <GameScreen />
          </Switch>
        </Router>
      </Provider>);

    expect(screen.getByText(/Root screen/i)).toBeInTheDocument();
  });
});
