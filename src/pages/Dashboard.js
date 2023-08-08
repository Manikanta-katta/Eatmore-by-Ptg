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
  useIonToast,
  useIonRouter,

} from "@ionic/react";

import { useState, useEffect } from "react";
import { menu, heartOutline } from "ionicons/icons";
import "./Dashboard.css";
import logo from "../assets/images/Eatmorelogo.png";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { collection, getDocs, addDoc, } from "firebase/firestore";
import { auth, db } from "./firebase";



const Dashboard = () => {
  
 const router = useIonRouter();
  const [product, setproduct] = useState([]);
  
  const [present] = useIonToast();

  const [sdata] = useState([]);


  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const msg = "  Your Item as successfully added to cart";
  const msg1 = "Item as added in your favaurite list ";

  const [userId, setUserId] = useState();
  auth.onAuthStateChanged((user) => {
    setUserId(user.uid);
  });
  const hideTabs = () => {
    const tabsEl = document.querySelector("ion-tab-bar");

    if (tabsEl) {
      tabsEl.hidden = false;
    }
  };
  useIonViewWillEnter(() => hideTabs());
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
  // adding to favourite list
  const addProduct = (Restaurant, name, image, price) => {
    const addtocartref = collection(db, "Users", userId, "Favourites");
    addDoc(addtocartref, {
      Restaurant: Restaurant,
      name: name,
      image: image,
      price: price,
    });
 
    handleToast(msg1);
  };

  // adding addtocart

  const addtoCart = (Restaurant, name, image, price,cart) => {
    const addtocartref = collection(db, "Users", userId, "Addtocartproducts");
    addDoc(addtocartref, {
      Restaurant: Restaurant,
      name: name,
      image: image,
      price: price,
     
    });
  

    handleToast(msg);
  };

  const pushData = () => {
    // const max = sdata.length + 5;
    // const min = max - 5;
    // const newData = [];

    // if (sdata.length === 7) {
    //   setInfiniteDisabled(true);
    // } else {
    //   for (let i = min; i < max; i++) {
    //     product[i].id = product[i].id + i * i;
    //     newData.push(product[i]);
    //   }

    //   setData([...sdata, ...newData]);
    // }
  };
  const loadingData = (ev) => {
    console.log(sdata.length);
    setTimeout(() => {
      pushData();
      console.log("Loaded data");
      ev.target.complete();
      if (sdata.length === 5) {
        setInfiniteDisabled(sdata.length < 5);
      }
    }, 5000);
  };
  useIonViewWillEnter(() => {
    pushData();
  });


  // getting products in to dashboard
  const productRef = collection(db, "App_products");
  useEffect(() => {
    
    getDocs(productRef)
      .then((snapshot) => {
        let products = [];
        snapshot.docs.forEach((doc) => {
          products.push({ ...doc.data(), id: doc.id });
        });
        console.log(products);
        setproduct(products);
        console.table(products);
      })
      .catch((err) => {
        console.log(err.message);
      });


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {product.map((Data) => {
            return (
              <IonRow key={Data.id}>
                <IonCol className="data">
                  <IonCard
                    button
                    onClick={() => {
                      router.push(`Dashboard/${Data.id}`);
                      window.location.reload();
                    }}
                    className="cardcolor"
                  >
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
                      <IonText className="res-name">{Data.Restaurant}</IonText>
                      <IonButton
                        fill="clear"
                        color="danger"
                        onClick={() => {
                          addProduct(
                            Data.Restaurant,
                            Data.name,
                            Data.image,
                            Data.price
                          );
                        }}
                      >
                        <IonIcon
                          className="icon-fav"
                          icon={heartOutline}
                        ></IonIcon>
                      </IonButton>
                    </IonRow>
                    <IonRow>
                      <IonText className="dish-name">{Data.name}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonText className="price"> Price :{Data.price}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonButton
                        color="danger"
                        onClick={() => {
                          addtoCart(
                            Data.Restaurant,
                            Data.name,
                            Data.image,
                            Data.price
                          );
                        }}
                      >
                        addtocart
                      </IonButton>
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
