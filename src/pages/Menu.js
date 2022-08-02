import {
  IonContent,
  useIonRouter,
  IonLabel,
  IonPage,
  IonGrid,
  IonRow,
  useIonToast,
  IonText,
  IonList,
  IonItem,
  IonToolbar,
  IonHeader,
  IonAvatar,
  IonImg,
} from "@ionic/react";

import { firebaseApp } from "./firebase";
import "./Menu.css";
import { useAuth } from "./firebase";

const Menu = () => {
  const [present] = useIonToast();
  const currentUser = useAuth();

  const handleToast = (err) => {
    present({
      message: err,
      position: "top",
      animated: true,
      duration: 2000,
      color: "light",
      model: "ios",
    });
  };
  let router = useIonRouter();
  // const signOutGoogle = async () => {
  //    await  GoogleAuth.signOut();
  //     router.push("/loginpage");

  // };

  const handlelogout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        router.push("/loginpage");
        window.location.reload();
      })
      .then(() => {
        handleToast("You have logout successfully");
      });
  };
  return (
    <IonPage>
      <IonToolbar className="menu-tb">
        <IonAvatar className="img-h">
          <IonImg src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"></IonImg>
        </IonAvatar>
        <IonHeader>
          <IonLabel className="menu-h">{currentUser?.email}</IonLabel>
        </IonHeader>
      </IonToolbar>
      <IonContent fullscreen className="menu-cont">
        <IonGrid className="menu-grid">
          <IonList className="menu-list">
            <IonItem button>
              <IonRow>
                <IonLabel>Settings</IonLabel>
              </IonRow>
            </IonItem>

            <IonItem button>
              <IonRow>
                <IonText>Categories</IonText>
              </IonRow>
            </IonItem>

            <IonItem button>
              <IonRow>
                <IonLabel> Your Orders</IonLabel>
              </IonRow>
            </IonItem>

            <IonItem button>
              <IonRow>
                <IonLabel
                  onClick={
                    // signOutGoogle();
                    handlelogout
                  }
                >
                  Logout
                </IonLabel>
              </IonRow>
            </IonItem>
          </IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Menu;
