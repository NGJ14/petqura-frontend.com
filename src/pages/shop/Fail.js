import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import failImg from "../../assets/icons/fail.png";

const FailShoppingPage = () => {
  const location = useLocation();
  const params = useParams();
  const Checkout = useSelector((state) => state.Checkout);
  const guest = useSelector((state) => state.Guest);
  const history = useHistory();
  return (
    <>
      {!location?.state?.fromCheckout ? (
        history.push("/cart")
      ) : (
        <div style={{ background: "#F4F4F5" }}>
          <div className="center-container pt-100 pb-90">
            <div className="card" style={{ width: "90rem", height: "30em" }} h>
              <div className="card-body">
                <h2 className="mt-5">
                  <img src={failImg} width="55px" alt="failed" />
                </h2>
                <h3 className=" card-title orange-font">
                  Oops Something went wrong! please try again later
                </h3>

                {guest?.error ? (
                  <p className="font-18 card-text mt-5 col-8 mb-20">
                    {guest?.error}
                  </p>
                ) : null}

                {Checkout?.error ? (
                  <p className="font-18 card-text mt-5 col-8 mb-20">
                    {Checkout?.error}
                  </p>
                ) : null}
                <a
                  href="/store"
                  className="card-link  btn btn-default font-weight-bold  "
                >
                  Back To Shopping
                </a>

                {/* <a href="/clinic" className="card-link  btn btn-default font-weight-bold bg-info text-white">View Booking </a> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FailShoppingPage;
