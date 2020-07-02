export enum GameType {
  ARTIST = `artist`,
  GENRE = `genre`,
}

export interface AnswerArtist {
  artist: string;
  picture: string;
}

export interface AnswerGenre {
  genre: string;
  src: string;
}

export interface QuestionArtist {
  answers: Array<AnswerArtist>;
  song: {
    artist: string,
    src: string,
  };
  type: GameType;
}

export interface QuestionGenre {
  answers: Array<AnswerGenre>;
  genre: string;
  type: GameType;
}
