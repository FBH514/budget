import {round} from "../../utils/round.ts";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Item {
    name: string;
    balance: number;
    icon?: IconDefinition
}

export default function NavItemComponent(item: Item) {
    return (
        <div className={"flex flex-col justify-center"}>
            <h1>{item.name}</h1>
            <div
                className={"text-2xl text-zinc-100 font-bold p-2 bg-zinc-950 rounded-md shadow-md w-fit flex items-center gap-2"}
            >
                {item.balance && item.balance >= 0 ? (`$${round(item.balance)}`) : -`$${round(item.balance)}`}
                {item.icon && <FontAwesomeIcon icon={item.icon}/>}
            </div>
        </div>
    );
}