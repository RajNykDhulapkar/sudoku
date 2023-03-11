import React, { useState } from "react";
import classes from "./Menu.module.scss";
import logo from "../assets/logo.svg";
import chevronIcon from "../assets/chevron.svg";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import generateBoard, { Cell } from "../services/generateSudoku";

const Menu = ({
    gameModes,
    mode,
    setMode,
}: {
    gameModes: string[];
    mode: number;
    setMode: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const [showModal, setShowModal] = useState(false);
    let navigate = useNavigate();

    const [inProgress, setInProgress] = useLocalStorage<boolean>("in_progress", false);
    const [activeMode, setActiveMode] = useLocalStorage<number | null>("active_mode", null);

    const [board, setBoard] = useLocalStorage<Cell[][]>("board", generateBoard());

    const leftShift = () => {
        if (mode > 0) {
            setMode(mode - 1);
        }
    };
    const rightShift = () => {
        if (mode < gameModes.length - 1) {
            setMode(mode + 1);
        }
    };
    const handleNewGameClick = () => {
        setShowModal(true);
        // localStorage.setItem("active_mode", String(mode));
        // navigate("/");
    };

    const handleResumeGameClick = () => {
        navigate("/");
    };
    const handleModalClick = () => {
        setShowModal(false);
    };
    const handleConfirmNewGame = () => {
        setActiveMode(mode);
        setBoard(generateBoard(mode));
        setInProgress(true);
        // delay of 80ms before navigating to game page
        // this delay is required to allow the new board to be set to the local storage
        setTimeout(() => {
            navigate("/");
        }, 80);
    };
    return (
        <div className={classes.mainApp}>
            <div className={classes.logoContainer}>
                <div className={classes.container}>
                    <img src={logo} alt='React Logo' />
                </div>
            </div>
            <div className={classes.modeSelectContainer}>
                <button onClick={leftShift} className={classes.leftChevronIcon}>
                    <img src={chevronIcon} alt='React Logo' />
                </button>
                <div className={classes.modeSelectBox}>
                    <div
                        style={{
                            transform: `translateX(calc(${mode} * -100% / var(--noOfModes)))`,
                        }}
                        className={classes.modes}
                    >
                        {gameModes.map((mode_name, index) => (
                            <div
                                style={{
                                    opacity: mode == index ? 1 : 0,
                                }}
                                key={index}
                                className={classes.mode}
                            >
                                {mode_name}
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={rightShift} className={classes.rightChevronIcon}>
                    <img src={chevronIcon} alt='React Logo' />
                </button>
            </div>
            <div className={classes.buttonsContainer}>
                <button onClick={handleNewGameClick}>New Game</button>

                <button
                    style={{
                        visibility:
                            mode === Number(localStorage.getItem("active_mode") || "0")
                                ? "visible"
                                : "hidden",
                    }}
                    onClick={handleResumeGameClick}
                >
                    Resume
                </button>
            </div>

            {showModal && (
                <div onClick={handleModalClick} className={classes.modalContainer}>
                    <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
                        <p>
                            Are you sure you want to start a new game? All your saved progress of
                            previous game will be lost.
                        </p>
                        <div className={classes.buttons}>
                            <button onClick={handleModalClick}>Cancel</button>
                            <button onClick={handleConfirmNewGame}>New Game</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;
