const base = 3;
const side = base * base;

const pattern = (r, c) => {
    return (3 * (r % 3) + Math.floor(r / 3) + c) % 9;
};

const shuffleArray = (array, sampleSize) => {
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

const range = (start, end) => {
    return Array.apply(0, Array(end - start)).map((element, index) => index + start);
};

const displayArray = (arr) => {
    let i = 0;
    process.stdout.write("[ ");

    for (i = 0; i < arr.length - 1; i++) {
        process.stdout.write(arr[i] + ", ");
    }
    process.stdout.write(arr[i] + "]\n");
};

const displayBoard = (board) => {
    for (let i = 0; i < board.length; i++) {
        displayArray(board[i]);
    }
};

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

const board = new Array(9).fill(0).map(() => new Array(9).fill(0));

rows.forEach((row, row_index) => {
    cols.forEach((col, col_index) => {
        board[row_index][col_index] = numbers[pattern(row, col)];
    });
});

displayBoard(board);

let squares = side * side;
let ratio = 3 / 4;
let empties = Math.floor(squares * ratio);

shuffleArray(range(0, squares), empties).forEach((p, index) => {
    board[Math.floor(p / side)][p % side] = "*";
});

console.log("[space]");
displayBoard(board);
