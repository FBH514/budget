import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Icons} from "../../../utils/Icons.tsx";
import {AnimatePresence, motion} from "framer-motion";
import React, {useRef, useState} from "react";

enum Desktop {
    MENU_BUTTON = "flex items-center justify-center gap-2 text-zinc-50 rounded-md shadow-md bg-gradient-to-br from-indigo-700 to-blue-700 text-2xl p-4"
}

function Helper({handleIsActive}: {handleIsActive: () => void }): JSX.Element {

    const [selected, setSelected] = useState<string>('');
    const nameRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);

    const handle = () => {
        handleIsActive();
    }

    return (
        <AnimatePresence>
            <div
                className={"absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gradient-to-br from-indigo-700 to-blue-700 rounded-md shadow-2xl w-3/6 p-1"}>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2}}
                    className={"p-8 bg-zinc-950 flex flex-col justify-between gap-4 rounded-md h-full"}>

                    <header className={"flex items-center justify-center gap-4 text-zinc-50 text-4xl"}>
                        <h2>{selected ? `Insert a new ${selected}` : 'Insert a new entry'}</h2>
                        <FontAwesomeIcon icon={Icons.MONEY_BAG}/>
                    </header>

                    <div className={"flex items-center justify-center gap-4"}>
                        <motion.button
                            whileTap={{scale: 0.9}}
                            whileHover={{scale: 1.05}}
                            className={Desktop.MENU_BUTTON}
                            onClick={() => setSelected('Income')}>
                            Income
                        </motion.button>
                        <motion.button
                            whileTap={{scale: 0.9}}
                            whileHover={{scale: 1.05}}
                            className={Desktop.MENU_BUTTON}
                            onClick={() => setSelected('Expense')}>
                            Expenses
                        </motion.button>
                        <motion.button
                            whileTap={{scale: 0.9}}
                            whileHover={{scale: 1.05}}
                            className={Desktop.MENU_BUTTON}
                            onClick={() => setSelected('Investment')}>
                            Investments
                        </motion.button>
                    </div>

                    {selected !== '' && <form className={"grid gap-4"}>
                        <div className={"grid grid-cols-1 gap-4"}>
                            <div className={"grid gap-2"}>
                                <label htmlFor={"name"} className={"text-xl text-zinc-50"}>
                                    {`${selected} name`}
                                </label>
                                <input
                                    className={"p-2 rounded-md bg-zinc-50 text-zinc-950 placeholder:text-zinc-950 text-xl outline-none"}
                                    type={"text"}
                                    name={"name"}
                                    ref={nameRef}
                                />
                            </div>
                            <div className={"grid gap-2"}>
                                <label htmlFor={"amount"} className={"text-xl text-zinc-50"}>
                                    {`${selected} amount`}
                                </label>
                                <input
                                    className={"p-2 rounded-md bg-zinc-50 text-zinc-950 placeholder:text-zinc-950 text-xl outline-none"}
                                    type={"text"}
                                    name={"amount"}
                                    ref={amountRef}
                                />
                            </div>
                        </div>
                    </form>}

                    <div className={"flex items-center gap-4 justify-center"}>
                        <motion.button
                            whileTap={{scale: 0.9}}
                            className={"p-4 text-zinc-50 rounded-md shadow-md flex items-center gap-4 border border-zinc-50 w-fit hover:text-zinc-950 hover:bg-zinc-50"}
                            onClick={handle}
                        >
                            <h2>Close</h2>
                            <FontAwesomeIcon icon={Icons.CLOSE}/>
                        </motion.button>
                        <motion.button
                            whileTap={{scale: 0.9}}
                            className={"p-4 text-zinc-50 rounded-md shadow-md flex items-center gap-4 border border-zinc-50 w-fit hover:text-zinc-950 hover:bg-zinc-50"}
                            onClick={() => console.log("Saving")}
                        >
                            <h2>Save</h2>
                            <FontAwesomeIcon icon={Icons.PLUS}/>
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