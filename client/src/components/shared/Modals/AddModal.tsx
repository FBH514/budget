import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Icons} from "../../../utils/Icons.tsx";
import {AnimatePresence, motion} from "framer-motion";
import React, {RefObject, useRef, useState} from "react";
import {Endpoints, POST} from "../../../utils/requests.ts";
import {ModalStyles} from "../../../styles/modal.style.ts";
import {FX} from "../../../styles/fx.model.ts";

enum Desktop {
    PARENT_CONTAINER = "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gradient-to-br from-indigo-700 to-blue-700 rounded-md shadow-2xl w-3/6 h-fit p-1 z-50",
    PARENT = "p-8 bg-zinc-950 flex flex-col justify-between gap-4 rounded-md h-full",
    BUTTONS = "flex items-center justify-center gap-4",
    INPUT = "p-2 rounded-md bg-zinc-50 text-zinc-950 placeholder:text-zinc-950 text-xl outline-none",
    LABEL = "text-xl text-zinc-50",
    HEADER = "flex items-center justify-center gap-4 text-zinc-50 text-4xl"
}

const categories = [
    "Income",
    "Expenses",
    "Investments"
]

interface InputProps {
    selected: string;
    name: string;
    type?: string;
    inputRef: RefObject<HTMLInputElement>;
}

const Input = (params: InputProps): JSX.Element => (
    <div className={"grid gap-2"}>
        <label htmlFor={params.name} className={Desktop.LABEL}>
            {`${params.selected} ${params.name}`}
        </label>
        <input
            className={Desktop.INPUT}
            type={params.type ? params.type : "text"}
            name={params.name}
            ref={params.inputRef}/>
    </div>
);

function Helper({handleClose}: {handleClose: () => void }): JSX.Element {

    const [category, setCategory] = useState<string>('');
    const nameRef = useRef<HTMLInputElement>(null);
    const amountRef = useRef<HTMLInputElement>(null);
    const sharesRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const close = () => handleClose();

    const isValidSubmission = (): boolean => {
        if (category === 'Investments') {
            return !!(nameRef && sharesRef && priceRef)
        }
        return !!(nameRef && amountRef);
    }

    async function handleSubmit(): Promise<void> {
        if (!isValidSubmission()) {
            return;
        }
        await POST(Endpoints.ADD_ENTRY, {
            name: nameRef.current?.value,
            amount: amountRef.current?.value,
            category: category
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
                        <h2>{category ? `Insert a new ${category} entry` : 'Insert a new entry'}</h2>
                    </header>

                    <div className={Desktop.BUTTONS}>
                        {categories.map((item) => (
                            <motion.button
                                key={item}
                                whileHover={FX.BUTTON_HOVER}
                                whileTap={FX.BUTTON_TAP}
                                className={ModalStyles.CATEGORY_BUTTON}
                                onClick={() => setCategory(item)}>
                                {item}
                            </motion.button>
                        ))}
                    </div>

                    {category !== '' && <form className={"grid gap-4"}>
                        <div className={"grid grid-cols-1 gap-4"}>
                            <Input selected={category} inputRef={nameRef} name={"Name"}/>
                            {category !== 'Investments' && <Input
                                selected={category}
                                inputRef={amountRef}
                                name={"Amount"}
                                type={"text"}/>
                            }
                            {category === 'Investments' && <Input
                                selected={category}
                                inputRef={priceRef}
                                name={"Price"}
                                type={"text"}/>
                            }
                            {category === 'Investments' && <Input
                                selected={category}
                                inputRef={sharesRef}
                                name={"Shares"}
                                type={"text"}/>
                            }
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