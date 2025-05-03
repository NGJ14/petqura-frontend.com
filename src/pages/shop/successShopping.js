import React from "react";
import { Redirect, useHistory, useLocation, useParams } from "react-router";
import { getLocalStorage } from "../../helpers/utils";

const SuccessShopping = () => {
  const location = useLocation();
  const params = useParams();
  const history = useHistory();
  return (
    <div style={{ background: "#F4F4F5" }}>
      <div className="center-container pt-100 pb-90">
        <div className="card" style={{ width: "90rem", height: "30em" }} h>
          <div className="card-body">
            <h2 className="mt-5">
              <i
                className="fa fa-check bg-info rounded-circle text-white"
                style={{ fontSize: "20px", padding: "5px" }}
                aria-hidden="true"
              ></i>{" "}
            </h2>
            <h3 className="card-title orange-font">Order Confirmed</h3>

       
            <p className="font-18  card-text mt-5 col-8 mb-80 px-5">
              Your Order is confirmed. You will receive an order confirmation
              email/SMS shortly with the expected delivery date of your items.
            </p>
            <a
              href="/store"
              className="card-link  btn btn-default font-weight-bold  "
            >
              Continue Shopping
            </a>
            <a
              href={`/invoice/${params?.id}`}
              className="card-link  btn btn-default font-weight-bold bg-info text-white"
            >
              View Invoice{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  ) 
};

export default SuccessShopping;
