// Простые типы

const age: number = 42;

const isDeveloper: boolean = true;

const skils: string[] = [
    `JavaScript`,
    `TypeScript`,
];

const tools: Array<string> = [
    `React`,
    `Redux`,
    `Axios`
];

const options: {
    [key: string]: boolean
} = {
    readyToMove: true
};

const write = (value: number): void => {
    console.log(value);
};


