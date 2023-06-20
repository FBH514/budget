import {motion} from "framer-motion";
import {Item} from "../../../types/Item.model.ts";
import Modal from "../Modal/Modal.tsx";
import React, {useState} from "react";

function Helper({ item }: { item: Item }): JSX.Element {

    const [isActive, setIsActive] = useState<boolean>(false);
    const handleOpen = (): void => setIsActive(true);

    return (
        <motion.div
            whileHover={{ scale: 0.95 }}
            key={item.name}
            className={"p-2 text-zinc-100 text-2xl rounded-md shadow-md cursor-pointer bg-gradient-to-br from-indigo-700 to-blue-700"}
            onClick={handleOpen}
        >
            <h2 className={"whitespace-nowrap font-thin"}>{item.name}</h2>
            <h3 className={"font-bold"}>{`$${item.amount}`}</h3>
            <Modal isActive={isActive} />
        </motion.div>
    );
}

Helper.displayName = "Item Component";
const ItemComponent = React.memo(Helper);
export default ItemComponent;