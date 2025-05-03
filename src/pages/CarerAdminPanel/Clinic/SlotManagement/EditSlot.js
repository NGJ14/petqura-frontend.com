import React, { useEffect, useState } from "react";
import { Col, Card, Row, UncontrolledAlert, Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Prompt, useParams } from "react-router-dom";

import BackButton from "../../../../components/UI/BackButton";
import Breadcrumbs from "../../../../components/UI/Tables/Breadcrumb";
import Loader from "../../../../components/UI/Loader";
import ConfirmationAlert from "../../../../components/confiramtionAlert";
import SuccessConfirmationAlert from "../../../../components/SuccessConfirmationAlert";
import {
  editSlotDetails,
  getDoctorDetails,
  getSlotById,
} from "../../../../store/serviceProvider/Clinic/action";

const EditSlot = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [slotInterval, setSlotInterval] = useState("");
  const [date, setDate] = useState("");
  const [modal, setModal] = useState(false);

  const [docCount, setDocCount] = useState("");
  const [formChanged, setFormChanged] = useState(false);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});
  const [backToListing, setBackToListing] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [price, setPrice] = useState("");
  const [docName, setDocName] = useState("");

  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const slot = useSelector((state) => state.Slot);

  const toggle = () => {
    setModal(!modal);
    setFormChanged(false);
  };

  useEffect(() => {
    if (
      date == "" ||
      slotInterval == "" ||
      from == "" ||
      to == "" ||
      price == "" ||
      docCount == ""
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [date, slotInterval, from, to, price, docCount]);

  const handleValidSubmit = (event, values) => {
    event.preventDefault();
    const Slot = {
      time_slot_id: params.id,
      day_of_week: date,
      start_time: from,
      end_time: to,
      slot_time: slotInterval,
      doctor_id: docName,
      slot_price: price,
    };
    dispatch(
      editSlotDetails({
        Slot: Slot,
        callback: () => {
          // toggle();
          history.push("/carer/clinic/slots");
        },
      })
    );
  };

  const basicRequest = {
    sort: "time_created",
    sort_order: "desc",
  };

  const [request, setRequest] = useState({ ...basicRequest });

  useEffect(() => {
    dispatch(getDoctorDetails({ request }));
  }, [request]);

  useEffect(() => {
    dispatch(getSlotById({ data: { time_slot_id: params.id } }));
  }, []);

  useEffect(() => {
    slot?.SlotDetails?.day == "Monday"
      ? setDate(0)
      : setDate(slot?.SlotDetails?.day_of_week);
    slot?.SlotDetails?.start_time && setFrom(slot.SlotDetails.start_time);
    slot?.SlotDetails?.end_time && setTo(slot.SlotDetails.end_time);
    slot?.SlotDetails?.slot_time &&
      setSlotInterval(slot?.SlotDetails?.slot_time);
    slot?.SlotDetails?.slot_price && setPrice(slot?.SlotDetails?.slot_price);
    slot?.SlotDetails?.doctor?.doctor_id &&
      setDocName(slot?.SlotDetails?.doctor?.doctor_id);
  }, [slot?.SlotDetails?.day_of_week]);

  const confirmBack = () => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: "",
      content: "New Slot Added Successfully",
      type: "back",
    });
  };

  const redirectMethod = () => {
    // dispatch(resetErrorWithUsername());
    setBackToListing(true);
  };
  const confirmBrowserBack = () => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: "",
      content:
        "Are you sure you want to leave the page without saving your changes?",
      type: "back",
      title: "Alert",
    });
    return backToListing ? true : false;
  };

  const DayOfWeek = [
    { id: 0, value: "Monday" },
    { id: 1, value: "Tuesday" },
    { id: 2, value: "Wednesday" },
    { id: 3, value: "Thursday" },
    { id: 4, value: "Friday" },
    { id: 5, value: "Saturday" },
    { id: 6, value: "Sunday" },
    { id: 7, value: "select" },
  ];

  return (
    // return !location?.state?.fromAddProductImage ? (
    //   <Redirect to="/carer/seller/product-addNew" />
    // ) : (
    <div className="page-content cust-page" data-testid="component-faqAddNew">
      <Prompt
        when={formChanged}
        message={(location, action) => {
          if (action === "POP") {
            return confirmBrowserBack();
          }
        }}
      />

      {/* <BackButton
        label="Slots"
        handleClick={() => history.push("/carer/clinic/slots")}
        // handleClick={() => (formChanged ? confirmBack() : redirectMethod())}
      /> */}
      <Breadcrumbs title="Tables" breadcrumbItem="Edit Slots" />
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
      <form
        onSubmit={(e, v) => {
          handleValidSubmit(e, v);
        }}
      >
        <Col xl="8">
          <Card className="p-4">
            <Row className="form-group addUsernameFieldWrap">
              <div className="checkAvailabilityWrap col-lg-4 col-md-6">
                <label className="cust-label text-left">
                  Day Of Week
                  <span className="mandatory">*</span>
                </label>

                <select
                  className="form-control"
                  value={date}
                  name="Date"
                  onChange={(e) => {
                    setFormChanged(true);
                    setDate(e.target.value);
                  }}
                  style={{ padding: "5px ", background: "#fff" }}
                >
                  {DayOfWeek?.map((day) => (
                    <option value={day.id}>{day.value}</option>
                  ))}
                </select>
              </div>
            </Row>

            <Row className="form-group addUsernameFieldWrap">
              <div className="checkAvailabilityWrap col-lg-4 col-md-6">
                <label className="cust-label text-left">
                  Start Time
                  <span className="mandatory">*</span>
                </label>

                <Input
                  value={from}
                  type="time"
                  name="product_name"
                  className="form-control"
                  placeholder="Enter Start Time"
                  onChange={(e) => {
                    setFormChanged(true);
                    setFrom(e.target.value);
                  }}
                />
              </div>
            </Row>

            <Row className="form-group  addUsernameFieldWrap">
              <div className="checkAvailabilityWrap col-lg-4 col-md-6">
                <label className="cust-label text-left">
                  End Time
                  <span className="mandatory">*</span>
                </label>

                <Input
                  value={to}
                  type="time"
                  name="product_name"
                  className="form-control"
                  placeholder="Enter End Time"
                  onChange={(e) => {
                    setFormChanged(true);
                    setTo(e.target.value);
                  }}
                />
              </div>
            </Row>

            <Row className="form-group addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-4 col-md-6">
                <label className="cust-label text-left">
                  Enter Slot Time in minutes
                  <span className="mandatory">*</span>
                </label>
                <Input
                  value={slotInterval}
                  name="product_description"
                  placeholder="Enter Slot Time"
                  className="form-control"
                  onChange={(e) => {
                    setFormChanged(true);
                    setSlotInterval(e.target.value);
                  }}
                />
              </div>
            </Row>

            <Row className="form-group addUsernameFieldWrap">
              <div className="checkAvailabilityWrap col-lg-4 col-md-6">
                <label className="cust-label text-left">
                  Enter Doctor Name
                  <span className="mandatory">*</span>
                </label>

                <select
                  className="form-control"
                  value={docName}
                  name="Date"
                  onChange={(e) => {
                    setFormChanged(true);
                    setDocName(e.target.value);
                  }}
                  style={{ padding: "5px ", background: "#fff" }}
                >
                  {slot?.Doctor?.doctors?.length &&
                    slot?.Doctor?.doctors?.map((doc) => (
                      <option value={doc?.doctor_id}>{doc?.doctor_name}</option>
                    ))}
                </select>
              </div>
            </Row>

            <Row className="form-group addUsernameFieldWrap">
              <div className="checkAvailabilityWrap  col-lg-4 col-md-6">
                <label className="cust-label text-left">
                  Enter slot price
                  <span className="mandatory">*</span>
                </label>
                <Input
                  value={price}
                  className="form-control"
                  name="product_description"
                  placeholder="Enter slot price"
                  onChange={(e) => {
                    setFormChanged(true);
                    setPrice(e.target.value);
                  }}
                />
              </div>
            </Row>

            <div className="form-group">
              <a href="/carer/clinic/slots">
                <button
                  type="button"
                  class="btn waves-effect waves-light cust_no_shadow cust-save-btn cust-saveButton"
                >
                  Back
                </button>
              </a>
              <button
                type="submit"
                className="btn waves-effect waves-light cust_no_shadow cust-save-btn cust-saveButton"
                // disabled={disableSubmit ? true : false}
              >
                SAVE
              </button>
            </div>
          </Card>
        </Col>
      </form>

      <ConfirmationAlert
        {...promptMessage}
        modal_center={showPromptPopUp}
        setmodal_center={setShowPromptPopUp}
        onOK={redirectMethod}
      />

      <SuccessConfirmationAlert
        modal_center={modal}
        setmodal_center={setModal}
        content="New Variant added successfully"
        toggle={toggle}
      />
      {slot?.loading && <Loader />}
    </div>
  );
};

export default EditSlot;
