import { Item } from "../types/Item.model.ts";

export function calculateTotal(data: Item[]): number {
  let total = 0;
  if (!data) {
    return total;
  }
  for (let index = 0; index < data.length; index++) {
    const currentItem = data[index];
    if (currentItem?.amount !== undefined) {
      total += currentItem.amount;
    }
  }
  return total;
}