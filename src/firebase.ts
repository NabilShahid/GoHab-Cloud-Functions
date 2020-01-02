import * as firebase from "firebase-admin";
import PROJECTSA from "./projectsa"; 
// import { Firestore } from "@google-cloud/firestore";
firebase.initializeApp(
  {
  credential: firebase.credential.cert(PROJECTSA as any),
  databaseURL: "https://gohab-prod.firebaseio.com"
}
);
let firestoreInstance = firebase.firestore();
export default firestoreInstance;
