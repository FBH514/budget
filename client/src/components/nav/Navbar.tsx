import useMobile from "../../hooks/useMobile.tsx";

enum Desktop {
    PARENT = "bg-cyan-700 p-4 flex items-center gap-4"
}

enum Mobile {
    PARENT = ""
}

export default function Navbar({balance}: {
    balance: number;
}): JSX.Element {

    const mobile = useMobile();

    return (
        <nav
            className={mobile ? Mobile.PARENT : Desktop.PARENT}
        >
            <h2 className={"text-2xl text-cyan-700 font-bold p-4 bg-zinc-900 rounded-md shadow-md w-fit"}>
                {balance && balance >= 0 ? (`$${balance}`) : -`$${balance}`}
            </h2>
        </nav>
    );
}