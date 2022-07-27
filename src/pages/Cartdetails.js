import { IonPage, IonSearchbar, IonToolbar,IonContent,IonGrid,IonRow,IonText,IonCol,IonButton,IonCard, IonIcon, } from "@ionic/react";
import {
    collection,
    getDocs,
    deleteDoc,
  
    
  } from "firebase/firestore";
  import { db,auth} from "./firebase";
  import { useState, useEffect } from "react";
  import { LazyLoadImage } from "react-lazy-load-image-component";
  import {trashOutline} from "ionicons/icons";
  import  './Cartdetails.css'
const Cartlist = () => {
    const [product,setproduct] = useState([]);
//     const [userId, setUserId] = useState();
//     auth.onAuthStateChanged(user =>{
//       setUserId(user.uid);
//       console.log(user.uid);
    
//      })

    useEffect(() => {
      const CartRef = collection(db,"Users",auth.currentUser.uid, "Addtocartproducts");
        getDocs(CartRef)
          .then((snapshot) => {
            let products = [];
            snapshot.docs.forEach((doc) => {
              products.push({ ...doc.data(), id: doc.id });
            });
            console.log(products);
            setproduct(products);
          })
          .catch((err) => {
            console.log(err.message);
          });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      const ondelete = (id,name,image,price)=>{
        const deleteref = collection(db,"users",auth.currentUser.uid,"Addtocartproducts")
        deleteDoc(deleteref,{
          name:name,
          image:image,
          price:price,
        });
    
      }

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
                      <IonText className="res-names">
                        {Data.Restaurant}
                      </IonText>
                    
                     
                    </IonRow>
                    <IonRow>
                      <IonText className="res-names">{Data.name}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonText className="price"> Price :{Data.price}</IonText>
                    </IonRow>
                    <IonRow>
                      <IonButton color="danger" onClick={()=>{
                     
                      }}>
                        Order
                      </IonButton>
                    </IonRow>
                    <IonRow>
                        <IonButton fill="clear" onClick={()=>{
                        ondelete(Data.id,Data.name, Data.image, Data.price)
                      }}>  <IonIcon icon={trashOutline}></IonIcon></IonButton>
                      
                    </IonRow>
                  </IonGrid>
                </IonCol>
              </IonRow>
            );
          })}
         
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Cartlist;
