import { initializeApp, getApp, getApps } from "firebase/app";  // Update import statement
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";  // Import Firebase Storage
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDGptxNFEVgyc6yhkwGNyzvpZaCDcR8qgA",
  authDomain: "notelister-bf54e.firebaseapp.com",
  projectId: "notelister-bf54e",
  storageBucket: "notelister-bf54e.appspot.com",
  messagingSenderId: "447312630484",
  appId: "1:447312630484:web:91652f74f9186fec30a141",
  measurementId: "G-5HT7CW5480"
};

// Check if Firebase has already been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Storage
const storage = getStorage(app);

// Initialize Analytics (only if it's in the browser)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Export necessary Firebase services
export { db, auth, storage, firebaseConfig };
