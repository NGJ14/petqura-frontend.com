import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Prompt,
  useHistory,
  useLocation,
  useParams,
  Redirect,
} from "react-router";
import SuccessConfirmationAlert from "../../../../components/SuccessConfirmationAlert";
import BackButton from "../../../../components/UI/BackButton";
import Breadcrumbs from "../../../../components/UI/Tables/Breadcrumb";
import { getLocalStorage } from "../../../../helpers/utils";
import { getCarerPersonalDetails } from "../../../../store/carer/action";
import {
  changeOrderStatus,
  getCompletedOrderById,
  getPendingOrderById,
  getShippedOrderById,
} from "../../../../store/serviceProvider/Seller/orders/action";
import { exportSellerInvoice } from "../../../../store/serviceProvider/Seller/orders/action";
import saveAs from "file-saver";

const EditOrder = () => {
  const Order = useSelector((state) => state.Order);
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const history = useHistory();
  const auth = getLocalStorage("AUTH_DETAILS");
  const [status, setStatus] = useState();
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(getCarerPersonalDetails());
    if (
      auth &&
      auth?.user?.role != "pet_owner" &&
      auth?.user?.role != "admin" &&
      auth?.user?.admin_approved &&
      auth?.user?.profile_completed
    ) {
      if (location.pathname.includes("placed")) {
        dispatch(getPendingOrderById({ data: { id: params?.id } }));
      } else if (location.pathname.includes("shipped")) {
        dispatch(getShippedOrderById({ data: { id: params?.id } }));
      } else {
        dispatch(getCompletedOrderById({ data: { id: params?.id } }));
      }
    }
  }, []);

  useEffect(() => {
    Order?.orderDetails?.order_status &&
      setStatus(Order?.orderDetails?.order_status);
  }, [Order?.orderDetails]);

  // const downloadInvoiceHandler = (orderID) => {
  //   dispatch(
  //     exportSellerInvoice({ saveAs: saveAs, data: { order_id: orderID } })
  //   );
  // };

  const downloadInvoiceHandler = (orderID) => {
    dispatch(exportSellerInvoice({ data: { id: orderID } }));
  };

  const orderStatus = [
    { id: 1, value: "completed" },
    { id: 2, value: "placed" },
    { id: 3, value: "shipped" },
  ];

  const changeStatus = (e) => {
    e.preventDefault();
    dispatch(
      changeOrderStatus({
        data: {
          id: Order?.orderDetails?.order_details_id,
          status: status,
        },
        callback: () => {
          history.push("/carer/seller/order-management");
        },
      })
    );
  };

  useEffect(() => {
    Order?.orderDetails?.order_status &&
      setStatus(Order?.orderDetails?.order_status);
  }, [Order?.orderDetails?.order_status]);

  return !auth?.user?.profile_completed ? (
    <Redirect to="/carer/complete-profile" />
  ) : !auth?.user?.admin_approved ? (
    <Redirect to="/carer/under-verification" />
  ) : (
    <div
      className="page-content cust-page mb-40"
      data-testid="component-faqAddNew"
    >
      {/* <BackButton
        label="Order"
        handleClick={() => history.push("/carer/seller/order-management")}
        // handleClick={() => (formChanged ? confirmBack() : redirectMethod())}
      /> */}

      <div className="container">
        <div className="section-content">
          <div className="row">
            <div className="icon-box bg-lighter  p-30 mt-sm-0 border-1px  ">
              <a
                href={`/carer/seller/order-management`}
                className=" color-violet action-btn"
                title="Invoice"
              >
                <button className="btn btn-dark mt-2">
                  Back to Order List
                </button>
              </a>
              <a
                href={`/carer/invoice/` + Order?.orderDetails?.order_id}
                className=" color-violet action-btn"
                title="Invoice"
                target="_blank"
              >
                <button className="btn btn-dark mt-2 pull-right">
                  View Invoice
                </button>
              </a>

              <button
                className="btn btn-dark mt-2 pull-right"
                onClick={() => {
                  downloadInvoiceHandler(Order?.orderDetails?.order_id);
                }}
              >
                Download Invoice
              </button>
            </div>
          </div>
          <div className="row ">
            <div className="icon-box bg-lighter  p-30 mt-sm-0 border-1px  ">
              <h3 className="icon-box-title mt-3">ORDER DETAILS</h3>
              <br />
              <div className="row">
                <div className="col-md-6">
                  <p className="my-3">
                    <strong>ORDER ID</strong> :{" "}
                    {Order?.orderDetails?.order_details_id}
                  </p>
                  <p className="my-3">
                    <strong>PURCHASE ID</strong> :{" "}
                    {Order?.orderDetails?.order?.purchase_id}
                  </p>
                  <p className="my-3">
                    <strong>PRODUCT NAME</strong> :{" "}
                    {Order?.orderDetails?.product_name}
                  </p>

                  <p className="my-3">
                    <strong>VARIANT</strong> :
                    {Order?.orderDetails?.variant_name}
                  </p>
                  <p className="my-3">
                    <strong>DELIVERY CHARGE </strong>:{" "}
                    {Order?.orderDetails?.order?.delivery_fee}
                  </p>
                  <p className="my-3">
                    <strong>DELIVERY MODE </strong>:{" "}
                    {Order?.orderDetails?.order?.delivery_mode}
                  </p>
                  <p className="my-3">
                    <strong>ORDER STATUS </strong>:{" "}
                    {Order?.orderDetails?.order_status}
                  </p>
                  <p className="my-3">
                    <strong>QUANTITY</strong>: {Order?.orderDetails?.quantity}
                  </p>
                  <p className="my-3">
                    <strong>PAYMENT MODE</strong>:{" "}
                    {Order?.orderDetails?.order?.payment_mode}
                  </p>
                  <p className="my-3">
                    <strong>TOTAL AMOUNT</strong>:{" "}
                    {Order?.orderDetails?.order?.order_amount}
                  </p>
                  <p className="font-weight-bold">Change Order Status:</p>

                  <select
                    className="col-lg-3 col-xl-2 col-md-4 col-sm-5 mr-5 mt-2"
                    style={{ padding: "7px" }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {orderStatus?.map((status) => (
                      <option value={status?.value}>{status?.value}</option>
                    ))}
                  </select>
                  <button className="btn btn-dark mt-2" onClick={changeStatus}>
                    Update
                  </button>
                </div>
                <div className="col-md-6">
                  <h4 className=" mb-4">Shipping Address</h4>
                  <p
                    className="my-3"
                    dangerouslySetInnerHTML={{
                      __html: Order?.orderDetails?.order?.shipping_address,
                    }}
                  ></p>
                  <h4 className=" mb-4">Billing Address</h4>
                  <p
                    className="my-3"
                    dangerouslySetInnerHTML={{
                      __html: Order?.orderDetails?.order?.billing_address,
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessConfirmationAlert
        modal_center={modal}
        setmodal_center={setModal}
        content="Order Status Updated Successfully"
        toggle={toggle}
        okHandleClick={() => history.push("/carer/seller/order-management")}
        okHandle
      />
    </div>
  );
};

export default EditOrder;
