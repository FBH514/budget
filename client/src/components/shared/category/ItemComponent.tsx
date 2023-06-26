import {Item} from "../../../types/Item.model.ts";
import React, {useState} from "react";
import EditModal from "../Modals/EditModal.tsx";

function Helper({item}: { item: Item }): JSX.Element {

    const [isActive, setIsActive] = useState(false);

    const handleIsActive = () => {
        setIsActive(!isActive);
    }

    return (
        <div
            onClick={handleIsActive}
            key={item.name}
            className={"p-2 text-zinc-100 text-2xl rounded-md shadow-md bg-gradient-to-br from-indigo-700 to-blue-700 cursor-pointer"}>
            <h2 className={"whitespace-nowrap font-thin"}>{item.name}</h2>
            <h3 className={"font-bold"}>{`$${item.amount}`}</h3>
            {isActive && <EditModal handleIsActive={handleIsActive} name={item.name}/>}
        </div>
    );
}

Helper.displayName = "Item Component";
const ItemComponent = React.memo(Helper);
export default ItemComponent;