import { useState } from "react";
import reactLogo from "./assets/react.svg";
import classes from "./App.module.scss";

function App() {
    const [count, setCount] = useState(0);

    const board = [
        [5, 3, 1, 6, 2, 8, 4, 7, 9],
        [9, 4, 7, 5, 3, 1, 2, 8, 6],
        [6, 2, 8, 9, 4, 7, 3, 1, 5],
        [1, 9, 3, 8, 5, 2, 6, 4, 7],
        [8, 5, 2, 7, 6, 4, 9, 3, 1],
        [7, 6, 4, 1, 9, 3, 5, 2, 8],
        [3, 7, 9, 2, 1, 5, 8, 6, 4],
        [4, 8, 6, 3, 7, 9, 1, 5, 2],
        [2, 1, 5, 4, 8, 6, 7, 9, 3],
    ];
    const range = (start: number, end: number): number[] => {
        return Array.apply(0, Array(end - start)).map((element, index) => index + start);
    };

    return (
        <div className={classes.mainApp}>
            <div className={classes.header}>
                <h1>Sudoku</h1>
            </div>

            <div className={classes.boardContainer}>
                <div className={classes.board}>
                    {range(0, 3).map((i) =>
                        range(0, 3).map((j) => (
                            <div className={classes.boardGroup} id={`group-${i}-${j}`}>
                                {range(0, 3).map((row) =>
                                    range(0, 3).map((col) => (
                                        <div
                                            className={classes.boardCell}
                                            id={`cell-${i * 3 + row}-${j * 3 + col}`}
                                        >
                                            {board[i * 3 + row][j * 3 + col]}
                                        </div>
                                    ))
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className={classes.numbersContainer}>
                <span className={classes.numbers}>1</span>
                <span className={classes.numbers}>2</span>
                <span className={classes.numbers}>3</span>
                <span className={classes.numbers}>4</span>
                <span className={classes.numbers}>5</span>
                <span className={classes.numbers}>6</span>
                <span className={classes.numbers}>7</span>
                <span className={classes.numbers}>8</span>
                <span className={classes.numbers}>9</span>
            </div>
            <div>
                <button>r</button>
                <button>r</button>
                <button>r</button>
                <button>r</button>
            </div>
        </div>
    );
}

export default App;
