// Дженерики

const MyMap = <K, V>(key: K, value: V) => {
    console.log(`key`, key);
    console.log(`value`, value);
};

MyMap<string, boolean>(`isTrue`, true);