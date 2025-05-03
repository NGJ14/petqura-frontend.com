import React, { useEffect, useState, useRef } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Container, Row, UncontrolledAlert } from "reactstrap";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../../../components/UI/Tables/Breadcrumb";
import OrderFilter from "./HeaderFilter";
import Datatable from "../../../../components/UI/Tables/Datatable";

import { AppointmentData, SlotData } from "../../../../helpers/columns";
import ConfirmationAlert from "../../../../components/confiramtionAlert";
import BookSlot from "../../../clinics/BookSlot";
import Loader from "../../../../components/UI/Loader";

import { getLocalStorage } from "../../../../helpers/utils";
import {
  changeAppointmentStatus,
  getClinicAppointmentDetails,
  removeClinicSlotBlock,
} from "../../../../store/serviceProvider/Clinic/action";

import reschedulelogo from "../../../../assets/icons/reschedule.png";
import pendinglogo from "../../../../assets/icons/pending.png";
import conformationlogo from "../../../../assets/icons/confirmation.png";
import viewdetailslogo from "../../../../assets/icons/view-details.png";
import completelogo from "../../../../assets/icons/icons8-check-all.gif";
import cancelappointment from "../../../../assets/icons/appointment-cancel.png";
import removeicon from "../../../../assets/icons/icons8-remove-64.png";
// import Loader from "../../components/Common/Loader";

const Appointments = () => {
  const dispatch = useDispatch();
  const slot = useSelector((state) => state.Slot);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});
  const [status, setStatus] = useState("placed");
  const [modal, setModal] = useState(false);
  const [clinicId, setClinicId] = useState();
  const [blockSlot, setBlockSlot] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const rescheduleRequestedTooltip = (props) => (
    <Tooltip className="mytooltip" {...props}>
      Reschedule Requested. Awaiting Customer Action
    </Tooltip>
  );
  const conformBookingTooltip = (props) => (
    <Tooltip className="mytooltip" {...props}>
      Confirm Booking
    </Tooltip>
  );
  const requestforRescheduleTooltip = (props) => (
    <Tooltip className="mytooltip" {...props}>
      Request for Reschedule
    </Tooltip>
  );
  const bookedTooltip = (props) => (
    <Tooltip className="mytooltip" {...props}>
      Change status to: Appointment Completed
    </Tooltip>
  );
  const viewTooltip = (props) => (
    <Tooltip className="mytooltip" {...props}>
      Veiw Appointment Details
    </Tooltip>
  );
  const removeBlockingTooltip = (props) => (
    <Tooltip className="mytooltip" {...props}>
      Remove Blocking
    </Tooltip>
  );
  const cancelTooltip = (props) => (
    <Tooltip className="mytooltip" {...props}>
      Change status to: Appointment Canceled
    </Tooltip>
  );

  const okHandler = () => {
    if (promptMessage.type === "complete") {
      dispatch(
        changeAppointmentStatus({
          data: {
            appointment_id: promptMessage?.id,
            status: "completed",
          },
          callback: () =>
            dispatch(getClinicAppointmentDetails({ data: request })),
          // dispatch(getClinicAppointmentDetails({ data: { status: status } })),
        })
      );
    }
    if (promptMessage.type === "confirm") {
      dispatch(
        changeAppointmentStatus({
          data: {
            appointment_id: promptMessage?.id,
            status: "confirmed",
          },
          callback: () =>
            dispatch(getClinicAppointmentDetails({ data: request })),
          // dispatch(getClinicAppointmentDetails({ data: { status: status } })),
        })
      );
    }
    if (promptMessage.type === "remove_blocking") {
      dispatch(
        removeClinicSlotBlock({
          data: {
            appointment_id: promptMessage?.id,
            status: "remove_blocking",
          },
          callback: () =>
            dispatch(getClinicAppointmentDetails({ data: request })),
          // dispatch(getClinicAppointmentDetails({ data: { status: status } })),
        })
      );
    }
  };

  const completePromptHandler = (id, status, slot_id) => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: id,
      title: "",
      content: "Are you sure you want to Complete this Appointment Booking",
      type: "complete",
      slot_id: slot_id,
    });
  };
  const cancelPromptHandler = (id, status, slot_id) => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: id,
      title: "",
      content: "Are you sure you want to Cancel this Appointment Booking",
      type: "cancel",
      slot_id: slot_id,
    });
  };
  const confirmPromptHandler = (id, status, slot_id) => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: id,
      content: `Are you sure you want to Confirm this Appointment Booking?`,
      type: "confirm",
      status: status,
      slot_id: slot_id,
    });
  };

  const removeBlockHandler = (id, status) => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: id,
      content: `Are you sure you want to Remove this Blocking?`,
      type: "remove_blocking",
      status: status,
    });
  };

  const reschedulePromptHandler = (id, status, slot_id, clinic_id) => {
    // setShowPromptPopUp(!showPromptPopUp);
    toggle();
    setClinicId(clinic_id);
    setBlockSlot(false);
    setPromptMessage({
      id: id,
      content: `Enter the time for Reschedule this Appointment Booking?`,
      type: "reschedule",
      status: status,
      slot_id: slot_id,
    });
  };

  const blockSlotHandler = (clinic_id) => {
    slot?.clinicAppointments?.appointments?.length &&
      setClinicId(slot?.clinicAppointments?.clinic_id);
    setBlockSlot(true);
    toggle();
  };

  const viewPromptHandler = (appointmentDetails) => {
    console.log(appointmentDetails);
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      title: "Appointment Details",
      content: ``,
      type: "appointmentdetails",
      appointmentdetails: appointmentDetails,
    });
  };

  const basicRequest = {
    sort: "time_created",
    sort_order: "desc",
    page: 1,
    page_count: 50,
  };
  const [request, setRequest] = useState({ ...basicRequest });
  useEffect(() => {
    dispatch(getClinicAppointmentDetails({ data: request }));
    // data:{status: "pending"}
  }, [request]);

  const auth = getLocalStorage("AUTH_DETAILS");

  const formatslotData =
    slot?.clinicAppointments?.appointments?.length &&
    slot?.clinicAppointments?.appointments?.map((appointment, index) => ({
      no: index + 1,
      parent_name: (
        <div title={`${appointment?.first_name} ${appointment?.last_name}`}>
          {appointment?.user_details?.first_name}{" "}
          {appointment?.user_details?.last_name}
        </div>
      ),
      pet_name: (
        <div title={appointment?.pet_name}>{appointment?.pet_name}</div>
      ),
      date: (
        <div title={appointment?.appointment_date}>
          {appointment?.appointment_date}
        </div>
      ),
      slot_time: (
        <div title={`${appointment?.start_time}-${appointment?.end_time}`}>
          {appointment?.start_time}-{appointment?.end_time}
        </div>
      ),
      doctor_name: <div title={appointment?.doctor}>{appointment?.doctor}</div>,
      status: (
        <>
          {/* <div title={appointment?.status}>
            {appointment?.status?.toUpperCase()}
          </div> */}
          <div
            className={`badge ${
              appointment?.status == "requested"
                ? "badge-primary"
                : appointment?.status == "reschedule_requested"
                ? "badge-warning"
                : appointment?.status == "booked"
                ? "badge-success"
                : appointment?.status == "confirmed"
                ? "badge-success"
                : appointment?.status == "user_cancelled"
                ? "badge-danger"
                : appointment?.status == "completed"
                ? "badge-info"
                : ""
            } 
                         font-size-20`}
          >
            {appointment?.status?.toUpperCase()}
          </div>
        </>
      ),
      // medical_description: (
      //   <div title={appointment?.service}>{appointment?.service}</div>
      // ),
      actions: (
        <div className="cust-table-actions-wrap">
          {appointment?.status === "clinic_blocked" ? (
            <OverlayTrigger placement="top" overlay={removeBlockingTooltip}>
              {/* <i className={`fas fa-eye  fa-lg `}></i> */}
              <button>
                <img
                  title="Remove Blocking"
                  src={removeicon}
                  width="20px"
                  alt="Remove Blocking"
                  onClick={() =>
                    removeBlockHandler(
                      appointment?.appointment_id,
                      "clinic_blocked"
                    )
                  }
                />
              </button>
            </OverlayTrigger>
          ) : (
            ""
          )}
          {appointment?.status !== "clinic_blocked" ? (
            <OverlayTrigger placement="top" overlay={viewTooltip}>
              {/* <i className={`fas fa-eye  fa-lg `}></i> */}
              <button>
                <img
                  title="View Booking"
                  src={viewdetailslogo}
                  width="20px"
                  alt="View Booking"
                  onClick={() => viewPromptHandler(appointment)}
                />
              </button>
            </OverlayTrigger>
          ) : (
            ""
          )}
          &nbsp;&nbsp;
          {appointment?.status == "requested" ? (
            <>
              <button
                onClick={() =>
                  confirmPromptHandler(
                    appointment?.appointment_id,
                    "confirm",
                    appointment?.time_slot_id
                  )
                }
              >
                <OverlayTrigger placement="top" overlay={conformBookingTooltip}>
                  <img
                    title="Confirm Booking"
                    src={conformationlogo}
                    width="25px"
                  />
                </OverlayTrigger>
              </button>
              &nbsp;&nbsp;
              <button>
                <OverlayTrigger
                  placement="top"
                  overlay={requestforRescheduleTooltip}
                >
                  <img
                    onClick={() => {
                      reschedulePromptHandler(
                        appointment?.appointment_id,
                        "reschedule",
                        appointment?.time_slot_id,
                        appointment?.clinic_id
                      );
                    }}
                    title="Request for a Reschedule"
                    src={reschedulelogo}
                    width="18px"
                  />
                </OverlayTrigger>
              </button>
            </>
          ) : (
            ""
          )}
          {/* {appointment?.status == "reschedule_requested" ? (
            <>
              <OverlayTrigger
                placement="top"
                overlay={rescheduleRequestedTooltip}
              >
                <img src={pendinglogo} width="22px" />
              </OverlayTrigger>
            </>
          ) : (
            ""
          )} */}
          {appointment?.status == "confirmed" ? (
            <>
              <button>
                <OverlayTrigger placement="top" overlay={bookedTooltip}>
                  <img
                    onClick={() => {
                      completePromptHandler(
                        appointment?.appointment_id,
                        "complete",
                        appointment?.time_slot_id
                      );
                    }}
                    title="Complete this Appointment"
                    src={completelogo}
                    width="18px"
                  />
                </OverlayTrigger>
              </button>
              <button>
                <OverlayTrigger placement="top" overlay={cancelTooltip}>
                  <img
                    onClick={() => {
                      cancelPromptHandler(
                        appointment?.appointment_id,
                        "cancel",
                        appointment?.time_slot_id
                      );
                    }}
                    title="Cancel this Appointment"
                    src={cancelappointment}
                    width="18px"
                  />
                </OverlayTrigger>
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      ),
    }));

  return !auth?.user?.profile_completed ? (
    <Redirect to="/carer/complete-profile" />
  ) : !auth?.user?.admin_approved ? (
    <Redirect to="/carer/under-verification" />
  ) : (
    <div
      className="page-content cust-page"
      data-testid="component-faqList"
      id="reserveUNList"
    >
      <Container fluid>
        <Row className="my-1">
          <div className="col-md-10">
            <h4 className="mb-3">Appointments</h4>
            {(slot?.error || slot?.success) && (
              <div>
                <UncontrolledAlert
                  color={slot?.error ? "danger" : "success"}
                  className="alert-dismissible fade show"
                  role="alert"
                >
                  {slot?.error || slot?.success}
                </UncontrolledAlert>
              </div>
            )}
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="btn waves-effect waves-light cust_no_shadow float-right"
              style={{
                background: "#00419D",
                color: "#fff",
                fontWeight: "bold",
              }}
              onClick={() => {
                blockSlotHandler();
              }}
            >
              Block Slots
            </button>
          </div>
        </Row>
        <Row className="my-1">
          <div className="col-md-12">
            {/* <div className="col text-end reg_login_detailsFilter ">
            <div className="col-lg-2">
              <label className="h5">View results of : </label>
              <select
                className="col-lg-12 col-xl-2 col-md-4 col-sm-5 mr-5 mt-2 mb-4 "
                style={{ padding: "5px" }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {appointmentStatus?.map((status) => (
                  <option value={status?.value} selected>
                    {status?.data}
                  </option>
                ))}
              </select>
            </div>
          </div> */}

            <Datatable
              defaultSortField={"modified_on"}
              defaultSortAsc={false}
              tableID={"slot"}
              rows={formatslotData}
              columns={AppointmentData}
              request={request}
              setRequest={setRequest}
              search
              daterange
              appointmentstatus
              tableCardClassName={"snoTable"}
              totalRecords={slot?.clinicAppointments?.total}
              // noPagination
            />
          </div>
        </Row>
      </Container>

      <ConfirmationAlert
        {...promptMessage}
        modal_center={showPromptPopUp}
        setmodal_center={setShowPromptPopUp}
        onOK={okHandler}
        cancellationReason={promptMessage?.type == "cancel" ? true : false}
        reschedule={promptMessage?.type == "reschedule" ? true : false}
        request={request}
        setRequest={setRequest}
        okText="SUBMIT"
        cancelText="CANCEL"
      />
      <BookSlot
        modal_center={modal}
        toggle={toggle}
        clinicId={clinicId}
        blockSlot={blockSlot}
        Internal={true}
        {...promptMessage}
      />
      {slot?.loading && <Loader />}
    </div>
  );
};

export default Appointments;
