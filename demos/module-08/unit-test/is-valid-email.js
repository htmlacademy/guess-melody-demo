const AT_SIGN = `@`;
const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const isValidEmail = (email) => {
  // Шаг 1.
  return false;

  // Шаг 2. email === `igor.antonov@htmlacademy.ru`;
  // return email === `igor.antonov@htmlacademy.ru`;

  // Шаг 3. Добавим проверку на наличие символа @
  // return email.includes(AT_SIGN);

  // Шаг 4. Добавим проверку на наличие символов перед @
  // return email.indexOf(AT_SIGN) > 0;

  // Шаг 5. Финальная версия функции
  // return EMAIL_REGEXP.test(email);
};

export {isValidEmail};
