import {createSelector} from "reselect";
import NameSpace from "../name-space.js";


export const getQuestions = (state) => {
  return state[NameSpace.DATA].questions;
};

const randomFilter = () => {
  // В этом селекторе в аргументах тоже будет state,
  // однако он нам не нужен и мы просто его опускаем.
  // Этот селектор нам нужен для "случайной" генерации
  // набора вопросов из хранилища
  return Math.random() > 0.5;
};

export const getArtistQuestions = createSelector(
    // Функция принимает state и возвращает результат
    getQuestions,
    // Функция так же принимает state и возвращает результат.
    // Таких функций (геттеров) может быть множество
    randomFilter,
    // Последняя функция уже не геттер, а комбайнер,
    // она принимает результаты всех предыдущих функций
    // и возвращает результат на их основе
    (resultOne, resultTwo) => {
      return resultOne.filter((it) => resultTwo && it.type === `artist`);
    }
);

export const getGenreQuestions = createSelector(
    getQuestions,
    (questions) => {
      return questions.filter((it) => it.type === `genre`);
    }
);
