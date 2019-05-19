import * as firebase from "firebase-admin";
import PROJECTSA from "./projectsa"; 
// import { Firestore } from "@google-cloud/firestore";
firebase.initializeApp(
  {
  credential: firebase.credential.cert(PROJECTSA as any),
  databaseURL: "https://test-project-1-ba9d5.firebaseio.com"
}
);
console.log("Firebase Initialization");
let firestoreInstance = firebase.firestore();
export default firestoreInstance;
