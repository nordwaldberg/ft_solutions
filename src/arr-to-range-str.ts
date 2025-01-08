/*
    Вход: массив чисел
    Выход: строка с диапазонами чисел
    Необходимо преобразовать массив чисел в строку, преобразуя соседние числа в диапазоны
*/

const arrToRangeStr = (arr: number[]) => {
    if (arr.length === 0) return '';

    const sorted: number[] = [...arr].sort((a, b) => a - b);

    const ranges: string[] = [];
    let start = sorted[0];
    let end = sorted[0];

    for (let i = 1; i <= sorted.length; i++) {
        const isSequence = i < sorted.length && sorted[i] === end + 1;

        if (!isSequence) {
            ranges.push(start === end ? `${start}` : `${start}-${end}`);
            start = sorted[i];
            end = sorted[i];
        } else {
            end = sorted[i];
        }
    }

    return ranges.join(',');
};

console.log(arrToRangeStr([1, 4, 5, 2, 3, 9, 8, 11, 0, 15, 16, 17])); // '0-5,8-9,11, 15-17'
console.log(arrToRangeStr([1, 4, 3, 2])); // '1-4'