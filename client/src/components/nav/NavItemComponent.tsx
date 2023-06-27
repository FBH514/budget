import {round} from "../../utils/round.ts";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Item {
    name: string;
    balance: number;
    icon?: IconDefinition
}

enum Desktop {
    PARENT = "flex flex-col justify-center",
    BALANCE = "text-2xl text-zinc-100 font-bold py-2 px-4 bg-zinc-950 rounded-md shadow-md w-fit flex items-center gap-2"
}

export default function NavItemComponent(item: Item) {
    return (
        <div className={Desktop.PARENT}>
            <div className={Desktop.BALANCE}>
                {item.balance && item.balance >= 0 ? (`$${round(item.balance)}`) : -`$${round(item.balance)}`}
                {item.icon && <FontAwesomeIcon icon={item.icon}/>}
            </div>
        </div>
    );
}