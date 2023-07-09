import {Item} from "../../../types/Item.model.ts";
import React, {useState} from "react";
import EditModal from "../Modals/EditModal.tsx";
import useKeyboard from "../../../hooks/useKeyboard.tsx";

enum Desktop {
    PARENT = "px-4 py-2 text-zinc-50 text-2xl rounded-md shadow-md bg-gradient-to-br from-indigo-700 to-blue-700 cursor-pointer border-2 border-zinc-950 w-60"
}

function Helper({item}: { item: Item }): JSX.Element {

    const [isActive, setIsActive] = useState(false);
    const open = (): void => setIsActive(true);
    const close = (): void => setIsActive(false);
    useKeyboard("Escape", close);

    return (
        <div onClick={open} key={item.name} className={Desktop.PARENT}>
            <h2 className={"whitespace-nowrap font-thin"}>{item.name}</h2>
            <h3 className={"font-bold"}>{`$${item.amount}`}</h3>
            {isActive && <EditModal handleClose={close} item={item}/>}
        </div>
    );
}

Helper.displayName = "Item Component";
const ItemComponent = React.memo(Helper);
export default ItemComponent;