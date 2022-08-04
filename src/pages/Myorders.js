import {
    IonPage,
    IonSearchbar,
    IonToolbar,
    IonContent,
    IonGrid,
    IonRow,
    IonText,
    IonCol,
    IonButton,
    IonCard,
    IonIcon,
    useIonRouter,
 
    IonLabel,
  } from "@ionic/react";
  import {
    collection,
   
    onSnapshot,
   
  } from "firebase/firestore";
  import { db, auth } from "./firebase";
  import { useState, useEffect } from "react";
  import { LazyLoadImage } from "react-lazy-load-image-component";
  import { trashOutline } from "ionicons/icons";
  import "./Cartdetails.css";
  import {  arrowBack  } from "ionicons/icons";
 
  import "./Myorder.css";
  const MyOrders = () => {
    const router = useIonRouter();
    const [order, setproduct] = useState([]);
  
    const orders = () => {
      const orderRef = collection(db, "Users", auth.currentUser.uid, "Orders");
      onSnapshot(orderRef, (snapshot) => {
        let products = [];
        snapshot.docs.forEach((doc) => {
          products.push({ ...doc.data(), id: doc.id });
        });
  
        setproduct(products);
      });
  
      //   const querySnapshot = getDocs(collection(db,"Users",auth.currentUser.uid,"Orders"));
      //    querySnapshot.forEach((doc)=>{
      //     console.log(doc.id,"=>", doc.data());
      //    });
    };
  
    useEffect(() => {
      orders();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return (
      <IonPage>
        <IonToolbar className="cart-toolbar">
          
          <IonGrid>
            <IonRow>
            <IonButton color="dark"
                fill="clear"
                onClick={() => {
                  router.push("/tab/Dashboard");
                }}
              >
                <IonIcon icon={arrowBack}></IonIcon>
              </IonButton>
            <IonSearchbar className="search" placeholder="Search"></IonSearchbar>
            </IonRow>
         
            <IonRow>
              <IonText className="Cartproducttxt">MyOrders</IonText>
            </IonRow>
          </IonGrid>
        </IonToolbar>
  
        <IonContent className="cart-content">
          <IonGrid className="dash-grid">
            {order.map((data) => {
              return (
                <IonRow key={data.id}>
                  <IonCard>
                  
                  {data.product.map((Data) => {
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
                              <IonText className="res-names">{Data.Restaurant}</IonText>
                            </IonRow>
                            <IonRow>
                              <IonText className="dis-name">{Data.name}</IonText>
                            </IonRow>
                            <IonRow>
                              <IonCol>
                                <IonText className="price">
                                  {" "}
                                  Price :{Data.price}
                                </IonText>
                              </IonCol>
                            </IonRow>
                            <IonRow>
                              {/* <IonButton color="danger" href="/tab/paymentpage">
                            Order
                          </IonButton> */}
                            </IonRow>
                            <IonRow className="del-row">
                              <IonButton fill="clear">
                                {" "}
                                <IonIcon icon={trashOutline}></IonIcon>
                              </IonButton>
                            </IonRow>
                          </IonGrid>
                        </IonCol>
                      </IonRow>
                    );
                  })}
                <IonGrid>
                  <IonRow> <IonLabel className="order-time">ordered on: {data.createdAt.toDate().toUTCString()}</IonLabel></IonRow>
                  </IonGrid>
                 <IonRow><IonLabel className="order-price">Ordered price:₹{data.Totalprice}</IonLabel></IonRow>
                  
                  </IonCard>
                </IonRow>
              );
            })}
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  };
  export default MyOrders;