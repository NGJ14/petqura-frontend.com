import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import CarerHeader from "./header";
import Sidenav from "./sidenav";

const CarerLayout = (props) => {
  const history = useHistory();
  const capitalizeFirstLetter = (string, profile) => {
    if (profile == "profile") {
      return string.charAt(7).toUpperCase() + string.slice(8);
    } else {
      return string.charAt(14).toUpperCase() + string.slice(15);
    }
  };
  const [open, setopen] = useState(false);
  let currentage;
  useEffect(() => {
    if (
      history?.location?.pathname?.includes("/carer/seller") ||
      history?.location?.pathname?.includes("/carer/seller")
    ) {
      currentage = capitalizeFirstLetter(history?.location?.pathname);
    } else {
      currentage = capitalizeFirstLetter(
        history?.location?.pathname,
        "profile"
      );
    }

    document.title = currentage;
  }, [history?.location?.pathname]);

  return (
    <div>
      <Sidenav open={open} setopen={setopen} />
      <CarerHeader navopen={open} setNavopen={setopen} />
      {props.children}
    </div>
  );
};

export default CarerLayout;
