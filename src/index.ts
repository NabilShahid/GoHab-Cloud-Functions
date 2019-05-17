import * as functions from 'firebase-functions';
// import  * as firebase from "firebase-admin";
import expressAppInstance from "./server";


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
// firebase.initializeApp();
// ({
//     apiKey: "AIzaSyAG_oZcI7E0ax-6J4LglvidCPrAqoJ7N4M",
//     authDomain: "test-project-1-ba9d5.firebaseapp.com",
//     databaseURL: "https://test-project-1-ba9d5.firebaseio.com",
//     projectId: "test-project-1-ba9d5",
//     storageBucket: "test-project-1-ba9d5.appspot.com",
//     messagingSenderId: "1077341965490"
// });


// let firestoreInstance=firebase.firestore();
// export const helloWorld = functions.https.onRequest((request, response) => {
 
 
//     return firestoreInstance.collection(`UsersInfo/nabil110176@gmail.com/Goals`).get().then(querySnapshot => {
       
//         const allGoals = querySnapshot.docs.map(function(doc) {
//           return { ...doc.data(), id: doc.id };
//         });
//         response.send(JSON.stringify(allGoals));
//       })
//       .catch(error => {
//         console.log("firebase error: ", error);
//         response.send(JSON.stringify("error"));
//       });
  
// });

export const api=functions.https.onRequest(expressAppInstance);
