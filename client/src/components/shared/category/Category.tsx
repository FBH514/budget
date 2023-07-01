import useMobile from "../../../hooks/useMobile.tsx";
import Header from "../Header.tsx";
import List from "./List.tsx";
import {Item} from "../../../types/Item.model.ts";
import {calculateTotal} from "../../../utils/calculateTotal.ts";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

enum Desktop {
    PARENT = "grid gap-4 py-4"
}

enum Mobile {
    PARENT = "grid gap-4"
}

interface CategoryItem {
    title: string,
    data: Item[],
    icon?: IconDefinition
}

export default function Category(item: CategoryItem): JSX.Element {
    const mobile = useMobile();
    return (
        <div className={mobile ? Mobile.PARENT : Desktop.PARENT}>
            <Header title={item.title} total={calculateTotal(item.data)} icon={item.icon}/>
            <List items={item.data}/>
        </div>
    )
}