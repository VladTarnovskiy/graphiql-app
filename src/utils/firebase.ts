import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCSSORVWJF1r0PaAK7jzi02w2QPKzgCBHk',
  authDomain: 'react-graphiql-app.firebaseapp.com',
  projectId: 'react-graphiql-app',
  storageBucket: 'react-graphiql-app.appspot.com',
  messagingSenderId: '326693732870',
  appId: '1:326693732870:web:f358d775bcd98b8ce3b987',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const registerNewUser = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};
const loginUser = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

const logout = async () => {
  signOut(auth);
};
export { registerNewUser, loginUser, logout, auth };
