import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDlXCOy3Pbvp7DuM3pSv6o3MY8-OBUwb4M",
    authDomain: "lynk-4298b.firebaseapp.com",
    projectId: "lynk-4298b",
    storageBucket: "lynk-4298b.appspot.com",
    messagingSenderId: "29511041935",
    appId: "1:29511041935:web:185400f9651b1778f841fa"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)