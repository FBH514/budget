import {round} from "../../utils/round.ts";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import PriceTag from "../shared/PriceTag.tsx";

interface Item {
    name: string;
    balance: number;
    icon?: IconDefinition
}

enum Desktop {
    PARENT = "flex flex-col justify-center"
}

export default function NavItemComponent(item: Item) {
    return (
        <div className={Desktop.PARENT}>
            <PriceTag
                amount={item.balance && item.balance >= 0 ? (`$${round(item.balance)}`) : -`$${round(item.balance)}`}
                icon={item.icon}/>
        </div>
    );
}