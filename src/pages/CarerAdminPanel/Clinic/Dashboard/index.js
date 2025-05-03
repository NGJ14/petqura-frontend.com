import React, { useEffect, useState } from "react";
import MultiBarChart from "../../../../components/Charts/Nvd3Chart/MultiBarChart";
import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router";
import { getLocalStorage } from "../../../../helpers/utils";
import { getCarerPersonalDetails } from "../../../../store/carer/action";
import DashboardCards from "./dashboardCards";
import DashboardOrders from "./DashboardOrders";
import Loader from "../../../../components/Loader";
import {
  getClinicAppointmentDetails,
  getClinicDashboardDetails,
} from "../../../../store/serviceProvider/Clinic/action";
import { UncontrolledAlert } from "reactstrap";

const ClinicDashboard = () => {
  const dispatch = useDispatch();
  const ClinicDetails = useSelector((state) => state.Slot);

  const auth = getLocalStorage("AUTH_DETAILS");
  const slot = useSelector((state) => state.Slot);

  useEffect(() => {
    auth &&
      auth?.user?.role == "clinic" &&
      auth?.user?.profile_completed &&
      auth?.user?.admin_approved &&
      dispatch(getClinicDashboardDetails());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCarerPersonalDetails());
  }, [dispatch]);

  const basicRequest = {
    sort: "time_created",
    sort_order: "desc",
    page: 1,
    page_count: 50,
  };

  const [request, setRequest] = useState({ ...basicRequest });

  useEffect(() => {
    auth?.user?.role == "clinic" &&
      auth?.user?.profile_completed &&
      auth?.user?.admin_approved &&
      dispatch(getClinicAppointmentDetails(request));
  }, [request]);

  return !auth?.user?.profile_completed ? (
    <Redirect to="/carer/complete-profile" />
  ) : !auth?.user?.admin_approved ? (
    <Redirect to="/carer/under-verification" />
  ) : (
    <>
      <div className="pcoded-main-container ">
        <div className="pcoded-wrapper">
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <div className="main-body">
                <div className="page-wrapper">
                  {ClinicDetails?.error && (
                    <div>
                      <UncontrolledAlert
                        color="danger"
                        className="alert-dismissible fade show"
                        role="alert"
                      >
                        {ClinicDetails?.error}
                      </UncontrolledAlert>
                    </div>
                  )}
                  <div className="row">
                    {ClinicDetails?.clinicDashboard?.length &&
                      ClinicDetails?.clinicDashboard
                        ?.slice(0, 1)
                        ?.map(
                          (data) =>
                            data.length &&
                            data?.map((item) => <DashboardCards item={item} />)
                        )}
                    <div className="col-xl-10 col-md-12">
                      <div className="dash-card Recent-Users">
                        <div className="dash-card-header">
                          <h5> Recent Pending Bookings</h5>
                        </div>
                        <div className="dash-card-block px-0 py-3">
                          <div className="table-responsive">
                            <table className="table table-hover">
                              <tbody>
                                {slot?.clinicAppointments?.appointments
                                  ?.length ? (
                                  slot?.clinicAppointments?.appointments?.map(
                                    (appointment) => (
                                      <DashboardOrders item={appointment} />
                                    )
                                  )
                                ) : (
                                  <p className="text-center">
                                    No Recent Pending Bookings
                                  </p>
                                )}
                              </tbody>
                            </table>
                          </div>
                          <div className="text-right mr-4">
                            <a
                              href="/carer/clinic/appointments"
                              className="label text-dark  text-white"
                            >
                              <button type="button" class="btn btn-primary">
                                View
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {ClinicDetails?.clinicDashboard && (
                    <div className="dash-card Recent-Users">
                      <div className="dash-card-header mb-5">
                        <h5>Appointment Summary</h5>
                      </div>
                      <MultiBarChart
                        datas={ClinicDetails?.clinicDashboard}
                        provider="clinic"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {ClinicDetails?.loading && <Loader />}
    </>
  );
};

export default ClinicDashboard;
