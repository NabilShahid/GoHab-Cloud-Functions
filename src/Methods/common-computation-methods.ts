import { CountAndIds } from "./../interfaces";
export function getDueItems(items: any, time: string): CountAndIds {
  let currDateMS = new Date().setHours(0, 0, 0, 0);

  let itemsIds = items
    .filter((item: any) => {
      if (item.dueDate) {
        let currDueDateMS = new Date(item.dueDate).setHours(0, 0, 0, 0);
        return (
          (item.completed == false || item.progress < 100) &&
          checkDueItem(currDueDateMS, currDateMS, time)
        );
      } else return false;
    })
    .map((item: any) => item.id);
  return {
    Count: itemsIds.length,
    Ids: itemsIds
  };
}
export function getTodayDueItems(items: any): CountAndIds {
  let currDate = new Date();
  currDate.setHours(0, 0, 0, 0);
  let itemsIds = items
    .filter((item: any) => {
      if (item.dueDate) {
        let currDueDate = new Date(item.dueDate);
        currDueDate.setHours(0, 0, 0, 0);
        return (
          (item.completed == false || item.progress < 100) &&
          currDueDate < currDate
        );
      } else return false;
    })
    .map((item: any) => item.id);
  return {
    Count: itemsIds.length,
    Ids: itemsIds
  };
}

export function checkDueItem(
  currDueDateMS: Number,
  currDateMS: Number,
  time: string
): boolean {
  if (time === "overdue") {
    return currDueDateMS < currDateMS;
  } else if (time === "today") {
    return currDueDateMS == currDateMS;
  }
  return false;
}
