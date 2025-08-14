import React, { useEffect } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  useParams,
  useHistory,
} from "react-router-dom";
import Layout from "./components/Layout";
import {
  userRoutes,
  authRoutes,
  carerAuthRoutes,
  carerNonRoutes,
} from "./routes/allRoutes";
import Authmiddleware from "./routes/middleware/authMiddleware";
import "./assets/scss/app.scss";
import CarerLayout from "./components/carerLayout";
import CarerNonAuthLayout from "./components/carerNonAuthLayout";
import CarerAuthmiddleware from "./routes/middleware/carerauthMiddleware";
import PageNotFound from "./pages/utils/404";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { cashfree } from "./file/cashfree/util";
import { initGA, trackPageView } from "./helpers/analytics";
const App = () => {
  const data = useSelector((state) => state.HeaderContent);
  const location = useLocation();
  useEffect(() => {
    initGA(); // Initialize once on mount
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search); // Track on route change
  }, [location]);
  useEffect(() => {
    if (
      !data?.loading &&
      location.pathname === `/home` &&
      document.title === ""
    ) {
      document.title = "Home | PetQura";
    } else if (
      !data?.loading &&
      location.pathname === `/store` &&
      document.title === ""
    ) {
      document.title = "Store | PetQura";
    } else if (!data?.loading && location.pathname === `/product`) {
      document.title = "Store | PetQura";
    } else if (
      !data?.loading &&
      location.pathname === `/clinic` &&
      document.title === ""
    ) {
      document.title = "Clinic | PetQura";
    } else if (!data?.loading && location.pathname === `/cookie-policy`) {
      document.title = "Cookie Policy | PetQura";
    } else if (
      !data?.loading &&
      location.pathname === `/about-us` &&
      document.title === ""
    ) {
      document.title = "About us | PetQura";
    } else if (!data?.loading && location.pathname === `/terms-of-service`) {
      document.title = "Terms of Service | PetQura";
    } else if (!data?.loading && location.pathname === `/cart`) {
      document.title = "Cart | PetQura";
    } else if (
      !data?.loading &&
      location.pathname === `/refund-and-cancellation`
    ) {
      document.title = "Refund & Cancellation | PetQura";
    } else if (window.location.href.indexOf("product") > -1) {
      document.title = "Store | PetQura";
    } else if (window.location.href.indexOf("clinic") > -1) {
      document.title = "Clinic | PetQura";
    } else if (window.location.href.indexOf("home") > -1) {
      document.title = "Home | PetQura";
    } else if (window.location.href.indexOf("summary") > -1) {
      document.title = "Checkout Summary | PetQura";
    } else if (window.location.href.indexOf("address") > -1) {
      document.title = "Shipping Address | PetQura";
    }
  }, [location.pathname, data?.loading]);
  return (
    <>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}
          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}

          {carerAuthRoutes.map((route, idx) => (
            <CarerAuthmiddleware
              path={route.path}
              layout={CarerLayout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}

          {carerNonRoutes.map((route, idx) => (
            <CarerAuthmiddleware
              path={route.path}
              layout={CarerNonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
