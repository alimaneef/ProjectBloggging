import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBpw9QggKhU1JPO-D9-7AMQo_kizF6OOEk",
    authDomain: "reactjs-blogging-website-7fa23.firebaseapp.com",
    projectId: "reactjs-blogging-website-7fa23",
    storageBucket: "reactjs-blogging-website-7fa23.appspot.com",
    messagingSenderId: "951397840868",
    appId: "1:951397840868:web:e5859d887922a2378139f1"
};

const app = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();
const auth = getAuth();

export const authWithGoogle = async () => {
    let user = null;
    await signInWithPopup(auth, provider)
        .then((result) => {
            user = result.user
        })
        .catch((err) => {
            console.log(err)
        })

    return user
}