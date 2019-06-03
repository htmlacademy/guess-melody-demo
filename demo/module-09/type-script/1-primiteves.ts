/**
 * Примитивы
 */

const writeMessage = (message: string) => {
  console.log(message);
};

writeMessage(`hello`); // OK
writeMessage(42); // ERROR


const createMessage = (word1: number, word2: boolean): string => {
  return `${word1} ${word2}`;
};

createMessage(12, true); // OK
createMessage(`hello`, `world`); // ERROR

/**
 * Объекты
 */

const logObject = (obj: {foo: string, bar: string}): void => {
  console.log(obj);
};


logObject({foo: `foo`, bar: `bar`}); // OK
logObject({fuz: `foo`, baz: `bar`}); // ERROR


const logArray = (arr: string[]): void => {
  console.log(arr.join(` `));
};

logArray([`hello`, `world`]); // OK
logArray([15, 14]); // ERROR


/**
 * Any
 */

const logAny = (item: any): void => {
  console.log(item);
};

logAny(12); // OK
logAny(true); // OK
logAny({}); // OK
