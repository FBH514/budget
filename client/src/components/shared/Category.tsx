import useMobile from "../../hooks/useMobile.tsx";
import Header from "./Header.tsx";

enum Desktop {
    PARENT = ""
}

enum Mobile {
    PARENT = ""
}

export default function Category({title, total}: {
    title: string,
    total: number
}): JSX.Element {

    const mobile = useMobile();

    return (
        <div
            className={mobile ? Mobile.PARENT : Desktop.PARENT}
        >
            <Header title={title} total={total}/>
        </div>
    )
}

// Helper.displayName = title;
// const Category = React.memo(Helper);
// export default Category;