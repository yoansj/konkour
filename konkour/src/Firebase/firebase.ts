import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

/**
 * A .env file contains all the keys used with Firebase
 */

const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DB,
    projectId: process.env.REACT_APP_PID,
    storageBucket: process.env.REACT_APP_SB,
    messagingSenderId: process.env.REACT_APP_SID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MID
};

firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();

firebase.auth().onAuthStateChanged(function(user) {
    if (user)
        window.localStorage.setItem(process.env.REACT_APP_AUTH ? process.env.REACT_APP_AUTH : "XXX", JSON.stringify(user));
    else
        window.localStorage.removeItem(process.env.REACT_APP_AUTH ? process.env.REACT_APP_AUTH : "XXX");
});