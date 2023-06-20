import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Icons} from "../../../utils/Icons.tsx";
import {AnimatePresence, motion} from "framer-motion";
import React from "react";

function Helper({isActive}: { isActive: boolean }): JSX.Element {

    return (
        <AnimatePresence>
            {isActive &&
            <div className={"absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gradient-to-br from-indigo-700 to-blue-700 rounded-md shadow-2xl z-50 w-5/6 h-5/6 p-1"}>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2}}
                    className={"p-8 bg-zinc-950 flex flex-col justify-between rounded-md h-full"}
                >
                    <h2>Insert a new entry</h2>

                    <div className={"flex items-center gap-4"}>
                        <button
                            className={"p-4 text-zinc-50 rounded-md shadow-md flex items-center gap-4 border border-zinc-50 w-fit"}
                            onClick={() => console.log("closing")}
                        >
                            <h2>Close</h2>
                            <FontAwesomeIcon icon={Icons.CLOSE}/>
                        </button>
                        <button
                            className={"p-4 text-zinc-50 rounded-md shadow-md flex items-center gap-4 border border-zinc-50 w-fit"}
                            onClick={() => console.log("closing")}
                        >
                            <h2>Save</h2>
                            <FontAwesomeIcon icon={Icons.PLUS}/>
                        </button>
                    </div>

                </motion.div>
            </div>}
        </AnimatePresence>
    );
}

Helper.displayName = "Modal";
const Modal = React.memo(Helper);
export default Modal;