import {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {motion} from "framer-motion";
import PriceTag from "./PriceTag.tsx";

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
                <PriceTag amount={item.total} slant={true}/>
            </section>
        </motion.header>
    )
}