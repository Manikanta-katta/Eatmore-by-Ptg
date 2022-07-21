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
  cartSharp,
  personCircleSharp,

} from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
//  import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";


import Search from "./Searchpage";
import Dashboard from "./Dashboard";
import Menu from "./Menu";
import Login from "./Loginpage";

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

          <Route exact path="/tab">
            <Redirect to="/tab/dashboard" />
          </Route>
          <Route path="/loginpage">
            <Login />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" color="white" className="tabBar">
          <IonTabButton className="tab-btn" tab="home" href="/tab/dashboard">
            <IonIcon icon={homeSharp} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton className="tab-btn" tab="Search" href="/tab/Searchpage">
            <IonIcon icon={searchSharp} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton className="tab-btn" tab="Myorders" >
            <IonIcon icon={cartSharp} />
            <IonLabel>Myorders</IonLabel>
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
