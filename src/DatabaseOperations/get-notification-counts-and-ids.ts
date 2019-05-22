import { COLLECTION_NAMES } from "./../constants";
import { NotificationItems } from "./../interfaces";
import { getDueItems } from "../Methods/common-computation-methods";
import { getCollectionForUser } from "../Methods/common-database-methods";
import { logException } from "../logger";
export function getNotificationCountsAndIDs(
  userEmail: string,
  items: string
): Promise<NotificationItems> {
  return new Promise((resolve, reject) => {
    Promise.all([
      getCollectionForUser(COLLECTION_NAMES.Goals, userEmail),
      getCollectionForUser(COLLECTION_NAMES.Tasks, userEmail)
    ])
      .then(function(values) {
        //overdue items
        let allNotificationItems: NotificationItems = {
          OverdueItems: {},
          WeekItems: {},
          TodayItems: {},
          HabitItems: {}
        };
        const overdueItems = values.reduce(
          (prev: any, { Items, Collection }: any) => {
            if (
              Collection === COLLECTION_NAMES.Goals ||
              Collection === COLLECTION_NAMES.Tasks
            ) {
              if (
                items.indexOf(Collection.toLowerCase()) > -1 ||
                items.indexOf("all") > -1
              ) {
                prev.OverdueItems[Collection] = getDueItems(Items, "overdue");
                prev.TodayItems[Collection] = getDueItems(Items, "today");
                prev.WeekItems[Collection] = getDueItems(Items, "week");
              }
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
