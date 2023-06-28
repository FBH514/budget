import {round} from "../../utils/round.ts";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {motion} from "framer-motion";

export interface HeaderItem {
    title: string;
    icon?: IconDefinition,
    total: number
}

export default function Header(item: HeaderItem): JSX.Element {
    return (
        <motion.header
            initial={{scale: 0.98}}
            animate={{scale: 1}}
            transition={{duration: 1}}
            className={"grid items-center gap-4"}>
            <section className={"flex items-center justify-between gap-4 text-zinc-950"}>
                <div className={"flex items-center gap-4 text-6xl font-bold"}>
                    {item.icon && <FontAwesomeIcon icon={item.icon}/>}
                    <h2>{item.title}</h2>
                </div>
                <div className={"w-full relative"}>
                    <hr className={"bg-zinc-950 border-0 h-1 rounded-md shadow-md"}/>
                </div>
                <div className={"font-bold text-2xl py-2 px-4 rounded-md shadow-xl bg-gradient-to-br from-yellow-300 to-orange-300 border-2 border-zinc-950 rotate-2 hover:rotate-0 transition-all duration-200 cursor-pointer relative"}>
                    <div className={"h-2 w-2 rounded-md absolute top-1 right-1 bg-zinc-50 border-2 border-zinc-950"}></div>
                    <h3>{`$${round(item.total)}`}</h3>
                </div>
            </section>
        </motion.header>
    )
}