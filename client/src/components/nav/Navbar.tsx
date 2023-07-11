import useMobile from "../../hooks/useMobile.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Icons} from "../../utils/Icons.tsx";
import {motion} from "framer-motion";
import NavItemComponent from "./NavItemComponent.tsx";
import AddModal from "../shared/Modals/AddModal.tsx";
import {useState} from "react";
import useKeyboard from "../../hooks/useKeyboard.tsx";
import {getMonth} from "../../utils/time.ts";
import {ButtonStyle} from "../../styles/button.style.ts";
import {FX} from "../../styles/fx.model.ts";

enum Desktop {
    PARENT = "bg-gradient-to-br from-indigo-700 to-blue-700 p-4 flex items-center justify-between gap-4 shadow-xl border-b-4 border-zinc-950",
    MONTH = "flex items-center gap-2 text-2xl text-zinc-950 font-bold py-2 px-4 rounded-md border-2 border-zinc-950"
}

enum Mobile {
    PARENT = ""
}

export default function Navbar({balance}: { balance: number; }): JSX.Element {

    const mobile = useMobile();
    const [isActive, setIsActive] = useState(false);
    const close = (): void => setIsActive(false);
    const open = (): void => setIsActive(true);
    useKeyboard("Escape", close);

    return (
        <motion.nav
            initial={FX.ANIMATE_INITIAL_3}
            animate={FX.ANIMATE_FINAL_3}
            transition={FX.TRANSITION_2}
            className={mobile ? Mobile.PARENT : Desktop.PARENT}>
            <div className={"flex items-center gap-4"}>
                <div className={"flex items-center gap-4"}>
                    <NavItemComponent
                        name={balance >= 0 ? "Surplus" : "Deficit"}
                        balance={balance}
                        icon={Icons.WALLET}/>
                </div>
                <div className={Desktop.MONTH}>
                    <FontAwesomeIcon icon={Icons.HOUSE}/>
                    <h2>{getMonth()} Budget</h2>
                </div>
            </div>
            <motion.button
                whileHover={FX.BUTTON_HOVER}
                whileTap={FX.BUTTON_TAP}
                className={ButtonStyle.ACTION_BUTTON}
                onClick={open}>
                <FontAwesomeIcon icon={Icons.PLUS}/>
                Add Entry
            </motion.button>
            {isActive && <AddModal handleClose={close}/>}
        </motion.nav>
    );
}