import React from "react";
import classes from "./Menu.module.scss";
import logo from "../assets/logo.svg";
import chevronIcon from "../assets/chevron.svg";

const Menu = ({
    gameModes,
    mode,
    setMode,
    showMenu,
    setShowMenu,
}: {
    gameModes: string[];
    mode: number;
    setMode: React.Dispatch<React.SetStateAction<number>>;
    showMenu: boolean;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
        setShowMenu(!showMenu);
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
            </div>
        </div>
    );
};

export default Menu;
