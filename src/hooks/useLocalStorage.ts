import { useState, useEffect } from "react";
import { Cell } from "../services/generateSudoku";

interface LocalStorageKeys {
    in_progress: boolean;
    mode_index: number;
    active_mode: string;
    board: Cell[][];
}

// custom hook to manage local storage
export const useLocalStorage = <T>(
    key: keyof LocalStorageKeys,
    initialValue: T
): [T, (value: T | ((prevState: T) => T)) => void] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (!item) {
                console.log("No item found in local storage, setting initial value");
                window.localStorage.setItem(key, JSON.stringify(initialValue));
            }
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    // useEffect(() => {
    //     const value = window.localStorage.getItem(key);
    //     if (value) {
    //         setStoredValue(JSON.parse(value));
    //     }
    // }, [storedValue]);

    const setValue = (value: T | ((prevState: T) => T)): void => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore)); // save to local storage
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
};
