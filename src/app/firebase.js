import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBnBV_QeujzGp-fVjS0zrcf3onrwetDXd4",
    authDomain: "assessment-44d3a.firebaseapp.com",
    databaseURL: "https://assessment-44d3a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "assessment-44d3a",
    storageBucket: "assessment-44d3a.firebasestorage.app",
    messagingSenderId: "292644312177",
    appId: "1:292644312177:web:67163b51f3c89ce64277d0",
    measurementId: "G-VYD4CPJ53E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getDatabase(app);