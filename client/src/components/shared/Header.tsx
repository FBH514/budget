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
            <section className={"flex items-center justify-between text-zinc-950"}>
                <div className={"flex items-center gap-4 text-6xl font-bold"}>
                    {item.icon && <FontAwesomeIcon icon={item.icon}/>}
                    <h2>{item.title}</h2>
                </div>
                <h3 className={"font-thin text-2xl p-2 rounded-md border border-zinc-950 shadow-md"}>
                    {`$${round(item.total)}`}
                </h3>
            </section>
        </header>
    )
}