import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Icons} from "../../../utils/Icons.tsx";
import {AnimatePresence, motion} from "framer-motion";
import React, {useRef, useState} from "react";
import {ModalStyles} from "../../../styles/modal.style.ts";
import {Endpoints} from "../../../utils/requests.ts";
import {PUT} from "../../../utils/requests.ts";
import {Item} from "../../../types/Item.model.ts";
import {FX} from "../../../styles/fx.model.ts";
import {DELETE} from "../../../utils/requests.ts";

enum Desktop {
    PARENT_CONTAINER = "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gradient-to-br from-indigo-700 to-blue-700 rounded-md shadow-2xl w-3/6 h-fit p-1 z-50",
    PARENT = "p-8 bg-zinc-950 flex flex-col justify-between gap-4 rounded-md h-full z-50",
    BUTTONS = "flex items-center justify-center gap-4",
    INPUT = "p-2 rounded-md bg-zinc-50 text-zinc-950 placeholder:text-zinc-950 text-xl outline-none",
    LABEL = "text-xl text-zinc-50",
    HEADER = "flex items-center justify-center gap-4 text-zinc-50 text-4xl"
}

function Helper({handleClose, item}: { handleClose: () => void; item: Item }): JSX.Element {

    const [category, setCategory] = useState<string>('');
    const nameRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);
    const sharesRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const close = () => handleClose();

    const isValidSubmission = (): boolean => {
        return !!amountRef && !!nameRef;
    }

    const handleSubmit = async (): Promise<void> => {
        if (!isValidSubmission()) {
            return;
        }
        await PUT(Endpoints.UPDATE_ENTRY, {
            id: item.id,
            category: item.category,
            name: nameRef.current?.value ?? item.name,
            amount: amountRef.current?.value ?? item.amount,
            shares: sharesRef.current?.value,
            price: priceRef.current?.value
        });
        close();
    }

    const handleDelete = async (): Promise<void> => {
        await DELETE(Endpoints.DELETE_ENTRY, {
            id: item.id,
            category: item.category
        });
        close();
    }

    return (
        <AnimatePresence>
            <div className={Desktop.PARENT_CONTAINER}>
                <motion.div
                    initial={FX.ANIMATE_INITIAL_1}
                    animate={FX.ANIMATE_FINAL_1}
                    exit={FX.ANIMATE_EXIT_1}
                    transition={FX.TRANSITION_1}
                    className={Desktop.PARENT}>

                    <header className={Desktop.HEADER}>
                        <FontAwesomeIcon icon={Icons.MONEY_BAG}/>
                        <h2>{`Edit ${item.name}`}</h2>
                    </header>

                    <div className={Desktop.BUTTONS}>
                        <motion.button
                            whileTap={FX.BUTTON_TAP}
                            whileHover={FX.BUTTON_HOVER}
                            className={ModalStyles.CATEGORY_BUTTON}
                            onClick={() => setCategory('Name')}>
                            Name
                        </motion.button>
                        <motion.button
                            whileTap={FX.BUTTON_TAP}
                            whileHover={FX.BUTTON_HOVER}
                            className={ModalStyles.CATEGORY_BUTTON}
                            onClick={() => setCategory('Amount')}>
                            Amount
                        </motion.button>
                        <motion.button
                            whileTap={FX.BUTTON_TAP}
                            whileHover={FX.BUTTON_HOVER}
                            className={ModalStyles.CATEGORY_BUTTON}
                            onClick={async () => handleDelete()}>
                            Delete
                        </motion.button>
                    </div>

                    {category === 'Name' && <form className={"grid gap-4"}>
                        <div className={"grid grid-cols-1 gap-4"}>
                            <div className={"grid gap-2"}>
                                <label htmlFor={"name"} className={"text-xl text-zinc-50"}>
                                    {`New name for ${item.name}`}
                                </label>
                                <input className={Desktop.INPUT} type={"text"} name={"name"} ref={nameRef}/>
                            </div>
                        </div>
                    </form>}
                    {category === 'Amount' && <form className={"grid gap-4"}>
                        <div className={"grid grid-cols-1 gap-4"}>
                            <div className={"grid gap-2"}>
                                <label htmlFor={"amount"} className={"text-xl text-zinc-50"}>
                                    {`New amount for ${item.name}`}
                                </label>
                                <input className={Desktop.INPUT} type={"text"} name={"amount"} ref={amountRef}/>
                            </div>
                        </div>
                    </form>}

                    <div className={Desktop.BUTTONS}>
                        <motion.button
                            whileTap={FX.BUTTON_TAP}
                            className={ModalStyles.ACTION_BUTTON}
                            onClick={close}>
                            <FontAwesomeIcon icon={Icons.CLOSE}/>
                            <h2>Close</h2>
                        </motion.button>
                        <motion.button
                            whileTap={FX.BUTTON_TAP}
                            className={ModalStyles.ACTION_BUTTON}
                            onClick={async () => handleSubmit()}>
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