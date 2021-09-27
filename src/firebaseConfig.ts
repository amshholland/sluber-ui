import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaQ0-JN1tYDLhtcMr8yiwlV1sJ1SZvp5c",
  authDomain: "sluber-2d4d3.firebaseapp.com",
  projectId: "sluber-2d4d3",
  storageBucket: "sluber-2d4d3.appspot.com",
  messagingSenderId: "554097181366",
  appId: "1:554097181366:web:2da68e6f1ce93ea1fc5c17"
};
firebase.initializeApp(firebaseConfig);

export const authProvider = new firebase.auth.GoogleAuthProvider();

export function signInWithGoogle(): void {
  firebase.auth().signInWithPopup(authProvider);
  console.log("start here")
}

export function signOut(): void {
  firebase.auth().signOut();
}

export default firebase;