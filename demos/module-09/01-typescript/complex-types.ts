// Сложные типы

type DifferentOptions = {
    [key: string]: boolean | string | number
};

const differentOptions: DifferentOptions = {
    readyToMove: true,
    currentCity: `Saint Petersburg`,
    previousWorkCount: 4
};


type SpecificOptions = {
    readyToMove: boolean,
    currentCity: `Saint Petersburg` | `Moscow` | `Ekaterinburg`,
    previousWorkCount: number | null,
    specialRequirement?: []
};

const specificOptions: SpecificOptions = {
    readyToMove: true,
    currentCity: `Saint Petersburg`,
    previousWorkCount: null
};


interface Profile {
    age: number;
};

enum Color {
    RED = '#f00',
    GREEN = '#0f0',
    BLUE = '#00f'
};

const colorize = (color: Color) => {}

colorize(Color.BLUE);


// Можно импортировать и экспортировать для переиспользования
// import {Type} from '../types';
// export {Type};