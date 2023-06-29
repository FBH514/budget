import {round} from "../../utils/round.ts";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import PriceTag from "../shared/PriceTag.tsx";

interface Item {
    name: string;
    balance: number;
    icon?: IconDefinition
}

enum Desktop {
    PARENT = "flex flex-col justify-center",
    BALANCE = "text-2xl text-zinc-950 font-bold py-2 px-4 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-md shadow-md w-fit flex items-center gap-2 border-2 border-zinc-950"
}

export default function NavItemComponent(item: Item) {
    return (
        <div className={Desktop.PARENT}>
            <PriceTag amount={item.balance && item.balance >= 0 ? (`$${round(item.balance)}`) : -`$${round(item.balance)}`} icon={item.icon}/>
        </div>
    );
}