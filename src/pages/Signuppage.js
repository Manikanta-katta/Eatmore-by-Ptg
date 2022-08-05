import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonImg,
  IonLabel,
  IonGrid,
  IonRow,
  useIonRouter,
  useIonAlert,
  useIonToast,
  useIonLoading,
} from "@ionic/react";

import "./Signuppage.css";

import { Link } from "react-router-dom";
import { firebaseApp } from "./firebase";
import { useState } from "react";
import { db } from "./firebase";
import logo from "../assets/images/Eatmorelogo.png";
import { alertOutline } from "ionicons/icons";
import emailjs from '@emailjs/browser';


const Signup = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");

  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();
  const [presant, dismiss] = useIonLoading();

  let router = useIonRouter();

  const clearinputs = () => {
    setEmail("");
    setPassword("");
    setconfirmPassword("");
  };

  const handleAlert = (err) => {
    presentAlert({
      header: "Alert",
      message: err,
      buttons: ["OK"],
      backdropDismiss: true,
      transculent: true,
      animated: true,
      cssClass: "lp-tp-alert",
    });
  };

  const handleToast = (err) => {
    present({
      message: err,
      position: "top",
      animated: true,
      duration: 2000,
      color: "light",
      model: "ios",
      icon: alertOutline,
    });
  };
  var templateParams = {
    email:email,
    name:username,
    
  }
  const sendEmail = () =>{
    emailjs.send("service_nnqe814","template_7858nqa",templateParams,"AecK30ifXvhbkWl0y")
    .then((result)=>{
      console.log(result.text);
    },(error)=>{
      console.log(error.text);
    }
    )
  }
  const handleSignup = () => {
    // clearErrors();
    clearinputs();
   
    sendEmail();
    if (email == null || email === "") {
      const msg = "please enter your email";
      handleToast(msg);
    } else if (password == null || password === "") {
      const msg = "please enter your password";
      handleToast(msg);
    } else if (password === confirmpassword) {
      presant({
        message: "Loading",
        duration: 2000,
      });
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password, confirmpassword)
        .then((credentials) => {
          console.log(credentials);
          db.collection("Users").doc(credentials.user.uid).set({
            Email: email,
            password: password,
            confirmpassword: confirmpassword,
          });
        })

        .then(() => {
          dismiss();
          router.push("/loginpage");
        })
        .then(() => {
          handleToast(" You have Registered successfully");
        })
        .catch((err) => {
          switch (err.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              dismiss();
              handleAlert(err);
              break;
            case "auth/weak-password":
              dismiss();
              handleAlert(err);
              break;
            default:
              break;
          }
        });
    } else {
      //dismiss();
      handleAlert("password as didn't matched");
    }
  };
  return (
    <IonPage>
      <IonContent className="sign-cont">
        <IonGrid className="ga-mg">
          <IonRow className="logo-ro">
            <IonImg className="home-last1" src={logo} alt=" "></IonImg>
          </IonRow>
          <IonRow className="card-row">
            <IonLabel className="signtxt">SignUp</IonLabel>
          </IonRow>
          <IonRow className="inputs">
          <IonInput
              className="input0"
              placeholder="Enter your username"
              value={username}
              onIonChange={(e) => setusername(e.detail.value)}
            ></IonInput>
            <IonInput
              className="input1"
              placeholder="Enter your email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value)}
            ></IonInput>
            <IonInput
              className="input2"
              placeholder="Create your password"
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value)}
            ></IonInput>
            <IonInput
              className="input3"
              placeholder="Confirm your password"
              value={confirmpassword}
              type="password"
              onIonChange={(e) => setconfirmPassword(e.detail.value)}
            ></IonInput>
          </IonRow>

          <IonRow className="card-row">
            <IonButton
              onClick={handleSignup}
              color="danger"
              shape="round"
              className="Signupbtn"
            >
              <IonLabel>Signup</IonLabel>
            </IonButton>
          </IonRow>
          <IonRow className="card-row">
            <IonLabel className="or">OR</IonLabel>
          </IonRow>
          <IonRow className="text-row">
            <IonLabel className="text">Already have any account ? </IonLabel>
            <Link onClick={clearinputs} to="/loginpage" className="txt">
              Login
            </Link>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
