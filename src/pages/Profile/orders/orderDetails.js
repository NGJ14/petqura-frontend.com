import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router";
import { getOrderById } from "../../../store/UserStore/UserOrders/action";

const OrderDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const UserOrder = useSelector((state) => state.UserOrder);

  useEffect(() => {
    dispatch(getOrderById({ data: { order_id: params.id } }));
  }, []);

  const history = useHistory();
  const location = useLocation();

  return (
    <div className="common-container">
      <div className="container mt-30">
        <div className="section-content">
          <div className="text-right">
            <button
              className="btn orange-background text-white"
              onClick={() =>
                history.push({
                  pathname: "/profile",
                  tab: "orders",
                  state: { status: location?.state?.status },
                })
              }
            >
              {"<< Back To Orders"}
            </button>
          </div>
          <div className="row mt-30  border-2px">
            <div className="text-right mr-4 mt-3">
              <a
                className="text-dark"
                href={`/invoice/${UserOrder?.orderDetails?.order_id}`}
              >
                View Invoice
              </a>
            </div>
            <div className=" text-center p-30 mt-sm-0 justify-content-between">
              <img
                src={UserOrder?.orderDetails?.product_image}
                width="150px"
                height="150px"
              />
              <p className="my-3">
                OrderID: {UserOrder?.orderDetails?.purchase_id}
              </p>
              <>
                <h4 className="icon-box-title  mt-3 font-weight-bold">
                  {UserOrder?.orderDetails?.product_name}
                </h4>
                <p>{UserOrder?.orderDetails?.brand_name}</p>
                <p>Variant: {UserOrder?.orderDetails?.variant_name}</p>
              </>
              <div className="py-3 mt-2 pl-4">
                <h4 className="orange-font mb-0">Delivery Address</h4>
                <div className="d-flex justify-content-center">
                  <p
                    className="py-3"
                    dangerouslySetInnerHTML={{
                      __html: UserOrder?.orderDetails?.order?.shipping_address,
                    }}
                  ></p>
                </div>

                <p>
                  Data Added:{UserOrder?.orderDetails?.order_placed_datetime}
                </p>

                <div className="mt-4">
                  <h4 className="orange-font">Total Order Price</h4>
                  <div className="justify-content-center mt-4">
                    {/* <p>
                      Item Price: Rs.{UserOrder?.orderDetails?.order_amount}
                    </p> */}
                    {/* <p>Shipping Fee: Rs.30</p> */}
                    <p>
                      Total: Rs.{UserOrder?.orderDetails?.order?.order_amount}
                    </p>
                    <div className="d-flex justify-content-between mt-5">
                      {UserOrder?.orderDetails?.seller_name ? (
                        <p>
                          Item Sold by: {UserOrder?.orderDetails?.seller_name}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-10 mb-20"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
