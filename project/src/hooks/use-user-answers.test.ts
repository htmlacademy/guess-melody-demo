import {renderHook, act} from '@testing-library/react';
import {useUserAnswers} from './use-user-answers';
import {makeFakeGenreQuestion} from '../utils/mocks';

const fakeQuestionGenre = makeFakeGenreQuestion();

describe('Hook: useUserAnswers', () => {
  it('should return array with 2 elements', () => {
    const {result} = renderHook(() =>
      useUserAnswers(fakeQuestionGenre),
    );

    const [answers, handleAnswerChange] = result.current;

    expect(result.current).toHaveLength(2);
    expect(answers).toBeInstanceOf(Array);
    expect(handleAnswerChange).toBeInstanceOf(Function);
  });

  it('should be correctly change state', () => {
    const expectedInitialAnswers = [false, false, false, false];

    const {result} = renderHook(
      () => useUserAnswers(fakeQuestionGenre),
    );

    const [initialAnswers] = result.current;
    let [, handleAnswerChange] = result.current;

    act(() => handleAnswerChange(1, true));

    [, handleAnswerChange] = result.current;

    act(() => handleAnswerChange(3, true));

    const [answers] = result.current;

    expect(initialAnswers).toStrictEqual(expectedInitialAnswers);
    expect(answers[1]).toBe(true);
    expect(answers[3]).toBe(true);
  });
});
