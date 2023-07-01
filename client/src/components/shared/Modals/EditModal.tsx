import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Icons} from "../../../utils/Icons.tsx";
import {AnimatePresence, motion} from "framer-motion";
import React, {useRef, useState} from "react";

enum Desktop {
    PARENT_CONTAINER = "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gradient-to-br from-indigo-700 to-blue-700 rounded-md shadow-2xl w-3/6 h-2/3 p-1",
    PARENT = "p-8 bg-zinc-950 flex flex-col justify-between gap-4 rounded-md h-full z-50",
    CATEGORY_BUTTON = "flex items-center justify-center gap-2 text-zinc-50 rounded-md shadow-md bg-gradient-to-br from-indigo-700 to-blue-700 text-2xl p-4",
    ACTION_BUTTON = "p-4 text-zinc-50 rounded-md shadow-md flex items-center gap-4 border border-zinc-50 w-fit hover:text-zinc-950 hover:bg-zinc-50",
    BUTTONS = "flex items-center justify-center gap-4",
    INPUT = "p-2 rounded-md bg-zinc-50 text-zinc-950 placeholder:text-zinc-950 text-xl outline-none",
    LABEL = "text-xl text-zinc-50",
    HEADER = "flex items-center justify-center gap-4 text-zinc-50 text-4xl"
}

function Helper({handleClose, name}: {
    handleClose: () => void;
    name: string;
}): JSX.Element {

    const [selected, setSelected] = useState<string>('');
    const nameRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);

    const close = () => handleClose();

    return (
        <AnimatePresence>
            <div className={Desktop.PARENT_CONTAINER}>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2}}
                    className={Desktop.PARENT}>

                    <header className={Desktop.HEADER}>
                        <FontAwesomeIcon icon={Icons.MONEY_BAG}/>
                        <h2>{`Edit ${name}`}</h2>
                    </header>

                    <div className={"flex items-center justify-center gap-4"}>
                        <motion.button
                            whileTap={{scale: 0.9}}
                            whileHover={{scale: 1.05}}
                            className={Desktop.CATEGORY_BUTTON}
                            onClick={() => setSelected('Name')}>
                            Name
                        </motion.button>
                        <motion.button
                            whileTap={{scale: 0.9}}
                            whileHover={{scale: 1.05}}
                            className={Desktop.CATEGORY_BUTTON}
                            onClick={() => setSelected('Amount')}>
                            Amount
                        </motion.button>
                    </div>

                    {selected === 'Name' && <form className={"grid gap-4"}>
                        <div className={"grid grid-cols-1 gap-4"}>
                            <div className={"grid gap-2"}>
                                <label htmlFor={"name"} className={"text-xl text-zinc-50"}>
                                    {`New name for ${name}`}
                                </label>
                                <input className={Desktop.INPUT} type={"text"} name={"name"} ref={nameRef}/>
                            </div>
                        </div>
                    </form>}
                    {selected === 'Amount' && <form className={"grid gap-4"}>
                        <div className={"grid grid-cols-1 gap-4"}>
                            <div className={"grid gap-2"}>
                                <label htmlFor={"amount"} className={"text-xl text-zinc-50"}>
                                    {`New amount for ${name}`}
                                </label>
                                <input className={Desktop.INPUT} type={"text"} name={"amount"} ref={amountRef}/>
                            </div>
                        </div>
                    </form>}

                    <div className={Desktop.BUTTONS}>
                        <motion.button
                            whileTap={{scale: 0.9}}
                            className={Desktop.ACTION_BUTTON}
                            onClick={close}>
                            <FontAwesomeIcon icon={Icons.CLOSE}/>
                            <h2>Close</h2>
                        </motion.button>
                        <motion.button
                            whileTap={{scale: 0.9}}
                            className={"p-4 text-zinc-50 rounded-md shadow-md flex items-center gap-4 border border-zinc-50 w-fit hover:text-zinc-950 hover:bg-zinc-50"}
                            onClick={() => console.log("Saving")}>
                            <FontAwesomeIcon icon={Icons.PLUS}/>
                            <h2>Save</h2>
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

Helper.displayName = "Add Modal";
const AddModal = React.memo(Helper);
export default AddModal;