import {useEffect} from "react";

export default function useKeyboard(key: string, action: () => void) {

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === key) action();
        }
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    })
}