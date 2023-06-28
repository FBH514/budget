import useMobile from "./hooks/useMobile.tsx";
import Navbar from "./components/nav/Navbar.tsx";
import Category from "./components/shared/category/Category.tsx";
import React from "react";
import {useQuery} from "react-query";
import {Endpoints, QueryKeys, GET} from "./utils/requests.ts";
import {calculateTotal} from "./utils/calculateTotal.ts";
import {Icons} from "./utils/Icons.tsx";

enum Desktop {
    PARENT = "App bg-zinc-50 min-h-screen h-screen flex flex-col relative"
}

enum Mobile {
    PARENT = "App bg-zinc-50 min-h-screen relative"
}

const placeholder = Array(5).fill({name: 'Loading', amount: 0.00});
function Helper(): JSX.Element {

    const mobile = useMobile();

    const {data: income} = useQuery(
        QueryKeys.INCOME,
        () => GET(Endpoints.INCOME)
    );

    const {data: investments} = useQuery(
        QueryKeys.INVESTMENTS,
        () => GET(Endpoints.INVESTMENTS)
    );

    const {data: expenses} = useQuery(
        QueryKeys.EXPENSES,
        () => GET(Endpoints.EXPENSES)
    );

    const incomeBalance = calculateTotal(income);
    const expensesBalance = calculateTotal(expenses);
    // const investmentsBalance = calculateTotal(investments);

    return (
        <div className={mobile ? Mobile.PARENT : Desktop.PARENT}>
            <Navbar balance={(incomeBalance - expensesBalance)}/>
            <section
                className={"grid gap-4 p-4 justify-center overflow-y-scroll"}
                style={{height: 'calc(100vh - 72px)'}}>
                <Category title={"Income"} data={income ?? placeholder} icon={Icons.MONEY_BAG}/>
                <Category title={"Expenses"} data={expenses ?? placeholder} icon={Icons.CREDIT_CARD}/>
                <Category title={"Investments"} data={investments ?? placeholder} icon={Icons.COINS}/>
            </section>
        </div>
    );
}

Helper.displayName = "App";
const App = React.memo(Helper);
export default App;