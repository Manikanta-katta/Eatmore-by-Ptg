import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  homeSharp,
  searchSharp,
  personCircleSharp,
  heart,
  cart,
} from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
//  import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";
import Cartlist from "./Cartdetails";
import Favourites from "./Favourites";
import Search from "./Searchpage";
import Dashboard from "./Dashboard";
import Menu from "./Menu";
import Login from "./Loginpage";
import ProductDetails from "./Productdetails";
import './Tab.css'

const Tab = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tab/Dashboard">
            <Dashboard />
          </Route>

          <Route path="/tab/Searchpage">
            <Search />
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
          <Route path="/tab/ProductDetails">
            <ProductDetails />
          </Route>

          <Route exact path="/tab">
            <Redirect to="/tab/Dashboard" />
          </Route>
          <Route path="/loginpage">
            <Login />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom"  color="white" className="tabBar">
          <IonTabButton className="tab-btn" tab="Dashboard" href="/tab/Dashboard" >
            <IonIcon icon={homeSharp} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton className="tab-btn" tab="Search" href="/tab/Searchpage">
            <IonIcon icon={searchSharp} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton className="tab-btn" tab="Cart" href="/tab/Favourites">
            <IonIcon icon={heart} />
            <IonLabel>Favourites</IonLabel>
          </IonTabButton>
          <IonTabButton className="tab-btn" tab="home" href="/tab/cartdetails">
            <IonIcon icon={cart} />
            <IonLabel>Cart</IonLabel>
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
