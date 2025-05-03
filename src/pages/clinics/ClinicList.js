import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getClinicDetails } from "../../store/UserStore/Clinic/action";
import avatar from "../../assets/images/user/Fa6SolidHospital.svg";

import BookSlot from "./BookSlot";
import BookAppointmentProvider from "../../contexts/BookAppointment";
import ClinicBox from "./ClinicBox";
import { styled } from "styled-components";

const ClinicList = () => {
  const [modal, setModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [clinicId, setClinicId] = useState();
  const clinicData = useSelector((state) => state.Clinic);
  const toggle = () => {
    setModal(!modal);
  };

  // const dispatch = useDispatch();

  // const basicRequest = {
  //   page: 1,
  //   page_count: 9,
  //   keyword: "",
  // };

  // const [request, setRequest] = useState({ ...basicRequest });

  // useEffect(() => {
  //   dispatch(getClinicDetails({ request: request }));
  // }, [request]);

  // const handleSearchClick = (e) => {
  //   e.preventDefault();
  //   setRequest({ ...request, keyword: searchText });
  // };

  const HandleBookAppoinment = (id) => {
    toggle();
    setClinicId(id);
  };

  return (
    <BookAppointmentProvider>
      <div className="common-container main-content">
        <div className="text-center">
          {clinicData?.error ==
          "We are facing some technical issue, please try after sometime" ? (
            <p className="font-16 mandatory font-weight-bold">
              {clinicData?.error}
            </p>
          ) : null}
        </div>

        {/* <div className="col-md-8 col-sm-8 mt-5 px-0 ">
        <div className="SearchWrapper d-flex">
          <form onSubmit={handleSearchClick} className=" col-lg-7 pl-0">
            <div className="input-group w-100">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="Search"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
              <div className="input-group-append">
                <button
                  className="input-group-text"
                  id="basic-addon2"
                  style={{
                    color: "#00419D",
                    borderTopRightRadius: "5px",
                    borderBottomRightRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      */}
        <ClinicHeadMain>
          Stay <span>Connected</span> With Us
        </ClinicHeadMain>
        <ClinicBoxWrapper>
          {clinicData?.Clinic?.clinics?.length ? (
            clinicData?.Clinic?.clinics?.map((clinic) => (
              <>
                {/*     <div className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 my-3 ">
            <div className="content-body ">
              <div className="clinic-inner row ">
                <div className="col-lg-7 col-md-8 col-sm-12 col-xs-12   px-0 clinic-doc-responsive">
                  <img
                    className="clinic clinic-doc-img "
                    alt
                    src={clinic?.clinic_image ? clinic?.clinic_image : avatar}
                  />

                  <div className="clinic-main-detail-container col-xs-12">
                    <h5 className=" clinic-title ">{clinic?.clinic_name} </h5>
                    <p className="clinic-text text-muted">{`${
                      clinic?.clinic_services ? clinic?.clinic_services : ""
                    } ${clinic?.clinic_services ? "..." : ""}`}</p>
                    <div className="mt-3">
                      <div className="d-flex ">
                        <span className="font-weight-bold ml-2 mt-3">
                          <i
                            className="fa fa-map-marker clinic-icon"
                            aria-hidden="true"
                          ></i>
                        </span>
                        <p className="clinic-text mt-3 ml-4 text-muted text-left">
                          {clinic.clinic_address_line_1}
                          {clinic.clinic_address_line_2 &&
                            `,
                          ${clinic.clinic_address_line_2}`}
                        </p>
                      </div>
                      <div className="d-flex ">
                        <span className="font-weight-bold ml-0 mt-3">
                          <i
                            className="fas fa-city clinic-icon font-orange"
                            aria-hidden="true"
                          ></i>
                        </span>
                        <p className="clinic-text mt-3 ml-3 text-muted">
                          {clinic.clinic_city}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 col-lg-5 col-md-6 col-sm-8 col-xs-12 ml-0 pl-0 clinic-speciality-text text-right">
                  {clinic?.services?.length ? (
                    <div>
                      <p className="font-weight-bold  mt-4">SPECIALITY</p>
                      {clinic?.services?.length
                        ? clinic?.services?.slice(0, 6)?.map((service, i) => (
                            <span className="mt-3 text-muted clinic-text ml-0">
                              {service?.service}
                              {i + 2 <= clinic?.services?.length
                                ? ","
                                : null}{" "}
                            </span>
                          ))
                        : null}
                    </div>
                  ) : null}
                  <div className="clinic-btn-container ">
                    <a
                      className=" btn btn-default font-weight-bold clinic-btn  "
                      onClick={() => {
                        HandleBookAppoinment(clinic?.clinic_id)
                      }}
                    >
                      Request an Appointment
                    </a>
                    <a
                      className=" btn btn-default font-weight-bold clinic-btn  "
                      type="submit"
                      href={`/clinic/${clinic?.clinic_id}`}
                    >
                      View More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          */}
                <ClinicBox
                  key={clinic?.clinic_name}
                  clinicLogo={clinic?.clinic_image}
                  clinicTitle={clinic?.clinic_name}
                  clinicLocation={clinic.clinic_address_line_2}
                  clinicConsultation={
                    clinic?.services?.length
                      ? clinic?.services?.slice(0, 6)?.map((service, i) => (
                          <span>
                            {service?.service}
                            {i + 2 <= clinic?.services?.length
                              ? ","
                              : null}{" "}
                          </span>
                        ))
                      : null
                  }
                  redirectLink={`/clinic/${clinic?.clinic_id}`}
                  clinicPrice={"Starts at 500/-"}
                  bookAppoinment={() => HandleBookAppoinment(clinic?.clinic_id)}
                />
              </>
            ))
          ) : (
            <></>
          )}
        </ClinicBoxWrapper>

        <BookSlot modal_center={modal} toggle={toggle} clinicId={clinicId} />
      </div>
    </BookAppointmentProvider>
  );
};

export default ClinicList;

const ClinicBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin: 10px 0px;
`;
const ClinicHeadMain = styled.h3`
  font-size: 35px;
  font-weight: normal;
  color: #333333;
  font-family: "Montserrat";
  margin: 3px auto;
  width: 80%;

  @media only screen and (max-width: 768px) {
    width: 100%;
    font-size: 30px;
    text-align: center;
  }

  & span {
    font-size: 35px;
    font-weight: bold;
    color: #00419d;
    margin: 3px 0px;

    @media only screen and (max-width: 768px) {
      font-size: 30px;
    }
  }
`;
