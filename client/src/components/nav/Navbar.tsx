import useMobile from "../../hooks/useMobile.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Icons} from "../../utils/Icons.tsx";
import {motion} from "framer-motion";
import NavItemComponent from "./NavItemComponent.tsx";

enum Desktop {
    PARENT = "bg-gradient-to-br from-indigo-700 to-blue-700 p-4 flex items-center justify-between gap-4 shadow-md rounded-b-md"
}

enum Mobile {
    PARENT = ""
}

export default function Navbar({balance}: {
    balance: number;
}): JSX.Element {

    const mobile = useMobile();

    return (
        <motion.nav
            initial={{y: -100}}
            animate={{y: 0}}
            transition={{duration: 1}}
            className={mobile ? Mobile.PARENT : Desktop.PARENT}>
            <div className={"flex items-center gap-4"}>
                <NavItemComponent
                    name={balance >= 0 ? "Surplus" : "Deficit"}
                    balance={balance}
                    icon={Icons.WALLET}
                />
                <NavItemComponent
                    name={balance >= 0 ? "Surplus" : "Deficit"}
                    balance={balance}
                    icon={Icons.PIE}
                />
            </div>
            <motion.button
                whileHover={{opacity: 0.5}}
                whileTap={{scale: 0.9}}
                className={"text-2xl text-zinc-950 font-bold p-4 rounded-md border border-zinc-900 w-auto h-16 flex items-center"}
            >
                <FontAwesomeIcon icon={Icons.PLUS}/>
            </motion.button>
        </motion.nav>
    );
}