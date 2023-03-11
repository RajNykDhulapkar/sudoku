import { useEffect, useMemo, useState } from "react";
import cogIcon from "./assets/cog.svg";
import backArrowIcon from "./assets/back-arrow.svg";
import refreshIcon from "./assets/refresh.svg";
import checkIcon from "./assets/check.svg";
import pencilIcon from "./assets/pencil.svg";
import undoIcon from "./assets/undo.svg";
import classes from "./App.module.scss";
import Menu from "./components/Menu";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import generateBoard, { Cell } from "./services/generateSudoku";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
    const gameModes = ["Beginner", "Easy", "Medium", "Hard", "Extreme"];
    const [modeIndex, setModeIndex] = useLocalStorage<number>("mode_index", 0);
    const [inProgress, setInProgress] = useLocalStorage<boolean>("in_progress", false);

    const navigate = useNavigate();

    const range = (start: number, end: number): number[] => {
        return Array.apply(0, Array(end - start)).map((element, index) => index + start);
    };

    const [board, setBoard] = useLocalStorage<Cell[][]>("board", generateBoard());

    useEffect(() => {
        if (!inProgress) {
            navigate("menu", { relative: "route" });
        }
    }, []);

    return (
        <Routes>
            <Route
                path='/menu'
                element={<Menu gameModes={gameModes} mode={modeIndex} setMode={setModeIndex} />}
            />

            <Route
                path='/'
                element={
                    <div className={classes.mainApp}>
                        <header className={classes.header}>
                            <Link to='menu'>
                                <button className={`${classes.button}`}>
                                    <img src={backArrowIcon} alt='React Logo' />
                                </button>
                            </Link>
                            <h1>Sudoku</h1>
                            <button className={`${classes.button}`}>
                                <img src={cogIcon} alt='React Logo' />
                            </button>
                        </header>

                        <div className={classes.boardContainer}>
                            <div className={classes.container}>
                                <div className={classes.board}>
                                    {range(0, 3).map((i) =>
                                        range(0, 3).map((j) => (
                                            <div
                                                className={classes.boardGroup}
                                                id={`group-${i}-${j}`}
                                                key={`group-${i}-${j}`}
                                            >
                                                {range(0, 3).map((row) =>
                                                    range(0, 3).map((col) => (
                                                        <div
                                                            className={`${classes.boardCell} ${
                                                                board[i * 3 + row][j * 3 + col]
                                                                    .initialValue
                                                                    ? classes.prefilledCell
                                                                    : ""
                                                            }`}
                                                            id={`cell-${i * 3 + row}-${
                                                                j * 3 + col
                                                            }`}
                                                            key={`cell-${i * 3 + row}-${
                                                                j * 3 + col
                                                            }`}
                                                        >
                                                            {board[i * 3 + row][j * 3 + col].value
                                                                ? board[i * 3 + row][j * 3 + col]
                                                                      .value
                                                                : " "}
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
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
                                <img src={refreshIcon} alt='Refresh Icon' />
                            </button>
                            <button className={classes.bottomButton}>
                                <img src={checkIcon} alt='Check Icon' />
                            </button>
                            <button className={`${classes.bottomButton} ${classes.pencil}`}>
                                <img src={pencilIcon} alt='Pencil Icon' />
                            </button>
                            <button className={classes.bottomButton}>
                                <img src={undoIcon} alt='Undo Icon' />
                            </button>
                        </div>
                    </div>
                }
            />
        </Routes>
    );
}

export default App;
