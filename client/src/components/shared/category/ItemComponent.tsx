import {motion} from "framer-motion";
import {Item} from "../../../types/Item.model.ts";

export default function ItemComponent({item}: { item: Item }): JSX.Element {
    return (
        <motion.div
            whileHover={{scale: 0.95}}
            key={item.name}
            className={"p-2 text-zinc-100 text-2xl rounded-md shadow-md cursor-pointer bg-gradient-to-br from-indigo-700 to-blue-700"}
            onClick={() => console.log(item)}
        >
            <h2 className={"whitespace-nowrap font-thin"}>{item.name}</h2>
            <h3 className={"font-bold"}>{`$${item.amount}`}</h3>
        </motion.div>
    )
}

// className={"p-4 border border-cyan-700 text-cyan-700 text-2xl rounded-md cursor-pointer"}