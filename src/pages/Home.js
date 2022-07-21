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

const Home = () => {
 
  return (
    <IonPage>
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
              <IonLabel color="danger">Get started 21-07-2022 1:20pm </IonLabel>
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
