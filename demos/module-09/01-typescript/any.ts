// any

const fn2 = (value: number): void => {
    console.log(value + 1);
}

const fn1 = (value: any): void => {
    fn2(value);
};

fn1('1'); // -> 11