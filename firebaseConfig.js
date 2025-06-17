import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCu_IuLy7LFahrNLOaV9K7bEUmI5oIg6w8",
  authDomain: "gymai-e5a14.firebaseapp.com",
  projectId: "gymai-e5a14",
  storageBucket: "gymai-e5a14.firebasestorage.app",
  messagingSenderId: "148417258727",
  appId: "1:148417258727:web:5c93e2fe194a6770e46e42",
  measurementId: "G-P7VECLE27V",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
