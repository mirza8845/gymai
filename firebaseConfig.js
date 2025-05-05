import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDc8cIKZstbvesnz7VM48a3qwgqIMkxYWk',
  authDomain: 'loginauth-aebd1.firebaseapp.com',
  projectId: 'loginauth-aebd1',
  storageBucket: 'loginauth-aebd1.appspot.com',
  messagingSenderId: '1024530144901',
  appId: '1:1024530144901:android:7c40973c0b277e44fd13ec',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
