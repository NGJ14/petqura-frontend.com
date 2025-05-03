import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { getOrderDetails } from "../../../store/UserStore/UserOrders/action";
import ShopPagination from "../../../components/Pagination";
import Loader from "../../../components/UI/Loader";

const Order = () => {
  const [custError, setCustError] = useState("");
  const [status, setStatus] = useState("pending");
  const history = useHistory();
  const OrderDetails = useSelector((state) => state.UserOrder);
  const dispatch = useDispatch();
  const location = useLocation();
  const basicRequest = {
    page: 1,
    page_count: 8,
    keyword: "",
  };
  const [request, setRequest] = useState({ ...basicRequest });
  useEffect(() => {
    request && dispatch(getOrderDetails({ request: request }));
  }, [request]);

  useEffect(() => {
    location?.state?.status && setStatus(location?.state?.status);
  }, [location?.state?.status]);

  useEffect(() => {
    setRequest({ ...request, status: status });
  }, [status]);

  const handleStarRatingClick = (e) => {
    setStatus(e?.target?.value);
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-3 col-sm-5 col-md-6 mt-4 ml-4">
          <select
            value={status}
            id="sort"
            className="shop-select form ml-2"
            onChange={(e) => handleStarRatingClick(e)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <section className="col-md-12">
        <div className="container pt-0 ">
          <div className="section-content">
            <div className="row ">
              {custError && <p className="mandatory ml-4 ">{custError}</p>}

              {OrderDetails?.orders?.orders?.length ? (
                OrderDetails?.orders?.orders?.map((order) => (
                  <>
                    <div
                      className="card mb-3 text-left"
                      style={{
                        maxWidth: "540px",
                        paddingBottom: "0px",
                        marginBottom: "5px",
                        marginLeft: "5px",
                        minHeight: "auto",
                      }}
                    >
                      <div className="row no-gutters">
                        <div className="col-md-4">
                          <img
                            src={order?.product_image}
                            className="card-img"
                            alt="Product Image"
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">
                              <a
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  history.push({
                                    pathname: `/view-order/${order?.order_details_id}`,
                                    state: { status: status },
                                  })
                                }
                              >
                                {order?.product_name}
                              </a>
                            </h5>
                            <p className="card-text">
                              Purchase ID: {order?.order?.purchase_id}
                            </p>
                            <p className="card-text">
                              Order status: {order?.order_status}
                            </p>
                            {/* <p className="card-text">
                              Brand: {order?.brand_name}
                            </p> */}
                            {/* <p className="card-text">
                              Variant: {order?.variant_name}
                            </p> */}
                            <p className="card-text">
                              <small className="text-muted">
                                Order placed on {order?.order_placed_datetime}
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <div>
                  <h4 className="text-center">No Orders Found</h4>
                </div>
              )}
            </div>
          </div>
          <div className="">
            <div className="col-md-12">
              {OrderDetails?.orders?.orders?.length ? (
                <ShopPagination
                  totalRecords={OrderDetails?.orders?.total}
                  loading={OrderDetails?.loading}
                  setRequest={setRequest}
                  request={request}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>
      {OrderDetails?.loading && <Loader />}
    </>
  );
};

export default Order;
