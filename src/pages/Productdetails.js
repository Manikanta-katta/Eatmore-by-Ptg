import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonRow,
  useIonRouter,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { doc, onSnapshot, addDoc, collection } from "firebase/firestore";
import { useParams } from "react-router";
import { db, auth } from "./firebase";
import { arrowBack } from "ionicons/icons";
import "./Productdetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [detail, setDetails] = useState({
    title: "",
    image: "",
    price: 1,
  });
  const router = useIonRouter();

  const [userId, setUserId] = useState();
  const [present] = useIonToast();

  const msg = "  Your Item as successfully added to cart";
  auth.onAuthStateChanged((user) => {
    setUserId(user.uid);
  });
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

  const addtoCart = (Restaurant, name, image, price) => {
    const addtocartref = collection(db, "Users", userId, "Addtocartproducts");
    addDoc(addtocartref, {
      Restaurant: Restaurant,
      name: name,
      image: image,
      price: price,
    });

    handleToast(msg);
  };
  useEffect(() => {
    onSnapshot(doc(db, "App_products", id), (doc) => {
      let image;
      let price;
      let name;
      let Restaurant;
      if (doc.exists()) {
        name = doc.data().name;
        image = doc.data().image;
        price = doc.data().price;
        Restaurant = doc.data().Restaurant;
        setDetails({
          name: name,
          image: image,
          price: price,
          Restaurant: Restaurant,
        });
      }
    });
  }, [id]);

  return (
    <IonPage>
      <IonToolbar>
        <IonButton
          color="dark"
          fill="clear"
          onClick={() => {
            router.push("/tab/Dashboard");
          }}
        >
          <IonIcon icon={arrowBack}></IonIcon>
        </IonButton>
      </IonToolbar>
      <IonContent>
        <IonGrid>
          <IonCard>
            <IonRow>
              <IonLabel className="detail-text">Details</IonLabel>
            </IonRow>
            <IonRow>
              <IonImg className="img" src={detail.image}></IonImg>
            </IonRow>
            <IonRow>
              <IonLabel className="res-text">
                {detail.Restaurant} &nbsp; Restaurant
              </IonLabel>
            </IonRow>
            <IonRow>
              <IonLabel className="name-text">{detail.name}</IonLabel>
            </IonRow>
            <IonRow>
              <IonLabel className="price-text">Price: ₹{detail.price}</IonLabel>
            </IonRow>
            <IonRow>
              <IonLabel></IonLabel>
            </IonRow>
            <IonRow>
              <IonCol className="checkout-btn">
                {" "}
                <IonButton color="danger">Checkout</IonButton>
              </IonCol>
              <IonCol className="addtocart-btn">
                {" "}
                <IonButton
                  color="danger"
                  onClick={() => {
                    addtoCart(
                      detail.Restaurant,
                      detail.name,
                      detail.image,
                      detail.price
                    );
                  }}
                >
                  Addtocart
                </IonButton>
              </IonCol>
            </IonRow>
          </IonCard>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default ProductDetails;
