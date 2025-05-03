import { useEffect } from "react";
import { useHistory } from "react-router";

const CarerNonAuthLayout = (props) => {
  const history = useHistory();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(7).toUpperCase() + string.slice(8);
  };

  useEffect(() => {
    let currentage = capitalizeFirstLetter(history?.location?.pathname);

    document.title = currentage;
  }, [history?.location?.pathname]);

  return <>{props.children}</>;
};

export default CarerNonAuthLayout;
