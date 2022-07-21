import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  useIonAlert,
  isPlatform,

  useIonLoading,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Signup from "./pages/Signuppage";
import Login from "./pages/Loginpage";
// import Dashboard from "./pages/Dashboard";
import Tab from "./pages/Tab";
// import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import { App as app } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./pages/firebase.js";

setupIonicReact();

const App = () => {
  const [updateDetails, setUpdateDetails] = useState({});
  const [appVersion, setAppVersion] = useState("");
  const updateRef = doc(db, "Eatmore_app_config", "PoAv9WJnSiEcmZ0wcX98");
  const [show, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();

  const handleAlert = (msg, title, btn, appVersion) => {
    presentAlert({
      header: title,
      subHeader: `Version: ${appVersion}`,
      message: msg,
      buttons: [
        {
          text: btn,
          role: "Download",
          handler: async () => {
            show({
              message: "Please wait...",
              duration: 2000,
              spinner: "circular",
              cssClass: "lp-sp-spinner",
              animated: true,
              keyboardClose: true,
              mode: "ios",
            });

            await Browser.open({
              url: "https://play.google.com/store/apps/details?id=com.eatmore.aPP",
            });
            dismiss();
          },
        },
      ],
      backdropDismiss: true,
      translucent: true,
      animated: true,
    });
  };

  const getAppInfo = async () => {
    let info = await app.getInfo();
    return info;
  };

  const getConfigData = async () => {
    const docSnap = await getDoc(updateRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Document data:", docSnap.data());
      setUpdateDetails(data.updateMsg);
      setAppVersion(data.current);
    } else {
      console.log("No such document!");
    }
  };

  const checkUpdate = async () => {
    try {
      if (isPlatform("android")) {
        const currentAppInfo = getAppInfo();
        if (appVersion > (await currentAppInfo).version) {
          const msg = updateDetails.msg;
          const title = updateDetails.title;
          const btn = updateDetails.btn;
          handleAlert(msg, title, btn, appVersion);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    getConfigData();
    if (isPlatform("android")) {
      getAppInfo();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  checkUpdate();
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/signuppage">
            <Signup />
          </Route>
          <Route exact path="/loginpage">
            <Login />
          </Route>

          <Route path="/tab">
            <Tab />
          </Route>

          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
