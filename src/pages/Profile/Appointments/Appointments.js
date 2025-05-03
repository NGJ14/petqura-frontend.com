import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { getAppointmentDetails } from "../../../store/UserStore/Appointments/action";
import ShopPagination from "../../../components/Pagination";
import Loader from "../../../components/UI/Loader";

const Appointments = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const AppointmentData = useSelector((state) => state.Appointment);
  const basicRequest = {
    page: 1,
    page_count: 8,
    keyword: "",
  };
  const location = useLocation();
  const [request, setRequest] = useState({ ...basicRequest });
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    setStatus(location?.state?.status);
  }, [location?.state?.status]);

  useEffect(() => {
    setRequest({ ...request, status: status });
  }, [status]);

  useEffect(() => {
    request && dispatch(getAppointmentDetails({ data: { ...request } }));
  }, [dispatch, request]);

  const handleStarRatingClick = (e) => {
    setStatus(e?.target?.value);
  };

  return (
    <>
      <div className="ml-0 ">
        <div className="col-lg-3 col-sm-5 col-md-6 mt-4 ml-4">
          <select
            id="sort"
            className="shop-select"
            value={status}
            onChange={(e) => handleStarRatingClick(e)}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled </option>
          </select>
        </div>
      </div>
      <section className="col-md-12 d-flex profile-content">
        <div className="container pt-0">
          <div className="section-content">
            <div>
              {AppointmentData?.appointments?.appointments?.length ? (
                AppointmentData?.appointments?.appointments?.map(
                  (appointment) => (
                    <div className="col-md-6">
                      <div className="icon-box bg-lighter text-center p-30 mt-sm-0 border-1px">
                        <h4 className="icon-box-title text-uppercase letter-space-3">
                          <p className="text-theme-colored">
                            Pet: {appointment?.pet_name}
                          </p>
                        </h4>
                        <h5>Doctor: {appointment?.doctor}</h5>
                        <h5 className="">
                          Clinic Name:{" "}
                          {appointment?.clinic_details?.clinic_name}{" "}
                        </h5>
                        <h5>Date: {appointment?.appointment_date}</h5>
                        <h5>
                          Time: {appointment?.start_time} -{" "}
                          {appointment?.end_time}
                        </h5>
                        <h5>Status: {appointment?.status?.toUpperCase()}</h5>
                        <div className="mt-4">
                          <button
                            onClick={() =>
                              history.push({
                                pathname: `/view-appointment/${appointment?.appointment_id}`,
                                state: { status: status },
                              })
                            }
                            className="btn btn-outline-dark btn-lg btn-light mr-4"
                            style={{ fontSize: "17px" }}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div>
                  <h4 className="text-center">No Appointments Found</h4>
                </div>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {AppointmentData?.appointments?.appointments?.length ? (
                <ShopPagination
                  totalRecords={AppointmentData?.appointments?.total}
                  loading={AppointmentData?.loading}
                  setRequest={setRequest}
                  request={request}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>
      {AppointmentData?.loading && <Loader />}
    </>
  );
};

export default Appointments;
