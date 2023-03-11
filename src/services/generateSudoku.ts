const base = 3;
const side = base * base;

const shuffleArray = (array: number[], sampleSize?: number) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    if (sampleSize && sampleSize < array.length) {
        return array.slice(0, sampleSize);
    } else {
        return array;
    }
};

/**
 *
 * @param start starting number of the range
 * @param end one more than last number of the range
 * @returns list [start, end) of integers
 */
const range = (start: number, end: number) => {
    return Array.apply(0, Array(end - start)).map((element, index) => index + start);
};

const pattern = (r: number, c: number) => {
    return (3 * (r % 3) + Math.floor(r / 3) + c) % 9;
};

const gameModes = ["Beginner", "Easy", "Medium", "Hard", "Extreme"];

const gameModeRatios = {
    [gameModes[0]]: 0.2962962663,
    [gameModes[1]]: 0.370370388,
    [gameModes[2]]: 0.4444444478,
    [gameModes[3]]: 0.5185185075,
    [gameModes[4]]: 0.5925925973,
};

export type Cell = {
    value: number;
    initialValue: number;
    actualValue: number;
};

const generateBoard = (mode: number = 0): Cell[][] => {
    const board = new Array(9).fill(0).map(() => new Array(9).fill(0));

    let rows = new Array(9).fill(0),
        cols = new Array(9).fill(0),
        numbers = shuffleArray(range(1, 10));
    let k = 0;
    shuffleArray([0, 1, 2]).forEach((base) => {
        shuffleArray([0, 1, 2]).forEach((row) => {
            rows[k++] = 3 * base + row;
        });
    });
    k = 0;
    shuffleArray([0, 1, 2]).forEach((base) => {
        shuffleArray([0, 1, 2]).forEach((col) => {
            cols[k++] = 3 * base + col;
        });
    });

    rows.forEach((row, row_index) => {
        cols.forEach((col, col_index) => {
            board[row_index][col_index] = numbers[pattern(row, col)];
        });
    });

    // Convert board from number[][] to Cell[][]
    const cellBoard = board.map((row, row_index) => {
        // to return a new transform row
        return row.map((num, num_index) => {
            return {
                value: num,
                initialValue: num,
                actualValue: num,
            };
        });
    });

    let squares = side * side;
    // let ratio = 3 / 4;
    let empties = Math.floor(squares * gameModeRatios[gameModes[mode]]);

    shuffleArray(range(0, squares), empties).forEach((p, index) => {
        const row = Math.floor(p / side);
        const col = p % side;
        const cell = cellBoard[row][col];
        cellBoard[row][col] = {
            ...cell,
            value: 0,
            initialValue: 0,
        };

        board[Math.floor(p / side)][p % side] = 0;
    });

    return cellBoard;
};

export default generateBoard;
