import { NotificationItem } from "../interfaces";
export function getPendingHabits(
  items: any,
  collection: string
): NotificationItem {
  let itemIds = items.map((item: any) => item.id);
  return {
    Ids: itemIds,
    Info: [itemIds.length, collection]
  };
}
