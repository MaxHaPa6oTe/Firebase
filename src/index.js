import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAws4Rv9OvGQnRB0GLG9UtEXJArjc2HZH0",
  authDomain: "fir-32f51.firebaseapp.com",
  projectId: "fir-32f51",
  storageBucket: "fir-32f51.appspot.com",
  messagingSenderId: "303490242727",
  appId: "1:303490242727:web:10bd47c80f78b173cb6382",
  measurementId: "G-RTK8S87P23"
});

export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Context.Provider value={{
    firebase,
    auth,
    firestore
  }}>
    <App />
  </Context.Provider>
  </React.StrictMode>
);

