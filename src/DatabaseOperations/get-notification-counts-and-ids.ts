import { COLLECTION_NAMES } from "./../constants";
// import { CountAndIds } from "./../interfaces";
import { getOverdueItems } from "../Methods/common-computation-methods";
import { getCollectionForUser } from "../Methods/common-database-methods";
import { logException } from "../logger";
// import { logException } from '../logger';
export function getNotificationCountsAndIDs(
  userEmail: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    Promise.all([
      getCollectionForUser(COLLECTION_NAMES.Goals, userEmail),
      getCollectionForUser(COLLECTION_NAMES.Tasks, userEmail),
      // getCollectionForUser(COLLECTION_NAMES.Goals, userEmail)
    ])
      .then(function(values) {
        const itemCounts = values.reduce(
          (prev: any, {Items,Collection}: any, index: Number) => {
            prev.push(getOverdueItems(Items, Collection));
            return prev;
          },
          []
        );
        resolve(JSON.stringify(itemCounts));
      })
      .catch(ex => {
        logException(ex, userEmail);
        reject(ex);
      });
  });

  //   getCollectionForUser(COLLECTION_NAMES.Goals, userEmail);
  //   const countsAndIds = getOverdueItems(items, COLLECTION_NAMES.Goals);
  //   return [{ Count: 1, Ids: [] }];
}
