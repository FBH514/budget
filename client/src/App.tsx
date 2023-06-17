import useMobile from "./hooks/useMobile.tsx";
import Navbar from "./components/nav/Navbar.tsx";
import Category from "./components/shared/Category.tsx";
import React from "react";

enum Desktop {
    PARENT = "App bg-zinc-900 min-h-screen flex flex-col gap-8"
}

enum Mobile {
    PARENT = "App bg-zinc-900 min-h-screen"
}

function Helper(): JSX.Element {

    const mobile = useMobile();

    return (
        <div className={mobile ? Mobile.PARENT : Desktop.PARENT}>
            <Navbar balance={0.01}/>
            <section
                className={"grid gap-4 p-4"}
                style={{height: 'calc(100vh - 128px)'}}
            >
                <Category title={"Expenses"} total={0.00}/>
                <Category title={"Income"} total={0.00}/>
                <Category title={"Investments"} total={0.00}/>
            </section>
        </div>
    );
}

Helper.displayName = "App";
const App = React.memo(Helper);
export default App;