import {
    IonBackButton,
     IonButton,
   IonCard,
   IonCol,
   IonContent,
   IonGrid,
   IonHeader,
   IonIcon ,
   IonImg,
   IonLabel,
   IonPage,
   IonRow,
  useIonRouter,
   IonToolbar,
   useIonToast,
 } from "@ionic/react";
 import { alertCircle, arrowBack, heart } from "ionicons/icons";
 import success from "../assets/images/successicon.png";
 import "./payment.css";
 const Payment = () =>{
    const router = useIonRouter();


    return(
        <IonPage className="page">
              <IonToolbar>
    <IonButton color="dark"
                fill="clear" 
                onClick={() => {
                  router.push("/tab/Dashboard");
                }}
              >
                <IonIcon className="back-icon" icon={arrowBack}></IonIcon>
              </IonButton>
    </IonToolbar>
            <IonContent  >
                <IonGrid className="pay-grid" >
                <IonRow className="text">
                    <IonLabel color="success">Your payment has  successfully completed !</IonLabel>
                </IonRow>
                <IonRow className="img">
                    <IonImg  src={success} className="checkmark"></IonImg>
                </IonRow>
                
                    </IonGrid>
            </IonContent>
        </IonPage>
    )
 }
 export default Payment;