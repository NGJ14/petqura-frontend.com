import React, { useEffect, useState } from "react";
import MultiBarChart from "../../../../components/Charts/Nvd3Chart/MultiBarChart";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { getLocalStorage } from "../../../../helpers/utils";
import { getCarerPersonalDetails } from "../../../../store/carer/action";
import DashboardCards from "./dashboardCards";
import Loader from "../../../../components/Loader";
import {
  getClinicAppointmentDetails,
  getClinicDashboardDetails,
} from "../../../../store/serviceProvider/Clinic/action";
import { UncontrolledAlert } from "reactstrap";
import Datatable from "../../../../components/UI/Tables/Datatable";

const ClinicDashboard = () => {
  const dispatch = useDispatch();
  const ClinicDetails = useSelector((state) => state.Slot);
  const slot = useSelector((state) => state.Slot);

  const auth = getLocalStorage("AUTH_DETAILS");

  useEffect(() => {
    if (
      auth &&
      auth?.user?.role === "clinic" &&
      auth?.user?.profile_completed &&
      auth?.user?.admin_approved
    ) {
      dispatch(getClinicDashboardDetails());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCarerPersonalDetails());
  }, [dispatch]);

  const basicRequest = {
    sort: "time_created",
    sort_order: "desc",
    page: 1,
    page_count: 10,
  };

  const [request, setRequest] = useState({ ...basicRequest });

  useEffect(() => {
    if (
      auth?.user?.role === "clinic" &&
      auth?.user?.profile_completed &&
      auth?.user?.admin_approved
    ) {
      dispatch(getClinicAppointmentDetails({ data: request }));
    }
  }, [request]);

  const bookings = slot?.clinicAppointments?.appointments || [];

  // Define columns for Datatable
  const RecentBookingsColumns = [
    { name: "S.No", selector: (row) => row.no, sortable: true, width: "80px" },
    { name: "Parent Name", selector: (row) => row.parent_name, sortable: true },
    { name: "Pet Name", selector: (row) => row.pet_name, sortable: true },
    { name: "Date", selector: (row) => row.date, sortable: true },
    { name: "Slot Time", selector: (row) => row.slot_time, sortable: true },
    { name: "Doctor", selector: (row) => row.doctor_name, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
  ];

  // Format booking data for table
  const formattedBookings = bookings.map((appointment, index) => ({
    no: (request.page - 1) * request.page_count + index + 1,
    parent_name: `${appointment?.user_details?.first_name || ""} ${
      appointment?.user_details?.last_name || ""
    }`,
    pet_name: appointment?.pet_name || "-",
    date: appointment?.appointment_date || "-",
    slot_time: `${appointment?.start_time || ""} - ${
      appointment?.end_time || ""
    }`,
    doctor_name: appointment?.doctor || "-",
    status: appointment?.status?.toUpperCase() || "-",
  }));

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
                    <UncontrolledAlert
                      color="danger"
                      className="alert-dismissible fade show"
                      role="alert"
                    >
                      {ClinicDetails?.error}
                    </UncontrolledAlert>
                  )}
                  <div className="row">
                    {/* Dashboard Cards */}
                    {ClinicDetails?.clinicDashboard?.length &&
                      ClinicDetails?.clinicDashboard
                        ?.slice(0, 1)
                        ?.map(
                          (data) =>
                            data.length &&
                            data?.map((item) => (
                              <DashboardCards
                                key={item?.id || Math.random()}
                                item={item}
                              />
                            ))
                        )}

                    {/* Recent Bookings Table */}
                    <div className="col-xl-10 col-md-12">
                      <div className="dash-card Recent-Users">
                        <div className="dash-card-header">
                          <h5>Recent Bookings</h5>
                        </div>
                        <div className="dash-card-block px-0 py-3">
                          <Datatable
                            defaultSortField={"date"}
                            defaultSortAsc={false}
                            tableID={"recentBookings"}
                            rows={formattedBookings}
                            columns={RecentBookingsColumns}
                            request={request}
                            setRequest={setRequest}
                            totalRecords={slot?.clinicAppointments?.total}
                            search
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Summary */}
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
