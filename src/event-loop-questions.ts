//1_base

console.log('0');

setTimeout((): void => { console.log('1'); }, 100);

let p: Promise<unknown> = new Promise((resolve: Function, reject: Function): void => {
    console.log('2');
    resolve();
});

p.then(() => console.log('3'));

setTimeout((): void => { console.log('4'); }, 0);

console.log('5');

// 0 2 5 3 4 1
// 1. Конструктор Promise выполняется синхронно!
// 2. Коллбэк в таймере попадает в очередь макрозадач через N-ms,
// а выполняется как только до него дойдет очередь.