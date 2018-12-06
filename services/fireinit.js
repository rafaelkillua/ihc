import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

import firebaseConfig from "./firebaseConfig.json";

if (firebase.apps.length < 1)
    firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.database();
export const storage = firebase.storage();
export default firebase;
