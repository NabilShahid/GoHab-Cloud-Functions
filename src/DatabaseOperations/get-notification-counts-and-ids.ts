import { COLLECTION_NAMES } from "./../constants";
// import { CountAndIds } from "./../interfaces";
// import { getOverdueItems } from "../Methods/common-computation-methods";
import { getCollectionForUser } from "../Methods/common-database-methods";
// import { logException } from '../logger';
export function getNotificationCountsAndIDs(userEmail: string): any {
  return new Promise((resolve, reject) => {
    Promise.all([
      getCollectionForUser(COLLECTION_NAMES.Goals, userEmail),
      getCollectionForUser(COLLECTION_NAMES.Tasks, userEmail),
      getCollectionForUser(COLLECTION_NAMES.Goals, userEmail)
    ]).then(function(values) {
      resolve(JSON.stringify(values));
    });
  });

  //   getCollectionForUser(COLLECTION_NAMES.Goals, userEmail);
  //   const countsAndIds = getOverdueItems(items, COLLECTION_NAMES.Goals);
  //   return [{ Count: 1, Ids: [] }];
}
