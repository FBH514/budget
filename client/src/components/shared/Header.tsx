export default function Header({title, total}: {
    title: string,
    total: number
}): JSX.Element {
    return (
        <header className={"grid items-center gap-4"}>
            <section className={"flex items-center gap-4"}>
                <h2 className={"text-6xl font-bold text-cyan-700"}>{title}</h2>
                <h3 className={"text-cyan-700 font-thin text-2xl"}>{total}</h3>
            </section>
            <hr className={"h-px bg-cyan-700 border-0"}/>
        </header>
    )
}