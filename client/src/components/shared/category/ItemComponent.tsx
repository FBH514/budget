import {Item} from "../../../types/Item.model.ts";
import React, {useState} from "react";
import EditModal from "../Modals/EditModal.tsx";
import useKeyboard from "../../../hooks/useKeyboard.tsx";
import {motion} from "framer-motion";

function Helper({item}: { item: Item }): JSX.Element {

    const [isActive, setIsActive] = useState(false);
    const open = (): void => setIsActive(true);
    const close = (): void => setIsActive(false);
    useKeyboard("Escape", close);

    return (
        <motion.div
            onClick={open}
            key={item.name}
            className={"px-4 py-2 text-zinc-50 text-2xl rounded-md shadow-md bg-gradient-to-br from-indigo-700 to-blue-700 cursor-pointer border-2 border-zinc-950"}>
            <h2 className={"whitespace-nowrap font-thin"}>{item.name}</h2>
            <h3 className={"font-bold"}>{`$${item.amount}`}</h3>
            {isActive && <EditModal handleClose={close} name={item.name}/>}
        </motion.div>
    );
}

Helper.displayName = "Item Component";
const ItemComponent = React.memo(Helper);
export default ItemComponent;