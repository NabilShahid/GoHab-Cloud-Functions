import { COLLECTION_NAMES } from "./../constants";
import { NotificationItems } from "./../interfaces";
import { getDueItems } from "../Methods/common-computation-methods";
import { getCollectionForUser } from "../Methods/common-database-methods";
import { logException } from "../logger";
export function getNotificationCountsAndIDs(
  userEmail: string
): Promise<NotificationItems> {
  return new Promise((resolve, reject) => {
    Promise.all([
      getCollectionForUser(COLLECTION_NAMES.Goals, userEmail),
      getCollectionForUser(COLLECTION_NAMES.Tasks, userEmail)
    ])
      .then(function(values) {
        //overdue items
        let allNotificationItems:NotificationItems={
          OverdueItems:{},
          WeekItems:{},
          TodayItems:{},
          HabitItems:{}
        };
        const overdueItems = values.reduce(
          (prev: any, { Items, Collection }: any) => {
            if(Collection===COLLECTION_NAMES.Goals||Collection===COLLECTION_NAMES.Tasks){
              prev.OverdueItems[Collection] = getDueItems(Items,"overdue");
              prev.TodayItems[Collection] = getDueItems(Items,"today");
            }
            return prev;
          },
          allNotificationItems
        );
        resolve(overdueItems);
      })
      .catch(ex => {
        logException(ex, userEmail);
        reject(ex);
      });
  });
}
