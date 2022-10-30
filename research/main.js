const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const range = (start, end) => {
    return Array.apply(0, Array(end)).map((element, index) => index + start);
};

const base = 3;
const side = base * base;

const pattern = (r, c) => {
    return (base * (r % base) + Math.floor(r / base) + c) % side;
};

const displayBoard = (board) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            process.stdout.write(board[i][j] + " ");
        }
        process.stdout.write("\n");
    }
};

const displayArray = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        process.stdout.write(arr[i] + " ");
    }
    process.stdout.write("\n");
};

const rBase = range(0, base);
displayArray(rBase);
const rows = new Array(side);
const cols = new Array(side);
let k = 0;
shuffleArray(rBase).forEach((g) => {
    shuffleArray(rBase).forEach((r) => {
        rows[k++] = g * base + r;
    });
});
k = 0;
shuffleArray(rBase).forEach((g) => {
    shuffleArray(rBase).forEach((c) => {
        cols[k++] = g * base + c;
    });
});

const nums = shuffleArray(range(1, base * base));

const board = new Array(side).fill(0).map(() => new Array(side).fill(0));

let count = 1;
displayArray(rows);

rows.forEach((r) => {
    cols.forEach((c) => {
        console.log(r, c, count++);
        board[r][c] = nums[pattern(r, c)];
    });
});

console.log("");
displayBoard(board);
