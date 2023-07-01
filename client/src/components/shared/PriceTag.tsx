import React from "react";
import {round} from "../../utils/round.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {TagProps} from "../../types/PriceTag.model.ts";

enum Desktop {
    PARENT = "font-bold text-2xl py-2 px-4 rounded-md shadow-xl bg-gradient-to-br from-yellow-300 to-orange-300 border-2 border-zinc-950 relative flex items-center gap-2",
    PARENT_SLANTED = `${Desktop.PARENT} rotate-2 hover:rotate-0 transition-all duration-200`,
    HOLE = "h-2 w-2 rounded-md absolute top-1 right-1 bg-zinc-50 border-2 border-zinc-950"
}

function Helper(params: TagProps): JSX.Element {
    return (
        <div className={!params.slant ? Desktop.PARENT : Desktop.PARENT_SLANTED}>
            {params.slant && <div className={Desktop.HOLE}></div>}
            {params.icon && <FontAwesomeIcon icon={params.icon}/>}
            <h3>{typeof params.amount === 'number' ? `$${round(params.amount)}` : params.amount}</h3>
        </div>
    );
}

Helper.displayName = "Price Tag"
const PriceTag = React.memo(Helper);
export default PriceTag