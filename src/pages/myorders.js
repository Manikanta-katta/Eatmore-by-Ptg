import {
    IonButton,
    IonContent,
    IonPage,
    IonImg,
    IonLabel,
    IonGrid,
    IonRow,
  } from "@ionic/react";
  
  import "./Home.css";
  import img from "../assets/images/logo (2).png";
  import { useState, useEffect } from "react";
  const Myorders = () => {
    // const [showLoading, setShowLoading] = useState(false);
    return (

        <IonContent fullscreen color="danger">
          <IonGrid>
            <IonRow className="image">
              <IonImg src={img} alt=" "></IonImg>
            </IonRow>
            <IonRow className="getstartbtn">
              <IonButton
                shape="round"
                color="col"
                className="cont"
                routerLink="/signuppage"
              >
                <IonLabel color="danger">Get started</IonLabel>
              </IonButton>
            </IonRow>
          </IonGrid>
        </IonContent>
     
    );
  };
  
  export default Myorders;