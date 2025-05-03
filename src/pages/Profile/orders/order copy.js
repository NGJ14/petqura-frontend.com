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
      <div className="ml-0 ">
        <div className="col-lg-3 col-sm-5 col-md-6 mt-4 ml-4">
          <select
            value={status}
            id="sort"
            className="shop-select"
            onChange={(e) => handleStarRatingClick(e)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      <section className="col-md-12 d-flex">
        <div className="container pt-0 ">
          <div className="section-content">
            <div className="row ">
              {custError && <p className="mandatory ml-4 ">{custError}</p>}

              {OrderDetails?.orders?.orders?.length ? (
                OrderDetails?.orders?.orders?.map((order) => (
                  <div className="col-md-6">
                    <div className="icon-box  p-20 border-1px card-pet-cust ">
                      <div className="d-flex">
                        <img
                          src={order?.product_image}
                          alt="product_image"
                          width="90px"
                          height="110px"
                        />
                        <div className="ml-3">
                          <h4 className="icon-box-title font-weight-bold">
                            <p className="">
                              {order?.product_name?.length > 40
                                ? `${order?.product_name?.slice(0, 40)} ...`
                                : order?.product_name}
                              <span className="orange-font ml-1 text-uppercase">
                                ({order?.order_status})
                              </span>
                            </p>
                          </h4>
                          <p className="py-0">
                            {order?.brand_name?.length > 40
                              ? `${order?.brand_name?.slice(0, 40)} ...`
                              : order?.brand_name}
                          </p>
                          <p className="">variant: {order?.variant_name}</p>
                        </div>
                      </div>
                      <button
                        className="btn btn-outline-dark btn-lg btn-light mr-4"
                        onClick={() =>
                          history.push({
                            pathname: `/view-order/${order?.order_details_id}`,
                            state: { status: status },
                          })
                        }
                        // className="btn btn-lg order-view-action-btn  mt-4"
                        // href={`/view-order/${order?.order_details_id}`}
                      >
                        View
                      </button>
                    </div>
                  </div>
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
