/**
 * Создаем универсальные классы, не привязанные к конкретному типу
 * с помощью дженериков.
 */
class Getter <T> {
  private item: T;

  constructor(item: T) {
    this.item = item;
  }

  getItem(): T {
    return this.item;
  }
}

const numberGetter = new Getter<number>(12); // OK
const fakeNumberGetter = new Getter<number>(`12`); // ERROR


class GetNumber extends Getter <number> {}
class GetString extends Getter <string> {}

const getNumber = new GetNumber(12); // OK
const getFakeNumber = new GetNumber(`12`); // ERROR

const getFakeString = new GetString(12); // ERROR
const getString = new GetString(`12`); // OK
