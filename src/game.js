export const isArtistAnswerCorrect = (question, userAnswer) => {
  return userAnswer.artist === question.song.artist;
};

export const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((answer, index) => {
    return answer === (question.answers[index].genre === question.genre);
  });
};
