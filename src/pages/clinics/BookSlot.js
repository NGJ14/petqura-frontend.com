import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  TabContent,
  NavItem,
  Nav,
  TabPane,
} from "reactstrap";

import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getClinicSlotById } from "../../store/UserStore/Clinic/action";
import moment from "moment";
import PetMedDetailsForm from "./PetMedDetailsForm";
import { getLocalStorage } from "../../helpers/utils";

import {
  clinicAppointmentReschedule,
  getClinicAppointmentDetails,
  clinicBlockSlots,
} from "../../store/serviceProvider/Clinic/action";

import Login from "../Login";
import { resetErrors } from "../../store/UserStore/Login/action";
// import ToolTipComponent from "../../components/ToolTip";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const BookSlot = ({
  clinicId,
  modal_center,
  toggle,
  blockSlot = false,
  Internal = false,
  ...promptMessage
}) => {
  const da1 = moment(new Date().setDate(new Date().getDate())).format(
    "DD-MM-YYYY"
  );
  const da2 = moment(new Date().setDate(new Date().getDate() + 1)).format(
    "DD-MM-YYYY"
  );
  const da3 = moment(new Date().setDate(new Date().getDate() + 2)).format(
    "DD-MM-YYYY"
  );
  const da4 = moment(new Date().setDate(new Date().getDate() + 3)).format(
    "DD-MM-YYYY"
  );
  const da5 = moment(new Date().setDate(new Date().getDate() + 4)).format(
    "DD-MM-YYYY"
  );

  const doctorHelpTooltip = (props) => (
    <Tooltip className="mytooltip" {...props}>
      We understand your preference and will provide the same; subject to
      availability.
    </Tooltip>
  );
  const [loginmodal, setLoginModal] = useState(false);
  const Logintoggle = () => {
    setLoginModal(!loginmodal);
    dispatch(resetErrors());
    setCustError("");
  };
  const [activeTab, setActiveTab] = useState("1");
  const [slotVal, setSlotVal] = useState("");
  const [slotId, setSlotId] = useState("");
  const [slotDate, setSlotDate] = useState(da1);
  const [slotKey, setSlotKey] = useState("");
  const clinicData = useSelector((state) => state.Clinic);
  const Slot = useSelector((state) => state.Slot);
  const [modal, setModal] = useState(false);
  const authToggle = () => setModal(!modal);
  let [custError, setCustError] = useState("");

  const [petMedDetailsModal, setpetMedDetailsModal] = useState(false);
  const slot_toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const petMedDetailstoggle = () => {
    setpetMedDetailsModal(!petMedDetailsModal);
  };
  const dispatch = useDispatch();

  const id = clinicId;
  useEffect(() => {
    setSlotDate(da1);
    setSlotVal("");
    setActiveTab("1");
    clinicId != undefined &&
      dispatch(
        getClinicSlotById({
          data: {
            clinic_id: id,
            day: "d1",
            action: "slots",
            internal: Internal,
          },
        })
      );
  }, [id]);

  const day3 = moment(new Date().setDate(new Date().getDate() + 2)).format(
    "ddd, DD MMM"
  );
  const day4 = moment(new Date().setDate(new Date().getDate() + 3)).format(
    "ddd, DD MMM"
  );
  const day5 = moment(new Date().setDate(new Date().getDate() + 4)).format(
    "ddd, DD MMM"
  );

  const tabpanes = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
    { id: 4, value: "4" },
    { id: 5, value: "5" },
  ];

  const handleSlotSubmit = (e) => {
    if (Internal === false) {
      //If calling from Website Front end clinic page
      e.preventDefault();
      toggle();
      petMedDetailstoggle();
      setSlotKey("");
    } else {
      if (blockSlot === true) {
        //Submitted from Clinic Login for Slot Blocking
        dispatch(
          clinicBlockSlots({
            data: { start_time: slotVal, date: slotDate, timeslot_id: slotId },

            callback: () =>
              dispatch(
                getClinicAppointmentDetails({
                  data: { status: "all", sort_order: "desc" },
                })
              ),
          })
        );
      } else {
        //Submitted from Clinic Login for Reschedule
        dispatch(
          clinicAppointmentReschedule({
            data: {
              appointment_id: promptMessage?.id,
              start_time: slotVal,
              date: slotDate,
              timeslot_id: slotId,
            },
            callback: () =>
              dispatch(
                getClinicAppointmentDetails({ data: { status: "pending" } })
              ),
          })
        );
      }

      // petMedDetailstoggle();
    }
  };

  const auth = getLocalStorage("AUTH_DETAILS");

  const toggles = () => {
    if (Internal === false) {
      //If not calling from Clinic - Carer Admin
      if (auth?.user?.role == "pet_owner") {
        return;
      } else {
        toggle();
        Logintoggle();
        authToggle();
        setSlotVal("");
        setSlotKey("");
      }
    }
  };

  // console.log("REspDataslot", clinicData.reScheduleMessage);
  console.log("REspData", clinicData);

  return (
    <>
      <Modal
        isOpen={modal_center}
        toggle={toggle}
        style={{ maxWidth: "900px", width: "100%" }}
        centered
      >
        <ModalBody>
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 my-3">
            <div className="content-body ">
              {Slot.reScheduleMessage != "" ? (
                <div class="alert alert-success" role="alert">
                  {Slot.reScheduleMessage}
                </div>
              ) : (
                /* 
                <div className="clinic-modal-inner row ">
                  <div className="col-lg-7 col-md-5 col-sm-12 col-xs-12  d-flex px-0">
                  <img
                    className="clinic clinic-doc-img"
                    alt
                    src={
                      clinicData?.ClinicDetails?.clinic?.clinic_image
                        ? clinicData?.ClinicDetails?.clinic?.clinic_image
                        : avatar
                    }
                  />
                  <div className="ml-4 clinic-modal-title">
                    <h4 className="">
                      {" "}
                      {clinicData?.ClinicDetails?.details?.clinic?.clinic_name}
                    </h4>
                  </div>
                </div> 
                  
                </div>*/
                ""
              )}

              <Col xl="12">
                <div className="mb-0">
                  <Nav
                    tabs
                    className="nav-tabs-custom nav-justified mt-4 overflow-auto"
                  >
                    <NavItem
                      className={classnames({
                        nav_active: activeTab === "1",
                      })}
                      // className="mx-4"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (activeTab === "1") {
                          return;
                        } else {
                          setSlotDate(da1);
                          slot_toggle("1");
                          setSlotVal("");
                          dispatch(
                            getClinicSlotById({
                              data: {
                                clinic_id: id,
                                day: "d1",
                                action: "slots",
                                internal: Internal,
                              },
                            })
                          );
                        }
                      }}
                    >
                      <p className="font-weight-bold mb-2">
                        Today
                      </p>
                      {/* {clinicData?.tab_loading && activeTab === "1" ? (
                        <i
                          className="fa fa-spinner fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <p className="clinic-slot">
                          {clinicData?.ClinicDetails?.d1_count
                            ? clinicData?.ClinicDetails?.d1_count
                            : clinicData?.ClinicSlotDetails?.d1_count
                            ? clinicData?.ClinicSlotDetails?.d1_count
                            : "No"}{" "}
                          Slots available
                        </p>
                      )} */}
                      <hr
                        className={`${activeTab === "1" ? "active-slot" : ""}`}
                      />
                    </NavItem>
                    <NavItem
                      className={classnames({
                        nav_active: activeTab === "2",
                      })}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (activeTab === "2") {
                          return;
                        } else {
                          setSlotDate(da2);
                          slot_toggle("2");
                          setSlotVal("");
                          dispatch(
                            getClinicSlotById({
                              data: {
                                clinic_id: id,
                                day: "d2",
                                action: "slots",
                                internal: Internal,
                              },
                            })
                          );
                        }
                      }}
                    >
                      <p className="font-weight-bold mb-2">Tommorow</p>
                      {/* {clinicData?.tab_loading && activeTab == "2" ? (
                        <i
                          className="fa fa-spinner fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <p className="clinic-slot">
                          {clinicData?.ClinicDetails?.d2_count
                            ? clinicData?.ClinicDetails?.d2_count
                            : clinicData?.ClinicSlotDetails?.d2_count
                            ? clinicData?.ClinicSlotDetails?.d2_count
                            : "No"}{" "}
                          Slots available
                        </p>
                      )} */}
                      <hr
                        className={` ${activeTab === "2" ? "active-slot" : ""}`}
                      />
                    </NavItem>
                    <NavItem
                      className={classnames({
                        nav_active: activeTab === "3",
                      })}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (activeTab === "3") {
                          return;
                        } else {
                          setSlotDate(da3);
                          slot_toggle("3");
                          setSlotVal("");
                          dispatch(
                            getClinicSlotById({
                              data: {
                                clinic_id: id,
                                day: "d3",
                                action: "slots",
                                internal: Internal,
                              },
                            })
                          );
                        }
                      }}
                    >
                      <p className="font-weight-bold mb-2">{day3}</p>
                      {/* {clinicData?.tab_loading && activeTab == "3" ? (
                        <i
                          className="fa fa-spinner fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <p className="clinic-slot">
                          {clinicData?.ClinicDetails?.d3_count
                            ? clinicData?.ClinicDetails?.d3_count
                            : clinicData?.ClinicSlotDetails?.d3_count
                            ? clinicData?.ClinicSlotDetails?.d3_count
                            : "No"}{" "}
                          Slots available
                        </p>
                      )} */}
                      <hr
                        className={`${activeTab === "3" ? "active-slot" : ""}`}
                      />
                    </NavItem>
                    <NavItem
                      className={classnames({
                        nav_active: activeTab === "4",
                      })}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (activeTab === "4") {
                          return;
                        } else {
                          setSlotDate(da4);
                          slot_toggle("4");
                          setSlotVal("");
                          dispatch(
                            getClinicSlotById({
                              data: {
                                clinic_id: id,
                                day: "d4",
                                action: "slots",
                                internal: Internal,
                              },
                            })
                          );
                        }
                      }}
                    >
                      <p className="font-weight-bold mb-2">{day4}</p>
                      {/* {clinicData?.tab_loading && activeTab == "4" ? (
                        <i
                          className="fa fa-spinner fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <p className="clinic-slot">
                          {clinicData?.ClinicDetails?.d4_count
                            ? clinicData?.ClinicDetails?.d4_count
                            : clinicData?.ClinicSlotDetails?.d4_count
                            ? clinicData?.ClinicSlotDetails?.d4_count
                            : "No"}{" "}
                          Slots available
                        </p>
                      )} */}
                      <hr
                        className={`${activeTab === "4" ? "active-slot" : ""}`}
                      />
                    </NavItem>
                    <NavItem
                      className={classnames({
                        nav_active: activeTab === "5",
                      })}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (activeTab === "5") {
                          return;
                        } else {
                          setSlotDate(da5);
                          slot_toggle("5");
                          setSlotVal("");
                          dispatch(
                            getClinicSlotById({
                              data: {
                                clinic_id: id,
                                day: "d5",
                                action: "slots",
                                internal: Internal,
                              },
                            })
                          );
                        }
                      }}
                    >
                      <p className="font-weight-bold mb-2">{day5}</p>
                      {/* {clinicData?.tab_loading && activeTab == "5" ? (
                        <i
                          className="fa fa-spinner fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <p className="clinic-slot">
                          {clinicData?.ClinicDetails?.d5_count
                            ? clinicData?.ClinicDetails?.d5_count
                            : clinicData?.ClinicSlotDetails?.d5_count
                            ? clinicData?.ClinicSlotDetails?.d5_count
                            : "No"}{" "}
                          Slots available
                        </p>
                      )} */}
                      <hr
                        className={`${activeTab === "5" ? "active-slot" : ""}`}
                      />
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeTab} className="p-4 ml-3">
                    {tabpanes.map((tabpane) => (
                      <TabPane tabId={tabpane.value} key={tabpane.id}>
                        {/* {clinicData?.ClinicDetails?.slots?.length == 0 ? (
                          <p className="text-center">No Slots Available</p>
                        ) : null} */}

                        {clinicData?.ClinicSlotDetails?.slots?.length &&
                        !clinicData?.tab_loading ? (
                          clinicData?.ClinicSlotDetails?.slots?.map(
                            (slot, i) => (
                              <>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <h4
                                      className="mb-4"
                                      style={{ display: "inline" }}
                                    >
                                      {slot?.doctor_name}
                                    </h4>
                                    {/* <OverlayTrigger
                                      placement="top"
                                      overlay={doctorHelpTooltip}
                                    >
                                      <p
                                        className="fas fa-question-circle doc-disclaimer"
                                        id="tooltip"
                                      ></p>
                                    </OverlayTrigger> */}
                                    {/* <ToolTipComponent
                                      text="We understand your preference and will provide the same; subject to availability."
                                      placement="right"
                                      target="tooltip"
                                    /> */}
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="pull-right">
                                      <h5>
                                        <b>Rs:{slot?.doctor_fee}</b>
                                      </h5>
                                    </div>
                                  </div>
                                </div>
                                {slot?.slots?.length ? (
                                  slot?.slots?.map((data) => (
                                    <>
                                      <button
                                        disabled={data?.active != "active"}
                                        className={`btn slots-btn ${
                                          slotKey ===
                                          `${data?.slot_id}:${data?.time}`
                                            ? "active-slot-time"
                                            : ""
                                        } ${
                                          data?.active == "booked"
                                            ? "slot-unavailabe-btn"
                                            : data?.active == "unavailable"
                                            ? "slot-unavailabe-btn"
                                            : data?.active == "pending"
                                            ? "slot-requested-btn"
                                            : data?.active == "blocked"
                                            ? "slot-blocked-btn"
                                            : ""
                                        }`}
                                        onClick={() => {
                                          setSlotKey(
                                            `${data?.slot_id}:${data?.time}`
                                          );
                                          setSlotVal(data?.time);
                                          setSlotId(data?.slot_id);
                                          toggles();
                                        }}
                                      >
                                        {data.time}
                                      </button>
                                    </>
                                  ))
                                ) : !slot?.length ? (
                                  <p className="text-center">
                                    No Slots Available
                                  </p>
                                ) : null}
                              </>
                            )
                          )
                        ) : clinicData?.tab_loading ? (
                          <>
                            <p className="text-center">
                              Checking doctor's availability{"   "}
                              <i
                                className="fa fa-spinner fa-spin"
                                aria-hidden="true"
                              ></i>
                            </p>
                          </>
                        ) : (
                          <p className="text-center">
                            No appointments are available on this day
                          </p>
                        )}
                      </TabPane>
                    ))}
                  </TabContent>
                </div>
              </Col>
            </div>
            <div className="ml-4 mt-3 d-flex">
              <div className="d-flex">
                <div className="active-indicator mt-1"></div>
                <span className="ml-2">Available</span>
              </div>
              <div className="d-flex ml-3">
                <div className="requested-indicator mt-1"></div>
                <span className="ml-2">Unavailable</span>
              </div>
              <div className="d-flex ml-3">
                <div className="booked-indicator mt-1"></div>
                <span className="ml-2">Requested</span>
              </div>
              {Internal === true ? (
                <>
                  <div className="d-flex ml-3">
                    <div className="blocked-indicator mt-1"></div>
                    <span className="ml-2">Blocked</span>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="text-right">
            <Button
              className="slot-submit-btn"
              onClick={handleSlotSubmit}
              disabled={slotVal == "" ? true : false}
            >
              Submit
            </Button>{" "}
            <Button className="slot-submit-btn" onClick={toggle}>
              Close
            </Button>
          </div>
        </ModalBody>
      </Modal>
      <PetMedDetailsForm
        modal_petmeddetails_center={petMedDetailsModal}
        petmedDetailsToggle={petMedDetailstoggle}
        clinicId={clinicId}
        slotTime={slotVal}
        slotId={slotId}
        slotDate={slotDate}
      />
      <Login
        modal_center={loginmodal}
        setmodal_center={setLoginModal}
        login_toggle={Logintoggle}
        setCustError={setCustError}
        custError={custError}
      />
    </>
  );
};

export default BookSlot;
