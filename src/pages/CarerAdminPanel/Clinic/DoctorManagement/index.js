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
  getDoctorDetails,
  publishDoctor,
} from "../../../../store/serviceProvider/Clinic/action";

const Doctors = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const slot = useSelector((state) => state.Slot);

  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});
  const warningAlertRef = useRef(null);
  const pageWrapRef = useRef(null);

  const basicRequest = {
    sort: "time_created",
    sort_order: "desc",
    page: 1,
    page_count: 10,
  };

  const [request, setRequest] = useState({ ...basicRequest });

  // Fetch doctor list when page or sort changes
  useEffect(() => {
    dispatch(getDoctorDetails({ request }));
  }, [request]);

  // Reset pagination when navigating from another page
  useEffect(() => {
    setRequest({ ...basicRequest });
  }, [history?.location?.state?.from]);

  const auth = getLocalStorage("AUTH_DETAILS");

  // Handle delete or enable/disable actions
  const okHandler = () => {
    if (promptMessage.type === "delete") {
      dispatch(
        deleteDoctorDetails({
          data: { doctor_id: promptMessage.id },
          callback: () => dispatch(getDoctorDetails(request)),
        })
      );
    } else if (promptMessage.type === "publish") {
      dispatch(
        publishDoctor({
          data: { doctor_id: promptMessage.id },
          callback: () => dispatch(getDoctorDetails(request)),
        })
      );
    }
  };

  const deletePromptHandler = (id) => {
    setShowPromptPopUp(true);
    setPromptMessage({
      id,
      title: "",
      content: "Are you sure you want to delete this doctor?",
      type: "delete",
    });
  };

  const publishPromptHandler = (id, active) => {
    setShowPromptPopUp(true);
    setPromptMessage({
      id,
      title: "",
      content: `Are you sure you want to ${
        active ? "disable" : "enable"
      } this doctor?`,
      type: "publish",
    });
  };

  // Pagination-aware slicing for frontend limit
  const formatslotData = slot?.Doctor?.doctors
    ?.slice(
      (request.page - 1) * request.page_count,
      request.page * request.page_count
    )
    ?.map((doctor, index) => ({
      no: (request.page - 1) * request.page_count + index + 1,

      name: (
        <div className="flex items-center gap-2" title={doctor.doctor_name}>
          <img
            src={
              doctor.profile_photo
                ? doctor.profile_photo
                : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="Doctor Avatar"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "10px",
            }}
          />
          <span>{doctor.doctor_name}</span>
        </div>
      ),
      qualifications: (
        <div title={doctor.qualifications}>{doctor.qualifications}</div>
      ),
      description: <div title={doctor.description}>{doctor.description}</div>,

      actions: (
        <div className="cust-table-actions-wrap">
          <button
            className="color-violet action-btn"
            title="Edit"
            onClick={() =>
              history.push(`/carer/clinic/doctor-edit/${doctor.doctor_id}`)
            }
          >
            <img src={Edit_icon} alt="Edit" />
          </button>
          <button
            onClick={() => deletePromptHandler(doctor?.doctor_id)}
            className="color-red action-btn"
            title="Delete"
          >
            <img src={Delete_icon} alt="Delete" />
          </button>
          <button
            onClick={() =>
              publishPromptHandler(doctor?.doctor_id, doctor?.active)
            }
            className="action-btn"
            title={`${doctor?.active ? "Disable Doctor" : "Enable Doctor"}`}
          >
            <span
              className={`badge ${
                doctor?.active ? "bg-danger" : "bg-success"
              } `}
            >
              {doctor?.active ? "DISABLE" : "ENABLE"}
            </span>
          </button>
        </div>
      ),
    }));

  const addNewClickHandler = () => {
    history.push("/carer/clinic/add-doctor");
  };

  // Handle page change instantly without backend reload
  const handlePageChange = (newPage) => {
    setRequest((prev) => ({
      ...prev,
      page: newPage,
    }));
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
        <Row>
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
            totalRecords={slot?.Doctor?.doctors?.length || 0} // total from full dataset
            loading={slot?.loading}
            addNewLabel="ADD DOCTOR"
            tableCardClassName={"snoTable"}
            onPageChange={handlePageChange} // instant pagination
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
