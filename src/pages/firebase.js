import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { } from "firebase/compat/firestore";

import { getAuth, } from "firebase/auth";
import {useState,useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';


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

// const provider = new GoogleAuthProvider();
// const router = useIonRouter();
// export const SignInWithGoogle = () => {

//   signInWithPopup(auth, provider)
//     .then((result) => {
//       console.log(result);
//     })
//     .then(() => {
//       router.push("/tab", "forward");
//     })

//     .catch((error) => {
//       console.log(error);
//     });
// };
export function useAuth(){
  const [currentUser,setcurrentUser] = useState();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth,(user) => setcurrentUser(user))
    return unsub
  },[]);
  return currentUser;
}
export { firebaseApp };
