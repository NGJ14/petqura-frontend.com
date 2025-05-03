import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getLocalStorage } from "../../helpers/utils";

const Authmiddleware = ({
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
          (getLocalStorage("AUTH_DETAILS")?.user?.role != "pet_owner" &&
            !getLocalStorage("AUTH_DETAILS")?.guest_id))
      ) {
        return (
          <Redirect
            to={{ pathname: "/home", state: { from: props.location } }}
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

export default Authmiddleware;
