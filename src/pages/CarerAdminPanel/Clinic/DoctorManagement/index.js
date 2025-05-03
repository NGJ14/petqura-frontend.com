import React, { useEffect, useState, useRef } from "react";
import { Container, Row, UncontrolledAlert } from "reactstrap";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../../../components/UI/Tables/Breadcrumb";
import OrderFilter from "./HeaderFilter";
import Datatable from "../../../../components/UI/Tables/Datatable";

import { DoctorData } from "../../../../helpers/columns";
import Delete_icon from "../../../../assets/icons/ebud-icons/Delete.svg";
import Edit_icon from "../../../../assets/icons/ebud-icons/Edit.svg";
import ConfirmationAlert from "../../../../components/confiramtionAlert";
import Loader from "../../../../components/UI/Loader";

import { getLocalStorage } from "../../../../helpers/utils";
import {
  deleteDoctorDetails,
  deleteSlotDetails,
  getDoctorDetails,
  getSlotDetails,
  publishDoctor,
} from "../../../../store/serviceProvider/Clinic/action";

// import Loader from "../../components/Common/Loader";

const Doctors = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const slot = useSelector((state) => state.Slot);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});
  const [order, setOrder] = useState();
  const [changeValue, setChangeValue] = useState(false);
  const [id, setId] = useState(null);
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
    dispatch(getDoctorDetails({ request }));
  }, [request]);

  useEffect(() => {
    setRequest({ ...basicRequest });
  }, [history?.location?.state?.from]);

  const auth = getLocalStorage("AUTH_DETAILS");

  const okHandler = () => {
    if (promptMessage == "delete") {
      dispatch(
        deleteDoctorDetails({
          data: { doctor_id: promptMessage.id },
          callback: () => dispatch(getDoctorDetails(request)),
        })
      );
    } else {
      dispatch(
        publishDoctor({
          data: { doctor_id: promptMessage.id },
          callback: () => dispatch(getDoctorDetails(request)),
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

  const publishromptHandler = (id, active) => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: id,
      title: "",
      content: `Are you sure you want to ${
        active ? "disable" : "enable"
      }  this doctor`,
      type: "publish",
    });
  };

  const formatslotData =
    slot?.Doctor?.doctors?.length &&
    slot?.Doctor?.doctors?.map((doctor, index) => ({
      no: (request?.page - 1) * request?.page_count + index + 1,

      name: <div title={doctor.doctor_name}>{doctor.doctor_name}</div>,
      qualifications: (
        <div title={doctor.qualifications}>{doctor.qualifications}</div>
      ),
      description: <div title={doctor.description}>{doctor.description}</div>,

      actions: (
        <div className="cust-table-actions-wrap">
          <button
            className=" color-violet action-btn"
            title="Edit"
            onClick={() =>
              history.push(`/carer/clinic/doctor-edit/${doctor.doctor_id}`)
            }
          >
            <img src={Edit_icon} alt="Edit" />
          </button>
          <button
            onClick={() =>
              deletePromptHandler(doctor?.doctor_id, doctor?.active)
            }
            className=" color-red action-btn"
            title="Delete"
          >
            <img src={Delete_icon} alt="Delete" />
          </button>
          <button
            onClick={() =>
              publishromptHandler(doctor?.doctor_id, doctor?.active)
            }
            className="  action-btn"
            title={`${doctor?.active ? "Disable Doctor" : "Enable Doctor"}`}
          >
            <span
              className={`badge ${
                doctor?.active ? "bg-danger" : "bg-success"
              } `}
            >
              {doctor?.active ? "DISABLE" : "ENABLE"}
            </span>
            {/* <img src={Delete_icon} alt="Delete" /> */}
          </button>
        </div>
      ),
    }));

  const addNewClickHandler = () => {
    history.push("/carer/clinic/add-doctor");
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
          <Breadcrumbs title="Tables" breadcrumbItem="Doctors" />
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
            columns={DoctorData}
            add
            search
            addNewClickHandler={addNewClickHandler}
            request={request}
            setRequest={setRequest}
            // searchTerm={productData?.request?.keyword}
            // totalRecords={productData?.data?.total}
            loading={slot?.loading}
            addNewLabel="ADD DOCTOR"
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
      {slot?.loading && <Loader />}
    </div>
  );
};

export default Doctors;
