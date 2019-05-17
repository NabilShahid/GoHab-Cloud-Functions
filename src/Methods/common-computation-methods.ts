import { CountAndIds } from "./../interfaces";
export function getOverdueItems(
  items: any,
  itemType: string
): CountAndIds {
  let itemsIds = items
    .filter(
      (item:any) =>
        item.dueDate && !item.completed && new Date(item.dueDate) < new Date()
    )
    .map((item:any) => item.id);
    return{
      Count:itemsIds.length,
      Ids:items,
      ItemType:itemType
    }
}
 