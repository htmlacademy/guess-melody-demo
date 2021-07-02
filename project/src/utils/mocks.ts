import {music, system, name, internet} from 'faker';
import {GameType} from '../const';
import {QuestionArtist, QuestionGenre} from '../types/question';

export const makeFakeArtistQuestion = (): QuestionArtist => ({
  type: GameType.Artist,
  song: {
    artist: name.title(),
    src: system.filePath(),
  },
  answers: new Array(3).fill(null).map(() => (
    { picture: internet.avatar(), artist: name.title() }
  )),
} as QuestionArtist);

export const makeFakeGenreQuestion = (): QuestionGenre => ({
  type: GameType.Genre,
  genre: music.genre(),
  answers: new Array(4).fill(null).map(() => (
    { src: system.filePath(), genre: music.genre() }),
  ),
} as QuestionGenre);
