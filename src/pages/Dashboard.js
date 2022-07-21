import {
  IonButton,
  IonCard,
  IonContent,
  IonIcon,
  IonImg,
  IonPage,
  IonSearchbar,
  IonText,
  IonGrid,
  IonRow,
  IonCol,

  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonViewWillEnter,
  IonToolbar,
} from "@ionic/react";
import { data } from "./data";
import { useState } from "react";
import { menu } from "ionicons/icons";
import "./Dashboard.css";
import logo from "../assets/images/Eatmorelogo.png";

import { LazyLoadImage } from "react-lazy-load-image-component";

const Dashboard = () => {
  //let router = useIonRouter();
  const [sdata, setData] = useState([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const hideTabs = () => {
    const tabsEl = document.querySelector("ion-tab-bar");

    if (tabsEl) {
      tabsEl.hidden = false;
    }
  };
  useIonViewWillEnter(() => hideTabs());

  const pushData = () => {
    const max = sdata.length + 10;
    const min = max - 10;
    const newData = [];

    if (sdata.length === 30) {
      setInfiniteDisabled(true);
    } else {
      for (let i = min; i < max; i++) {
        data[i].id = data[i].id + i * i;
        newData.push(data[i]);
      }

      setData([...sdata, ...newData]);
    }
  };
  const loadingData = (ev) => {
    console.log(sdata.length);
    setTimeout(() => {
      pushData();
      console.log("Loaded data");
      ev.target.complete();
      if (sdata.length === 10) {
        setInfiniteDisabled(sdata.length < 10);
      }
    }, 5000);
  };
  useIonViewWillEnter(() => {
    pushData();
  });
  return (
    <IonPage>
      <IonToolbar className="tool-bar">
        <IonGrid>
          <IonRow className="dashboard-row">
            <IonCol className="logo-col">
              <IonImg className="home-logo" src={logo} alt=" "></IonImg>
            </IonCol>
            <IonCol className="col-men">
              <IonButton
                fill="clear"
                routerLink="/menu"
                className="menu-button"
              >
                <IonIcon className="icon-l" icon={menu} />
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonSearchbar
              className="Search"
              placeholder="Search"
            ></IonSearchbar>
          </IonRow>
          <IonRow>
            <IonText className="categoriestxt">Categories</IonText>
          </IonRow>
        </IonGrid>
      </IonToolbar>

      <IonContent fullscreen className="dash-cont">
        <IonGrid className="dash-grid">
          {sdata.map((Data) => {
            return (
              <IonRow key={Data.id}>
                <IonCol className="data">
                  <IonCard>
                    <LazyLoadImage
                      effect="opacity"
                      src={Data.image}
                      className="image_s"
                    />
                  </IonCard>
                </IonCol>
                <IonCol className="col-text">
                  <IonGrid>
                    <IonRow>
                      <IonText className="res-name">
                        {Data.restaurantname}
                      </IonText>
                    </IonRow>
                    <IonRow>
                      <IonText className="dish-name">{Data.name}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonText className="price"> Price :{Data.price}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonButton color="danger">Order</IonButton>
                    </IonRow>
                  </IonGrid>
                </IonCol>
              </IonRow>
            );
          })}
          <IonInfiniteScroll
            onIonInfinite={loadingData}
            threshold="100px"
            disabled={isInfiniteDisabled}
          >
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Loading more data..."
            ></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
