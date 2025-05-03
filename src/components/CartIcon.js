import React from "react";
import { useHistory } from "react-router";

const CartIcon = ({ count }) => {
  const history = useHistory();
  return (
    <div className="mt-2">
      <span
        className="fa-stack fa-2x has-badge cursor-pointer"
        data-count={count}
        style={{ color: "#ffffff" }}
        onClick={() => history.push("/cart")}
      >
        {/* <i className="fa fa-circle  fa-inverse"></i> */}
        <i className="fa fa-shopping-cart fa-stack-1x "></i>
      </span>
    </div>
  );
};

export default CartIcon;
