import ItemComponent from "./ItemComponent.tsx";
import {Item} from "../../../types/Item.model.ts";

enum Desktop {
    PARENT = "flex items-start gap-4 flex-wrap"
}

export default function List({items}: { items: Item[] }): JSX.Element {
    return (
        <div className={Desktop.PARENT}>
            {items.map((item, index) => <ItemComponent 
                item={item} 
                key={index}/>
            )}
        </div>
    );
}