import firestoreInstance from "../firebase";
import { logException } from "../logger";
import { Collection } from "../interfaces";
export function getCollectionForUser(
  collection: string,
  userEmail: string
): Promise<Collection> {
  return new Promise((resolve: any, reject: any) => {
    firestoreInstance
      .collection(`UsersInfo/${userEmail}/${collection}`)
      .get()
      .then(querySnapshot => {
        const allItems = querySnapshot.docs.map(function(doc) {
          return { ...doc.data(), id: doc.id };
        });        
        resolve({Items:allItems,Collection:collection});
      })
      .catch(ex => {
        logException(ex, userEmail);
        reject(ex);
      });
  });
}
