import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Modal, Row } from "reactstrap";
import {
  changeAppointmentStatus,
  clinicAppointmentReschedule,
  getClinicAppointmentDetails,
} from "../store/serviceProvider/Clinic/action";

const ConfirmationAlert = ({
  content,
  modal_center,
  setmodal_center,
  title,
  onOK,
  okText,
  cancelText,
  request,
  setRequest,
  cancellationReason,
  reschedule,
  ...promptMessage
}) => {
  const [description, setDescription] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const dispatch = useDispatch();
  const cancelHandler = () => {
    dispatch(
      changeAppointmentStatus({
        data: {
          appointment_id: promptMessage.id,
          status: "cancelled",
          time_slot_id: promptMessage?.slot_id,
          reason: description,
        },
        callback: () =>
          dispatch(getClinicAppointmentDetails({ data: request })),
      })
    );
  };

  useEffect(() => {
    if (rescheduleTime == "" || rescheduleDate == "") {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [rescheduleTime, rescheduleDate]);

  const rescheduleHandler = () => {
    dispatch(
      clinicAppointmentReschedule({
        data: {
          appointment_id: promptMessage?.id,
          start_time: rescheduleTime,
          date: rescheduleDate,
        },
        callback: () =>
          dispatch(getClinicAppointmentDetails({ data: request })),
        // dispatch(getClinicAppointmentDetails({ data: request })),
      })
    );
  };

  return (
    <Modal
      isOpen={modal_center}
      centered={true}
      style={{ maxWidth: "500px", width: "100%" }}
    >
      <div className="modal-header">
        <h5 className="modal-title mt-0">{title}</h5>
        <button
          type="button"
          onClick={() => setmodal_center(false)}
          className="close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body ml-4">
        {content}
        {cancellationReason && (
          <Row>
            <div className="col-lg-12 col-md-12 col-xs-12 ml-3">
              <label className="cust-label text-left">
                Cancellation Reason
                <span className="mandatory">*</span>
              </label>
              <div className="d-flex col-lg-12 pl-0 ">
                <textarea
                  rows={8}
                  value={description}
                  row
                  name="Cancellation Reason"
                  className="col-lg-10 col-sm-10"
                  placeholder="Enter Cancellation Reason"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>
          </Row>
        )}
        {reschedule && (
          <>
            <Row>
              <div className="col-lg-12 col-md-12 col-xs-12 ml-3">
                <label className="cust-label text-left">
                  Reschedule Date
                  <span className="mandatory">*</span>
                </label>
                <div className="d-flex col-lg-6 pl-0 ">
                  <Input
                    type="date"
                    value={rescheduleDate}
                    min="2022-01-01"
                    className="col-lg-6"
                    placeholder="Enter Reschedule Time"
                    onChange={(e) => {
                      setRescheduleDate(e.target.value);
                    }}
                  />
                </div>
              </div>
            </Row>
            <Row>
              <div className="col-lg-12 col-md-12 col-xs-12 ml-3">
                <label className="cust-label text-left">
                  Reschedule Time
                  <span className="mandatory">*</span>
                </label>
                <div className="d-flex col-lg-6 pl-0 ">
                  <Input
                    type="time"
                    value={rescheduleTime}
                    min="2022-01-01"
                    className="col-lg-6"
                    placeholder="Enter Reschedule Time"
                    onChange={(e) => {
                      setRescheduleTime(e.target.value);
                    }}
                  />
                </div>
              </div>
            </Row>
          </>
        )}
        {promptMessage.appointmentdetails && (
          <>
            <Row>
              <div className="col-lg-12 col-md-12 col-xs-12 ml-3">
                <label className="cust-label text-left">Pet Name</label>
                <div className="d-flex col-lg-6 pl-0 ">
                  <p>{promptMessage.appointmentdetails.pet_name}</p>
                </div>
              </div>
            </Row>
            <Row>
              <div className="col-lg-12 col-md-12 col-xs-12 ml-3">
                <label className="cust-label text-left">Pet Parent</label>
                <div className="d-flex col-lg-6 pl-0 ">
                  <p>
                    {promptMessage.appointmentdetails.user_details.first_name}{" "}
                    {promptMessage.appointmentdetails.user_details.last_name}
                  </p>
                </div>
              </div>
            </Row>

            <Row>
              <div className="col-lg-12 col-md-12 col-xs-12 ml-3">
                <label className="cust-label text-left">Pet Age</label>
                <div className="d-flex col-lg-6 pl-0 ">
                  <p>{promptMessage.appointmentdetails.pet_age} Years</p>
                </div>
              </div>
            </Row>
            <Row>
              <div className="col-lg-12 col-md-12 col-xs-12 ml-3">
                <label className="cust-label text-left">Pet Category</label>
                <div className="d-flex col-lg-6 pl-0 ">
                  <p>{promptMessage.appointmentdetails.pet_type}</p>
                </div>
              </div>
            </Row>
            <Row>
              <div className="col-lg-12 col-md-12 col-xs-12 ml-3">
                <label className="cust-label text-left">Pet Service</label>
                <div className="d-flex col-lg-6 pl-0 ">
                  <p>{promptMessage.appointmentdetails.service}</p>
                </div>
              </div>
            </Row>
            <Row>
              <div className="col-lg-12 col-md-12 col-xs-12 ml-3">
                <label className="cust-label text-left">Pet Breed</label>
                <div className="d-flex col-lg-6 pl-0 ">
                  <p>
                    {promptMessage.appointmentdetails.pet_breed
                      ? promptMessage.appointmentdetails.pet_breed
                      : "- -"}
                  </p>
                </div>
              </div>
            </Row>
            <Row>
              <div className="col-lg-12 col-md-12 col-xs-12 ml-3">
                <label className="cust-label text-left">Details</label>
                <div className="d-flex col-lg-6 pl-0 ">
                  <p>
                    {promptMessage.appointmentdetails.description
                      ? promptMessage.appointmentdetails.description
                      : "- -"}
                  </p>
                </div>
              </div>
            </Row>
            <Row>
              <div className="col-lg-12 col-md-12 col-xs-12 ml-3">
                <label className="cust-label text-left">
                  Appointment Status
                </label>
                <div className="d-flex col-lg-6 pl-0 ">
                  <div
                    className={`badge ${
                      promptMessage.appointmentdetails?.status == "requested"
                        ? "badge-primary"
                        : promptMessage.appointmentdetails?.status ==
                          "reschedule_requested"
                        ? "badge-warning"
                        : promptMessage.appointmentdetails?.status == "booked"
                        ? "badge-success"
                        : promptMessage.appointmentdetails?.status ==
                          "confirmed"
                        ? "badge-success"
                        : promptMessage.appointmentdetails?.status ==
                          "user_cancelled"
                        ? "badge-danger"
                        : promptMessage.appointmentdetails?.status ==
                          "completed"
                        ? "badge-info"
                        : ""
                    } 
                         font-size-20`}
                  >
                    {promptMessage.appointmentdetails?.status?.toUpperCase()}
                  </div>
                </div>
              </div>
            </Row>
            {promptMessage.appointmentdetails.cancellation_reason && (
              <Row>
                <div className="col-lg-12 col-md-12 col-xs-12 ml-3">
                  <label className="cust-label text-left">
                    Cancellation Reason
                  </label>
                  <div className="d-flex col-lg-6 pl-0 ">
                    <p>
                      {promptMessage.appointmentdetails.cancellation_reason
                        ? promptMessage.appointmentdetails.cancellation_reason
                        : "- -"}
                    </p>
                  </div>
                </div>
              </Row>
            )}
          </>
        )}
      </div>
      <div className="modal-footer">
        {!promptMessage.appointmentdetails && (
          <button
            type="button"
            className="btn cust-btn"
            onClick={() => {
              cancellationReason
                ? cancelHandler()
                : reschedule
                ? rescheduleHandler()
                : onOK();
              setmodal_center(false);
            }}
            // disabled={reschedule && disableSubmit}
          >
            {okText || "YES"}
          </button>
        )}
        <button
          type="button"
          className="btn btn-light"
          onClick={() => setmodal_center(false)}
        >
          {cancelText || "NO"}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationAlert;
