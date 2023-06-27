import {round} from "../../utils/round.ts";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface HeaderItem {
    title: string;
    icon?: IconDefinition,
    total: number
}

export default function Header(item: HeaderItem): JSX.Element {
    return (
        <header className={"grid items-center gap-4"}>
            <section className={"flex items-center justify-between gap-4 text-zinc-950"}>
                <div className={"flex items-center gap-4 text-6xl font-bold"}>
                    {item.icon && <FontAwesomeIcon icon={item.icon}/>}
                    <h2>{item.title}</h2>
                </div>
                <hr className={"w-full bg-zinc-950 border-0 h-1 rounded-md"}/>
                <h3 className={"font-bold text-2xl p-4 rounded-md shadow-md bg-gradient-to-br from-yellow-300 to-orange-300 border-2 border-zinc-950"}>
                    {`$${round(item.total)}`}
                </h3>
            </section>
        </header>
    )
}