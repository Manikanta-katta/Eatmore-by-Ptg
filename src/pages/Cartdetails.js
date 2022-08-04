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
  useIonToast,
} from "@ionic/react";
import { collection, deleteDoc, onSnapshot,doc,addDoc, setDoc,Timestamp } from "firebase/firestore";
import { db, auth } from "./firebase";
import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { trashOutline } from "ionicons/icons";
import "./Cartdetails.css";
import { UserAuth } from "./Authcontext";

import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Cartlist = () => {
  const [present] = useIonToast();
  const router = useIonRouter();
  const [product, setproduct] = useState([]);
  const {setcount} = UserAuth();
  const [total, setTotal] = useState();
  const [userId,setUserId] = useState();
  const msg1 = " products are in ordering"
  const priceForStripe = product.total * 100;
  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:8100/payment",
        method: "post",
        data: {
          amount:total * 100,
          token,
        },
      });
      if (response.status === 200) {
      
       
        console.log("Your payment was successfull");
      }
    } catch (error) {
      console.log(error);
      deleteallproducts();
      router.push("/tab/payment")
    }
  };
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

  auth.onAuthStateChanged((user) => {
    setUserId(user.uid);
    console.log(user.uid);
  });
  const addtocart = () => {
    const CartRef = collection(
      db,
      "Users",
      auth.currentUser.uid,
      "Addtocartproducts"
    );
    onSnapshot(CartRef, (snapshot) => {
      let products = [];
      let Total = 0;
      snapshot.docs.forEach((doc) => {
        Total = Total + doc.data().price;
        products.push({ ...doc.data(), id: doc.id });
      });
  
      setcount(products.length);
      setproduct(products);
      setTotal(Total);
    });
  };
  // const Checkout = () => {
    
 
  //   handleToast(msg1);
  // };

   const deleteallproducts = () =>{
    const addtocheckoutref = collection(db, "Users", userId, "Orders");
    addDoc(addtocheckoutref, {
  
    product,
    Totalprice:total,
    createdAt: Timestamp.fromDate(new Date()),
    });
    onSnapshot(collection(db,"Users",auth.currentUser.uid,"Addtocartproducts"),(snapshot)=>{
      snapshot.docs.forEach((docs) =>{
        setDoc(doc(db,"Users",auth.currentUser.uid,"OrderList",docs.id),{
          Restaurant: docs.data().Restaurant,
          name:docs.data().name,
          image:docs.data().image,
          price: docs.data().price,
        });
        deleteDoc(doc(db,"Users",auth.currentUser.uid,"Addtocartproducts",docs.id));
      });
    });
   }

  useEffect(() => {
    addtocart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const ondelete =(id)=>{
    deleteDoc(doc(db,"Users",auth.currentUser.uid,"Addtocartproducts",id));
  } ;

  return (
    <IonPage>
      <IonToolbar className="cart-toolbar">
        <IonSearchbar className="search" placeholder="Search"></IonSearchbar>
        <IonGrid>
          <IonRow>
            <IonText className="Cartproducttxt">CartProducts</IonText>
          </IonRow>
        </IonGrid>
      </IonToolbar>

      <IonContent className="cart-content">
        <IonGrid className="dash-grid">
          {product.map((Data) => {
            return (
              <IonRow key={Data.id}>
                <IonCol className="data">
                  <IonCard
                    button
                    onClick={() => {
                      router.push(`Dashboard/${Data.id}`);
                    }}
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
                      <IonText className="price"> Price :{Data.price}</IonText>
                    </IonRow>
                    <IonRow>
                      {/* <IonButton color="danger" href="/tab/paymentpage">
                        Order
                      </IonButton> */}
                    </IonRow>
                    <IonRow>
                      <IonButton
                        fill="clear"
                        onClick={() => {
                          ondelete(Data.id);
                        }}
                      >
                        {" "}
                        <IonIcon icon={trashOutline}></IonIcon>
                      </IonButton>
                    </IonRow>
                  </IonGrid>
                </IonCol>
              </IonRow>
            );
          })}
        </IonGrid>
      </IonContent>
      <IonButton className="total" color="danger">
        {" "}
        <StripeCheckout
          stripeKey="pk_test_51LQ3MDSBZsnWZCC5NT8FjMT29baQo8xu9xIVjZatH4ec6ioWjjhjj4QqSrEVrmt5eCjPYdDUvNK6kONvCyJz8Ipr00M8oGkbhs"
          label="PayNow"
          name="Pay with credit card"
          billingAddress
          shippingAddress
          amount={priceForStripe}
          description={`Your total is Rs.${total}`}
          token={payNow}
        />
        Total : ₹{total}
      </IonButton>
    </IonPage>
  );
};
export default Cartlist;
