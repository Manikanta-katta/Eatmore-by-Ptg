import {
  IonButton,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  useIonRouter,
  IonToolbar,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import success from "../assets/images/successicon.png";
import "./payment.css";
const Payment = () => {
  const router = useIonRouter();

  return (
    <IonPage className="page">
      <IonToolbar className="pay-tool">
        <IonButton
          color="dark"
          fill="clear"
          onClick={() => {
            router.push("/tab/Dashboard");
            window.location.reload()
          }}
        >
          <IonIcon className="back-icon" icon={arrowBack}></IonIcon>
        </IonButton>
      </IonToolbar>
      <IonContent className="pay-cont">
        <IonGrid className="pay-grid">
          <IonRow className="text">
            <IonLabel color="success">
              Your payment has successfully completed !
            </IonLabel>
          </IonRow>
          <IonRow className="img">
            <IonImg src={success} className="checkmark"></IonImg>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Payment;
