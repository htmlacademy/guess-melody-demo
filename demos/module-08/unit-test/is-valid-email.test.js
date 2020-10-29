import {isValidEmail} from "./is-valid-email";

describe(`Valid email`, () => {

  // Шаг 1. Ожидаем, что email валиден
  it(`should allow to enter my email`, () => {
    expect(isValidEmail(`igor.antonov@htmlacademy.ru`)).toBe(true);
  });

  // Шаг 2. Ожидаем, что список email адресов валиден
  it(`should allow to enter correct emails`, () => {
    expect(isValidEmail(`a@iantonov.me`)).toBe(true);
    expect(isValidEmail(`test@mail.ru`)).toBe(true);
  });

  // Шаг 3. Ожидаем, что это невалидный email
  it(`should not start with @`, () => {
    expect(isValidEmail(`@iantonov.me`)).toBe(false);
  });

  // Шаг 4. Финальный тест
  it(`should allow to enter correct emails`, () => {
    expect(isValidEmail(`a@iantonov.me`)).toBe(true);
    expect(isValidEmail(`test@mail.ru`)).toBe(true);
  });

  it(`should not allow to enter invalid email`, () => {
    expect(isValidEmail(`@`)).toBe(false);
    expect(isValidEmail(`ddd`)).toBe(false);
    expect(isValidEmail(`@@@@`)).toBe(false);
    expect(isValidEmail(null)).toBe(false);
  });
});
