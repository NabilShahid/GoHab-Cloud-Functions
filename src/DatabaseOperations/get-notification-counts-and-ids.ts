import { COLLECTION_NAMES } from "./../constants";
import { CountAndIds } from "./../interfaces";
import { getOverdueItems } from "../Methods/common-computation-methods";
import { getCollectionForUser } from "../Methods/common-database-methods";
import { logException } from "../logger";
export function getNotificationCountsAndIDs(
  userEmail: string
): Promise<CountAndIds[]> {
  return new Promise((resolve, reject) => {
    Promise.all([
      getCollectionForUser(COLLECTION_NAMES.Goals, userEmail),
      getCollectionForUser(COLLECTION_NAMES.Tasks, userEmail)
    ])
      .then(function(values) {
        const itemCounts = values.reduce(
          (prev: any, { Items, Collection }: any) => {
            prev[Collection] = getOverdueItems(Items);
            return prev;
          },
          {}
        );
        resolve(itemCounts);
      })
      .catch(ex => {
        logException(ex, userEmail);
        reject(ex);
      });
  });
}
