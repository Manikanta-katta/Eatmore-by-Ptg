import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { homeSharp, personCircleSharp, heart, cart } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";

import Cartlist from "./Cartdetails";
import Favourites from "./Favourites";
import Dashboard from "./Dashboard";
import Menu from "./Menu";
import Login from "./Loginpage";

import "./Tab.css";

import { UserAuth } from "./Authcontext";
import ProductDetails from "./Productdetails";
import Payment from "./payment";
import MyOrders from "./Myorders";

const Tab = () => {
  const { count, favlist } = UserAuth();

  return (
    <IonReactRouter>
      <IonTabs>
      <IonRouterOutlet>
          <Route path="/tab/Dashboard">
            <Dashboard />
          </Route>

          <Route path="/tab/menu">
            <Menu />
          </Route>
          <Route path="/tab/cartdetails">
            <Cartlist />
          </Route>
          <Route path="/tab/Favourites">
            <Favourites />
          </Route>
        
          <Route exact path="/tab">
            <Redirect to="/tab/Dashboard" />
          </Route>
          <Route path="/loginpage">
            <Login />
          </Route>
          <Route path="/tab/Dashboard/:id" exact>
            <ProductDetails />
          </Route>
          <Route path="/tab/payment">
            <Payment />
          </Route>
          <Route path="/tab/Myorders">
            <MyOrders />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color="white" className="tabBar">
          <IonTabButton
            className="tab-btn"
            tab="Dashboard"
            href="/tab/Dashboard"
          >
            <IonIcon icon={homeSharp} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton className="tab-btn" tab="Cart" href="/tab/Favourites">
            <IonLabel className="fav-count">{favlist}</IonLabel>
            <IonIcon icon={heart} />
            <IonLabel className="fav-t">Favourites</IonLabel>
          </IonTabButton>
          <IonTabButton className="tab-btn" tab="home" href="/tab/cartdetails">
            <IonLabel className="cart-count">{count}</IonLabel>
            <IonIcon icon={cart} />
            <IonLabel className="cart-t">Cart</IonLabel>
          </IonTabButton>
          <IonTabButton
            className="tab-btn"
            tab="Accountdetails"
            href="/tab/menu"
          >
            <IonIcon icon={personCircleSharp} />
            <IonLabel>Account</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};
export default Tab;
