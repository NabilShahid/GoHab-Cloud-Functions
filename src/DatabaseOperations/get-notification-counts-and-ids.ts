import { CollectionNames } from "./../constants";
import { getDueItems } from "../Methods/common-computation-methods";
// import { getPendingHabits } from "../Methods/habit.methods";
import { getCollectionForUser } from "../Methods/common-database-methods";
import { logException } from "../logger";
import { NotificationItem } from "../interfaces";
export function getNotificationCountsAndIDs(
  userEmail: string,
  items: string
): Promise<Array<NotificationItem>> {
  return new Promise((resolve, reject) => {
    Promise.all([
      getCollectionForUser(CollectionNames.Goals, userEmail,{key:"progress",operand:"<",value:100}),
      getCollectionForUser(CollectionNames.Tasks, userEmail,{key:"completed",operand:"==",value:false}),
      getCollectionForUser(CollectionNames.Habits, userEmail,{key:"completed",operand:"==",value:false})
    ])
      .then(function(values) {
        //overdue items
        let allNotificationItems: Array<NotificationItem> = values
          .reduce((prev: any, { Items, Collection }: any) => {
            if (
              Collection === CollectionNames.Goals ||
              Collection === CollectionNames.Tasks
            ) {
              if (
                items.indexOf(Collection.toLowerCase()) > -1 ||
                items.indexOf("all") > -1
              ) {
                prev.push(getDueItems(Items,Collection, "overdue"));
                prev.push(getDueItems(Items,Collection, "today"));
                prev.push(getDueItems(Items,Collection, "week"));
              }
            }
            else if(Collection==CollectionNames.Habits){
              // getPendingHabits(Items,Collection,"pending")
            }
            return prev;
          }, [])
          .filter((item: NotificationItem) => item.Info[0]);
        resolve(allNotificationItems);
      })
      .catch(ex => {
        logException(ex, userEmail);
        reject(ex);
      });
  });
}
