/**
 * Создаем типы на основе структур
 */
interface Foo {
  foo: string
}

interface Bar {
  bar: string
}

const foo = {foo: `foo`};
const bar = {bar: `bar`};

type FooOrBar = Foo | Bar;

const log1 = (item: FooOrBar): void => {
  console.log(item);
};

log1(foo); // OK
log1(bar); // OK

type FooAndBar = Foo & Bar;

const log2 = (item: FooAndBar): void => {
  console.log(item);
};

log2(foo); // ERROR
log2(bar); // ERROR
log2(Object.assign({}, foo, bar)); // OK
