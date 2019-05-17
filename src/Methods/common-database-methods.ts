import firestoreInstance from "../firebase";
import {logException} from "../logger";
export function getCollectionForUser(
  collection: string,
  userEmail: string
): Promise<Object> {
  return new Promise((resolve: any, reject: any) => {
    firestoreInstance
      .collection(`UsersInfo/${userEmail}/${collection}`)
      .get()
      .then(querySnapshot => {
        const allItems = querySnapshot.docs.map(function(doc) {
          return { ...doc.data(), id: doc.id };
        });
        resolve(allItems);
      })
      .catch(ex=>{
          logException(ex,userEmail);
      });
  });
}
