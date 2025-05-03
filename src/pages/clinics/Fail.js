import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import failImg from "../../assets/icons/fail.png";
const FailClinicPage = () => {
  const location = useLocation();
  const params = useParams();
  const Clinic = useSelector((state) => state.Clinic);
  const history = useHistory();
  return (
    <>
      {location?.state?.from != "payment" ? (
        history.push("/clinic")
      ) : (
        <div style={{ background: "#F4F4F5" }}>
          <div className="center-container pt-100 pb-90">
            <div className="card" style={{ width: "90rem", height: "30em" }} h>
              <div className="card-body">
                <h2 className="mt-5">
                  <img src={failImg} width="55px" alt="failed" />
                  {/* <i
                    className="fas fa-exclamation-triangle bg-danger rounded-circle text-white"
                    style={{ fontSize: "40px", padding: "5px" }}
                    aria-hidden="true"
                  ></i>{" "} */}
                </h2>
                <h3 className=" card-title orange-font mb-20">
                  Oops Something went wrong! .please try again later
                </h3>

                {Clinic?.error ? (
                  <p className="font-18 card-text mt-5 col-8 mb-50">
                    {Clinic?.error}
                  </p>
                ) : null}
                <a
                  href="/clinic"
                  className="card-link  btn btn-default font-weight-bold  "
                >
                  Back To Clinic
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

export default FailClinicPage;
