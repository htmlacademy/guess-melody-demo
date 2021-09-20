export type GenreAnswer = {
  src: string;
  genre: string;
};

export type QuestionGenre = {
  answers: GenreAnswer[];
  genre: string;
  type: string;
};
