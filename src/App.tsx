import { useState } from "react";
import cogIcon from "./assets/cog.svg";
import backArrowIcon from "./assets/back-arrow.svg";
import refreshIcon from "./assets/refresh.svg";
import checkIcon from "./assets/check.svg";
import pencilIcon from "./assets/pencil.svg";
import undoIcon from "./assets/undo.svg";
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
                <button className={`${classes.button}`}>
                    <img src={backArrowIcon} alt='React Logo' />
                </button>
                <h1>Sudoku</h1>
                <button className={`${classes.button}`}>
                    <img src={cogIcon} alt='React Logo' />
                </button>
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
                <button data-count='0' className={classes.numbers}>
                    1
                </button>
                <button data-count='0' className={classes.numbers}>
                    2
                </button>
                <button data-count='0' className={classes.numbers}>
                    3
                </button>
                <button data-count='0' className={classes.numbers}>
                    4
                </button>
                <button data-count='0' className={classes.numbers}>
                    5
                </button>
                <button data-count='0' className={classes.numbers}>
                    6
                </button>
                <button data-count='0' className={classes.numbers}>
                    7
                </button>
                <button data-count='0' className={classes.numbers}>
                    8
                </button>
                <button data-count='0' className={classes.numbers}>
                    9
                </button>
                <button data-count='' className={classes.numbers}>
                    X
                </button>
            </div>
            <div className={classes.bottomControl}>
                <button className={`${classes.bottomButton} ${classes.refresh}`}>
                    <img src={refreshIcon} alt='React Logo' />
                </button>
                <button className={classes.bottomButton}>
                    <img src={checkIcon} alt='React Logo' />
                </button>
                <button className={`${classes.bottomButton} ${classes.pencil}`}>
                    <img src={pencilIcon} alt='React Logo' />
                </button>
                <button className={classes.bottomButton}>
                    <img src={undoIcon} alt='React Logo' />
                </button>
            </div>
        </div>
    );
}

export default App;
