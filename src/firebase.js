// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA4oaCvomqRh5uGDvdJPkrrrkjGlqzQX8",
  authDomain: "management-system-863a7.firebaseapp.com",
  projectId: "management-system-863a7",
  storageBucket: "management-system-863a7.firebasestorage.app",
  messagingSenderId: "958768837662",
  appId: "1:958768837662:web:2dc032f782510b76382a0f",
  measurementId: "G-CWG2762B93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
