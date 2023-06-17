import {useEffect, useState} from "react";
import {BREAKPOINT} from "../constants/Breakpoint.tsx";

export default function useMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < BREAKPOINT);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < BREAKPOINT);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
}