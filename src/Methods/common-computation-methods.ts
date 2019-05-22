import { CountAndIds } from "./../interfaces";
import * as moment from 'moment';
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

export function checkDueItem(
  currDueDateMS: number,
  currDateMS: number,
  time: string
): boolean {
  if (time === "overdue") {
    return currDueDateMS < currDateMS;
  } else if (time === "today") {
    return currDueDateMS == currDateMS;
  } else if (time === "week") {
    return moment(currDueDateMS).isoWeek()  === moment(currDateMS).isoWeek();
  }
  return false;
}
