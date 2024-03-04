import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { config } from "./firebase-config";

const firebaseApp = initializeApp(config);
const storage = getStorage(firebaseApp);

export const auth = getAuth(firebaseApp);

const fBAnalytics = getAnalytics(firebaseApp);

export const analytics = fBAnalytics;

export const rtdb = getDatabase(
    firebaseApp,
    import.meta.env.VITE_FIREBASE_DATABASE_URL
);

export { storage };