import React, { useEffect, useState, useRef } from "react";
import { Container, Row, UncontrolledAlert } from "reactstrap";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../../../components/UI/Tables/Breadcrumb";
import Datatable from "../../../../components/UI/Tables/Datatable";

import { SlotData } from "../../../../helpers/columns";
import Delete_icon from "../../../../assets/icons/ebud-icons/Delete.svg";
import Edit_icon from "../../../../assets/icons/ebud-icons/Edit.svg";
import ConfirmationAlert from "../../../../components/confiramtionAlert";
import Loader from "../../../../components/UI/Loader";

import { getLocalStorage } from "../../../../helpers/utils";
import {
  deleteSlotDetails,
  editSlotStatusDetails,
  getSlotDetails,
  getSlotPriceDetails,
} from "../../../../store/serviceProvider/Clinic/action";
import SlotFeePopUp from "./SlotFeePopUp";

const Slots = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const slot = useSelector((state) => state.Slot);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});
  const [slotPopUp, setSlotPopUp] = useState(false);
  const [status, setStatus] = useState("placed");
  const [priceError, setPriceError] = useState("");
  const orderStatus = [
    { id: 1, value: "completed" },
    { id: 2, value: "placed" },
    { id: 3, value: "shipped" },
  ];

  const warningAlertRef = useRef(null);
  const pageWrapRef = useRef(null);

  const basicRequest = {
    sort: "time_created",
    sort_order: "desc",
    page: 1,
    page_count: 50,
  };

  const [request, setRequest] = useState({ ...basicRequest });

  useEffect(() => {
    dispatch(getSlotDetails({ request }));
  }, [status, request]);

  // useEffect(() => {
  //   dispatch(getSlotPriceDetails());
  // }, []);

  useEffect(() => {
    setRequest({ ...basicRequest });
  }, [history?.location?.state?.from]);

  const auth = getLocalStorage("AUTH_DETAILS");

  const okHandler = () => {
    if (promptMessage?.type == "delete") {
      dispatch(
        deleteSlotDetails({
          data: { time_slot_id: promptMessage.id },
          callback: () => dispatch(getSlotDetails(request)),
        })
      );
    } else {
      dispatch(
        editSlotStatusDetails({
          Slot: { slot_id: promptMessage.id },
          callback: () => dispatch(getSlotDetails(request)),
        })
      );
    }
  };

  const deletePromptHandler = (id) => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: id,
      title: "",
      content: "Are you sure you want to delete this Slot",
      type: "delete",
    });
  };

  const changeStatusPromptHandler = (id, available) => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: id,
      title: "",
      content: `Are you sure you want to make this Slot ${
        available ? "Unavailable" : "Available"
      }`,
      type: "channgeStatus",
    });
  };

  const formatslotData =
    slot?.Slot?.slot_details?.length &&
    slot?.Slot?.slot_details?.map((slot, index) => ({
      no: (request?.page - 1) * request?.page_count + index + 1,
      doctor: (
        <div title={slot.doctor.doctor_name}>{slot.doctor.doctor_name}</div>
      ),
      day: <div title={slot.variant_name}>{slot.day}</div>,
      start_time: <div title={slot.slot_status}>{slot.start_time}</div>,
      end_time: <div title={slot.price}>{slot.end_time}</div>,
      slot_time: <div title={slot.quantity}>{slot.slot_time}</div>,
      slot_price: <div title={slot.slot_price}>{slot.slot_price}</div>,
      actions: (
        <div className="cust-table-actions-wrap">
          <button
            onClick={() =>
              changeStatusPromptHandler(slot.slot_id, slot?.is_available)
            }
            className="  action-btn"
            title={`${
              slot?.is_available
                ? "Make Slot Unavailable"
                : "Make Slot Available"
            }`}
          >
            <span
              className={`badge ${
                slot?.is_available ? "bg-danger" : "bg-success"
              } `}
            >
              {slot?.is_available ? "DISABLE" : "ENABLE"}
            </span>
            {/* <img src={Delete_icon} alt="Delete" /> */}
          </button>
          <button
            className=" color-violet action-btn"
            title="Edit"
            onClick={() =>
              history.push(`/carer/clinic/slot-edit/${slot.slot_id}`)
            }
          >
            <img src={Edit_icon} alt="Edit" />
          </button>
          <button
            onClick={() => deletePromptHandler(slot.slot_id)}
            className=" color-red action-btn"
            title="Delete"
          >
            <img src={Delete_icon} alt="Delete" />
          </button>
        </div>
      ),
    }));

  const addNewClickHandler = () => {
    history.push("/carer/clinic/add-slot");
  };

  return !auth?.user?.profile_completed ? (
    <Redirect to="/carer/complete-profile" />
  ) : !auth?.user?.admin_approved ? (
    <Redirect to="/carer/under-verification" />
  ) : (
    <div
      className="page-content cust-page"
      data-testid="component-faqList"
      id="reserveUNList"
      ref={pageWrapRef}
    >
      <Container fluid>
        <Row className="my-5">
          <div className="d-flex justify-content-between">
            <Breadcrumbs title="Tables" breadcrumbItem="Slots" />
            {slot?.slotPrice?.slot_price ? (
              <h5
                className="orange-font mr-4 mt-5"
                style={{ fontSize: "18px" }}
              >
                Current Slot Price: {slot?.slotPrice?.slot_price}
              </h5>
            ) : (
              <p className="text-danger font-weight-500 mr-4 mt-5">
                {priceError}
              </p>
            )}
          </div>
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

          <Datatable
            defaultSortField={"modified_on"}
            defaultSortAsc={false}
            tableID={"slot"}
            rows={formatslotData}
            columns={SlotData}
            add
            // addFee
            // addFeeClickHandler={addFeeClickHandler}
            search
            addNewClickHandler={addNewClickHandler}
            request={request}
            setRequest={setRequest}
            // searchTerm={productData?.request?.keyword}
            // totalRecords={productData?.data?.total}
            searchTerm
            loading={slot?.loading}
            addNewLabel="ADD SLOT"
            tableCardClassName={"snoTable"}
            noPagination
          />
        </Row>
      </Container>

      <ConfirmationAlert
        {...promptMessage}
        modal_center={showPromptPopUp}
        setmodal_center={setShowPromptPopUp}
        onOK={okHandler}
      />
      <SlotFeePopUp
        modal_center={slotPopUp}
        setmodal_center={setSlotPopUp}
        slotprice={slot?.slotPrice?.slot_price}
      />
      {slot?.loading && <Loader />}
    </div>
  );
};

export default Slots;
