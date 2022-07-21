import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonImg,
  IonLabel,
  useIonRouter,
  IonGrid,
  IonRow,
  useIonAlert,
  useIonToast,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";

import "./Logipage.css";
//import { SignInWithGoogle } from "./firebase";
import { Link } from "react-router-dom";
import { firebaseApp } from "./firebase";
import { useState, useEffect } from "react";
import img1 from "../assets/images/Google.png";

//import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
//import { isPlatform } from "@ionic/react";
import logo from "../assets/images/Eatmorelogo.png";
import { alertOutline } from "ionicons/icons";

const Login = () => {
  const [ setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();
  const [presant, dismiss] = useIonLoading();


  let router = useIonRouter();

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const hideTabs = () => {
    const tabsEl = document.querySelector("ion-tab-bar");

    if (tabsEl) {
      tabsEl.hidden = true;
    }
  };

  useIonViewWillEnter(() => hideTabs());

  const authlistener = () => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };
  useEffect(() => {
    authlistener();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleAlert = (err) => {
    presentAlert({
      header: "Alert",
      message: err,
      buttons: ["OK"],
      backdropDismiss: true,
      transculent: true,
      animated: true,
     
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

  // const signInGoogle = async () => {
  //   GoogleAuth.initialize();
  //   const result = await GoogleAuth.signIn();
  //   console.log(result);
  //   if (result) {
  //     router.push("/tab", "forward");

  //     console.log(result);
  //   }
  // };
  // const googleLogin = () => {
  //   if (isPlatform("android")) {
  //     signInGoogle();
  //   } else {
  //     // SignInWithGoogle();
  //   }
  // };
  const handlelogin = () => {
    clearInputs();
    if (email == null || email === "") {
      const msg = "please enter your email";
      handleToast(msg);
    } else if (password == null || password === "") {
      const msg = "please enter your password";
      handleToast(msg);
    } else {
      presant({
        message: "Loading",
        duration: 2000,
      });
      firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          dismiss();
          router.push("/tab", "forward");
        })
        .then(() => {
          handleToast(" You have login successfully");
        })

        .catch((err) => {
          switch (err.code) {
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
              dismiss();
              handleAlert(err);

              break;

            case "auth/wrong-password":
              dismiss();
              handleAlert(err);

              break;
              default:
                break;
          }
        });
      dismiss();
    }
  };

  return (
    <IonPage>
      <IonContent className="ta-ta">
        <IonGrid className="log-grid">
          <IonRow className="logo-ro">
            <IonImg className="home-last1" src={logo} alt=" "></IonImg>
          </IonRow>
          <IonRow className="loginhead-row">
            <IonLabel className="logintxt">Login</IonLabel>
          </IonRow>
          <IonRow className="row-input">
            <IonInput
              className="row-input-1"
              placeholder="Enter your email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value)}
            ></IonInput>
            <IonInput
              className="row-input-2"
              type="password"
              placeholder="Enter your password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value)}
            ></IonInput>
          </IonRow>
          <IonRow className="login-row">
            <IonButton
              className="login-btn"
              onClick={handlelogin}
              color="danger"
              shape="round"
            >
              Login
            </IonButton>
          </IonRow>
          <IonRow className="or-text">
            <IonLabel className="OR">OR</IonLabel>
          </IonRow>
          <IonRow className="line-text">
            <IonLabel className="tagline-txt">
              Don't have an Account ?{" "}
            </IonLabel>
            <Link onClick={clearInputs} className="link-lo" to="/signuppage">
              SignUp
            </Link>
          </IonRow>
          <IonRow className="gfauth-row">
            <IonButton
              // onClick={(e) => {
              //   googleLogin();
              // }}
              fill="clear"
            >
              <IonImg className="image1" src={img1} alt=" "></IonImg>
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
