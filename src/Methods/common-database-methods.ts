import firestoreInstance from "../firebase";
import { logException } from "../logger";
import { Collection, FirebaseCondition } from "../interfaces";
export function getCollectionForUser(
  collection: string,
  userEmail: string,
  condition: FirebaseCondition
): Promise<Collection> {
  return new Promise((resolve: any, reject: any) => {
    firestoreInstance
      .collection(`UsersInfo/${userEmail}/${collection}`)
      .where(condition.key, condition.operand, condition.value)
      .get()
      .then(querySnapshot => {
        const allItems = querySnapshot.docs.map(function(doc) {
          return { ...doc.data(), id: doc.id };
        });
        resolve({ Items: allItems, Collection: collection });
      })
      .catch(ex => {
        logException(ex, userEmail);
        reject(ex);
      });
  });
}
