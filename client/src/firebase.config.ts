import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCynupE7nLIeMIoshDJh4RjqeiAQpeTzpI",
  authDomain: "meetgaze.firebaseapp.com",
  projectId: "meetgaze",
  storageBucket: "meetgaze.appspot.com",
  messagingSenderId: "834991005525",
  appId: "1:834991005525:web:46978b2515db80055d99dc",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
