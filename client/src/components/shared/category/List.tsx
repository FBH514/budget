import ItemComponent from "./ItemComponent.tsx";
import {Item} from "../../../types/Item.model.ts";

export default function List({ items }: { items: Item[] }): JSX.Element {
  return (
    <div className={"flex items-start gap-4 overflow-x-scroll"}>
      {items.map((item, index) => <ItemComponent item={item} key={index}/>)}
    </div>
  );
}