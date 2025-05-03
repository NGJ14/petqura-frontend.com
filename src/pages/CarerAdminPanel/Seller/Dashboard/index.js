import React, { useEffect, useState } from "react";
import MultiBarChart from "../../../../components/Charts/Nvd3Chart/MultiBarChart";
import { useDispatch, useSelector } from "react-redux";

import { Redirect } from "react-router";
import { getLocalStorage } from "../../../../helpers/utils";
import {
  getCarerDashboardDetails,
  getCarerPersonalDetails,
} from "../../../../store/carer/action";
import DashboardCards from "./dashboardCards";
import DashboardOrders from "./DashboardOrders";
import { getPendingOrderDetails } from "../../../../store/serviceProvider/Seller/orders/action";
import Loader from "../../../../components/Loader";
import PageNotFound from "../../../utils/404";
import { UncontrolledAlert } from "reactstrap";

const CarerDashboard = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state?.Carer);
  const orderData = useSelector((state) => state.Order);

  const auth = getLocalStorage("AUTH_DETAILS");

  const basicRequest = {
    sort: "time_created",
    sort_order: "desc",
    page: 1,
    page_count: 50,
  };

  const [request, setRequest] = useState({ ...basicRequest });

  useEffect(() => {
    auth &&
      auth?.user?.role == "seller" &&
      auth?.user?.profile_completed &&
      auth?.user?.profile_completed &&
      dispatch(getCarerDashboardDetails());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCarerPersonalDetails());
    auth &&
      auth?.user?.role == "seller" &&
      auth?.user?.profile_completed &&
      auth?.user?.profile_completed &&
      dispatch(getPendingOrderDetails({ req: request }));
  }, [dispatch]);

  return !auth?.user?.profile_completed ? (
    <Redirect to="/carer/complete-profile" />
  ) : !auth?.user?.admin_approved ? (
    <Redirect to="/carer/under-verification" />
  ) : auth?.user?.role == "seller" ? (
    <>
      <div className="pcoded-main-container ">
        <div className="pcoded-wrapper">
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <div className="main-body">
                <div className="page-wrapper">
                  {(dashboard?.error || dashboard?.success) && (
                    <div>
                      <UncontrolledAlert
                        color={dashboard?.error ? "danger" : "success"}
                        className="alert-dismissible fade show"
                        role="alert"
                      >
                        {dashboard?.error || dashboard?.success}
                      </UncontrolledAlert>
                    </div>
                  )}
                  <div className="row">
                    {dashboard?.carerDashboard?.length &&
                      dashboard?.carerDashboard
                        ?.slice(0, 1)
                        ?.map(
                          (data) =>
                            data.length &&
                            data?.map((item) => <DashboardCards item={item} />)
                        )}
                    <div className="col-xl-10 col-md-12">
                      <div className="dash-card Recent-Users">
                        <div className="dash-card-header">
                          <h5>Recent Orders</h5>
                        </div>
                        <div className="dash-card-block px-0 py-3">
                          <div className="table-responsive">
                            <table className="table table-hover">
                              <tbody>
                                {orderData?.order?.orders?.length ? (
                                  orderData?.order?.orders
                                    ?.slice(0, 7)
                                    .map((order) => (
                                      <DashboardOrders item={order} />
                                    ))
                                ) : (
                                  <p className="text-center my-4">
                                    No Pending Orders
                                  </p>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {dashboard?.carerDashboard && (
                    <div className="dash-card Recent-Users">
                      <div className="dash-card-header mb-5">
                        <h5>Order Summary</h5>
                      </div>
                      <MultiBarChart
                        datas={dashboard?.carerDashboard}
                        provider="seller"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {dashboard?.loading && <Loader />}
    </>
  ) : (
    <PageNotFound />
  );
};

export default CarerDashboard;
