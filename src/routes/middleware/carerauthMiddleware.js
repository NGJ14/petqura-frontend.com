import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getLocalStorage } from "../../helpers/utils";

const CarerAuthmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (
        isAuthProtected &&
        (!getLocalStorage("AUTH_DETAILS") ||
          getLocalStorage("AUTH_DETAILS")?.user?.role == "pet_owner" ||
          getLocalStorage("AUTH_DETAILS")?.user?.role == "admin")
      ) {
        return (
          <Redirect
            to={{
              pathname: "/carer/login",
              state: { from: props.location },
            }}
          />
        );
      }
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

export default CarerAuthmiddleware;
