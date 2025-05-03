import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { getClinicBookingFee } from "../../store/UserStore/Clinic/action";

const SuccessPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const Clinic = useSelector((state) => state.Clinic);
  useEffect(() => {
    dispatch(getClinicBookingFee());
  }, []);

  const location = useLocation();

  return (
    <>
      {location?.state?.from != "payment" ? (
        history.push("/clinic")
      ) : (
        <div style={{ background: "#F4F4F5" }}>
          <div className="center-container pt-100 pb-90">
            <div className="card" style={{ width: "90rem", height: "50em" }} h>
              <div className="card-body">
                <h2 className="mt-5">
                  <i
                    className="fa fa-check bg-info rounded-circle text-white"
                    style={{ fontSize: "20px", padding: "5px" }}
                    aria-hidden="true"
                  ></i>{" "}
                </h2>
                <h3 className=" card-title orange-font">
                  Appointment Requested
                </h3>

                <p className="font-18">
                  Congrats! You earned{" "}
                  {Clinic?.bookingFee?.clinic_booking_reward} reward coins.
                </p>
                <p className="font-18 card-text mt-5 col-8 mb-30 display-3">
                  Thank you for your request. We are waiting for the clinic to
                  confirm your appointment.
                  <br /> We will notify you within 10 minutes.
                </p>
                <div className="col-sm-1"></div>
                <div
                  className="col-sm-10 mb-15"
                  style={{
                    border: "1px solid #00419D",
                    borderRadius: "10px",
                  }}
                >
                  <p class="mt-5 pl-10 text-left font-16">
                    1. Kindly arrive at the clinic 10 minutes prior to the
                    appointment time.
                  </p>
                  <p class="mb-0 pl-10 text-left font-16">
                    2. Arriving at the clinic, notify the receptionist so that
                    if there is no consultation in progress, your pet may be
                    called in at the discretion of the doctor.
                  </p>
                  <p class="mb-0 pl-10 text-left font-16">
                    3. If you do not arrive within 10 minutes post the
                    appointment time, the next pet will be consulted.
                  </p>
                  <p class="mb-30 pl-10 text-left font-16">
                    4. Priority would be given to emergency cases over a booked
                    appointment at any point of time at the clinic.
                  </p>
                </div>
                <div className="col-sm-1"></div>

                <a
                  href="/clinic"
                  className="card-link  btn btn-default font-weight-bold mt-10"
                >
                  Back To Clinic Section
                </a>
                <a
                  className="card-link  btn btn-default font-weight-bold  mt-10"
                  onClick={() =>
                    history.push({ pathname: "/profile", tab: "appointments" })
                  }
                >
                  View Appointments
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

export default SuccessPage;
