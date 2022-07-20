import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { useIonRouter } from "@ionic/react";

const firebaseConfig = {
  apiKey: "AIzaSyADZ2jRCwQ7kbTggX6UERCn9ihhULsZxgk",
  authDomain: "react-register-50890.firebaseapp.com",
  projectId: "react-register-50890",
  storageBucket: "react-register-50890.appspot.com",
  messagingSenderId: "608875526497",
  appId: "1:608875526497:web:ebc6bbfb8e59e0ae48ad20",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

export const db = firebase.firestore(firebaseApp);

export const ath = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();

export const SignInWithGoogle = () => {
  const router = useIonRouter();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .then(() => {
      router.push("/tab", "forward");
    })

    .catch((error) => {
      console.log(error);
    });
};

export { firebaseApp };
