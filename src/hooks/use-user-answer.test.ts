import { renderHook, act } from '@testing-library/react';
import { useUserAnswers } from './use-user-answers';
import { makeFakeGenreQuestion } from '../utils/mocks';

describe('Hook: useUserAnswers', () => {
  it('should return array with 2 elements', () => {
    const fakeQuestionGenre = makeFakeGenreQuestion();

    const { result } = renderHook(() => useUserAnswers(fakeQuestionGenre));
    const [answers, handleAnswerChange] = result.current;

    expect(result.current).toHaveLength(2);
    expect(answers).toBeInstanceOf(Array);
    expect(typeof handleAnswerChange).toBe('function');
  });

  it('should be correctly change state', () => {
    const fakeQuestionGenre = makeFakeGenreQuestion();
    const expectedInitialAnswers = [false, false, false, false];
    const expectedAnswers = [false, true, false, true];

    const {result} = renderHook(() => useUserAnswers(fakeQuestionGenre));
    const [initialAnswers] = result.current;
    let [, handleAnswerChange] = result.current;

    act(() => handleAnswerChange(1, true));
    [, handleAnswerChange] = result.current;
    act(() => handleAnswerChange(3, true));
    const [answers] = result.current;

    expect(initialAnswers).toEqual(expectedInitialAnswers);
    expect(answers).toEqual(expectedAnswers);
  });
});
