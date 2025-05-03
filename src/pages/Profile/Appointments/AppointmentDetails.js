import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router";
import SuccessConfirmationAlert from "../../../components/SuccessConfirmationAlert";
// import { getPetById } from "../../../store/UserStore/Pet/action";
import BackButton from "../../../components/UI/BackButton";
import { getLocalStorage } from "../../../helpers/utils";
import {
  acceptRescheduleStatus,
  getAppointmentById,
  rejectRescheduleStatus,
} from "../../../store/UserStore/Appointments/action";

const AppointmentDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const AppointmentData = useSelector((state) => state.Appointment);
  const [modalsuccess, setModalSuccess] = useState(false);
  const [content, setContent] = useState("");
  useEffect(() => {
    dispatch(
      getAppointmentById({
        data: { appointment_id: params?.id },
      })
    );
  }, []);

  const handleAcceptAppointment = () => {
    dispatch(
      acceptRescheduleStatus({
        id: {
          appointment_id: params?.id,
        },
        callback: () => {
          setContent("Booking Confirmed Successfully");
          setModalSuccess(true);
          dispatch(
            getAppointmentById({
              data: { appointment_id: params?.id },
            })
          );
        },
      })
    );
  };

  const handleRejectAppointment = () => {
    dispatch(
      rejectRescheduleStatus({
        id: {
          appointment_id: params?.id,
        },
        callback: () => {
          setContent("Booking cancelled, Your Refund is initiated");

          setModalSuccess(true);
          dispatch(
            getAppointmentById({
              data: { appointment_id: params?.id },
            })
          );
        },
      })
    );
  };

  const location = useLocation()

  const auth = getLocalStorage("AUTH_DETAILS");
  const history = useHistory();

  console.log(location?.state?.status);
  return (
    <div className="common-container">
      <div className="container  mb-90">
        <div className="text-right">
          <button
            className="btn orange-background text-white"
            onClick={() =>
              history.push({ pathname: "/profile", tab: "appointments",state:{status: location?.state?.status} })
            }
          >
            Back To Appointments
          </button>
        </div>
        {AppointmentData?.appointmentDetails ? (
          <div className="section-content custom-page-layout border-2px pl-5 pt-40 pb-40">
            <h3 className="my-5 orange-font">Appointment Details</h3>
            <div className="row">
              <div className="col col-5 mt-3">
                <div className="d-flex">
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    Parent Name:
                  </h5>
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    {" "}
                    {auth?.first_name || auth?.user?.first_name}{" "}
                    {auth?.last_name || auth?.user?.last_name}
                  </h5>
                </div>
                <div className="d-flex">
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    Pet Name:
                  </h5>
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    {" "}
                    {AppointmentData?.appointmentDetails?.pet_name}
                  </h5>
                </div>
                <div className="d-flex">
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    Pet Age:
                  </h5>
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    {" "}
                    {AppointmentData?.appointmentDetails?.pet_age}
                  </h5>
                </div>
                {AppointmentData?.appointmentDetails?.pet_breed && (
                  <div className="d-flex">
                    <h5 className="col-md-6 col-xs-6 font-weight-bold">
                      Breed Type :
                    </h5>
                    <h5 className="col-md-6 col-xs-6 font-weight-bold">
                      {" "}
                      {AppointmentData?.appointmentDetails?.pet_breed}
                    </h5>
                  </div>
                )}
                {AppointmentData?.appointmentDetails?.description && (
                  <div className="d-flex">
                    <h5 className="col-md-6 col-xs-6 font-weight-bold">
                      Medical Description:
                    </h5>
                    <h5 className="col-md-6 col-xs-6 font-weight-bold">
                      {" "}
                      {AppointmentData?.appointmentDetails?.description}
                    </h5>
                  </div>
                )}
                <div className="d-flex">
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    Status:
                  </h5>
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    {" "}
                    {AppointmentData?.appointmentDetails?.status?.toUpperCase()}
                  </h5>
                </div>
                <div className="d-flex">
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    Doctor:
                  </h5>
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    {" "}
                    {AppointmentData?.appointmentDetails?.doctor}
                  </h5>
                </div>
                <div className="d-flex">
              
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    Clinic Name:
                  </h5>
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    {" "}
                    {
                      AppointmentData?.appointmentDetails?.clinic_details
                        ?.clinic_name
                    }
                  </h5>
                </div>
                <div className="d-flex">
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    Clinic Address:
                  </h5>
                  <h5 className="col-md-6 col-xs-6  font-weight-bold">
                    {
                      AppointmentData?.appointmentDetails?.clinic_details
                        ?.clinic_address_line_1
                    }
                    ,
                    <p className="my-1">
                      {`${AppointmentData?.appointmentDetails?.clinic_details?.clinic_city},`}
                    </p>
                    {
                      AppointmentData?.appointmentDetails?.clinic_details
                        ?.clinic_state
                    }
                    -
                    {
                      AppointmentData?.appointmentDetails?.clinic_details
                        ?.clinic_pincode
                    }
                  </h5>
                </div>
                <div className="d-flex">
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    Appointment Date:
                  </h5>
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    {" "}
                    {AppointmentData?.appointmentDetails?.appointment_date}
                  </h5>
                </div>
                <div className="d-flex">
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    Appointment Time:
                  </h5>
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    {" "}
                    {AppointmentData?.appointmentDetails?.start_time} -{" "}
                    {AppointmentData?.appointmentDetails?.end_time}
                  </h5>
                </div>
                <div className="d-flex">
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    Consultation Fee:
                  </h5>
                  <h5 className="col-md-6 col-xs-6 font-weight-bold">
                    Rs.{AppointmentData?.appointmentDetails?.slot_price}
                  </h5>
                </div>

                {AppointmentData?.appointmentDetails?.status ==
                "reschedule_requested" ? (
                  <div className="d-flex mt-5">
                    <h4 className="col-md-6 col-xs-6 font-weight-bold">
                      Reschedule Request
                    </h4>
                    <div className="col-md-6 col-xs-6 font-weight-bold">
                      <button
                        className="btn orange-background text-white"
                        onClick={handleAcceptAppointment}
                      >
                        Accept
                      </button>
                      <button
                        className="btn orange-background text-white"
                        onClick={handleRejectAppointment}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <SuccessConfirmationAlert
        modal_center={modalsuccess}
        setmodal_center={setModalSuccess}
        content={content}
      />
    </div>
  );
};

export default AppointmentDetails;
