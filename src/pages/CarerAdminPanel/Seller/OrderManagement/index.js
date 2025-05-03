import React, { useEffect, useState, useRef } from "react";
import { Container, Row, UncontrolledAlert } from "reactstrap";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../../../components/UI/Tables/Breadcrumb";
import OrderFilter from "./HeaderFilter";
import Datatable from "../../../../components/UI/Tables/Datatable";

import {
  getProductDetails,
  deleteProductDetails,
} from "../../../../store/serviceProvider/Seller/action";

import { orderColumnData } from "../../../../helpers/columns";

import Edit_icon from "../../../../assets/icons/ebud-icons/view.png";
import Invoice_icon from "../../../../assets/icons/ebud-icons/document.svg";
import ConfirmationAlert from "../../../../components/confiramtionAlert";
import Loader from "../../../../components/UI/Loader";
import {
  getCompletedOrderDetails,
  getPendingOrderById,
  getPendingOrderDetails,
  getShippedOrderDetails,
} from "../../../../store/serviceProvider/Seller/orders/action";
import { getCarerPersonalDetails } from "../../../../store/carer/action";
import { getLocalStorage } from "../../../../helpers/utils";

// import Loader from "../../components/Common/Loader";

const Order = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.Order);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});
  const [status, setStatus] = useState("placed");

  // const orderStatus = [
  //   { id: 1, value: "completed" },
  //   { id: 2, value: "placed" },
  //   { id: 3, value: "shipped" },
  // ];

  const warningAlertRef = useRef(null);
  const pageWrapRef = useRef(null);

  const basicRequest = {
    sort: "time_created",
    sort_order: "desc",
    page: 1,
    page_count: 25,
    status: "placed",
  };

  const [request, setRequest] = useState({ ...basicRequest });

  useEffect(() => {
    if (request.status === "placed") {
      dispatch(getPendingOrderDetails({ req: request }));
    } else if (request.status === "shipped") {
      dispatch(getShippedOrderDetails({ req: request }));
    } else if (request.status === "completed") {
      dispatch(getCompletedOrderDetails({ req: request }));
    }
  }, [request]);

  useEffect(() => {
    setRequest({ ...basicRequest });
  }, [history?.location?.state?.from]);

  const auth = getLocalStorage("AUTH_DETAILS");

  useEffect(() => {
    dispatch(getCarerPersonalDetails());
    auth &&
      auth?.user?.role != "pet_owner" &&
      auth?.user?.role != "admin" &&
      auth?.user?.admin_approved &&
      auth?.user?.profile_completed &&
      request &&
      dispatch(getPendingOrderDetails({ req: request }));
  }, []);

  const okHandler = () => {
    dispatch(
      deleteProductDetails({
        data: { pid: promptMessage.id },
        callback: () => dispatch(getProductDetails(request)),
      })
    );
  };

  const formatOrderData =
    orderData?.order?.orders?.length &&
    orderData?.order?.orders?.map((order, index) => ({
      no: (request?.page - 1) * request?.page_count + index + 1,
      orderId: (
        <div title={order?.order_details_id}>
          {order?.order_details_id} (Purchase ID:{order?.order?.purchase_id})
        </div>
      ),
      delivery: (
        <div title={order?.purchase_id}>{order?.order?.delivery_mode}</div>
      ),
      name: <div title={order.product_name}>{order.product_name}</div>,
      variant_name: <div title={order.variant_name}>{order.variant_name}</div>,
      status: <div title={order.order_status}>{order.order_status}</div>,
      price: <div title={order.price}>{order.price}</div>,
      quantity: <div title={order.quantity}>{order.quantity}</div>,
      orderdate: <div title={order?.time_created}>{order?.time_created}</div>,
      actions: (
        <div className="cust-table-actions-wrap">
          <button
            className=" color-violet action-btn"
            title="View Order"
            onClick={() =>
              history.push(
                `/carer/seller/order-edit/${
                  order?.order_status == "placed"
                    ? "placed"
                    : order?.order_status == "shipped"
                    ? "shipped"
                    : "completed"
                }/${order.order_details_id}`
              )
            }
          >
            <img src={Edit_icon} alt="View Order" style={{ width: "28px" }} />
          </button>
          &nbsp;
          <a
            href={`/carer/invoice/` + order.order_id}
            className=" color-violet action-btn"
            title="Invoice"
            target="_blank"
          >
            <img src={Invoice_icon} alt="Invoice" style={{ width: "26px" }} />
          </a>
        </div>
      ),
    }));

  const addNewClickHandler = () => {
    history.push("/carer/seller/sales-report");
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
        <Row className="my-2">
          <Breadcrumbs title="Tables" breadcrumbItem="Orders" />
          {(orderData?.error || orderData?.success) && (
            <div>
              <UncontrolledAlert
                color={orderData?.error ? "danger" : "success"}
                className="alert-dismissible fade show"
                role="alert"
              >
                {orderData?.error || orderData?.success}
              </UncontrolledAlert>
            </div>
          )}

          {/* <div className="reg_login_headerWrapper my-3 d-flex justify-content-between">
            <div className="col text-end reg_login_detailsFilter ">
              <label className="h5">Order Status : </label>
              <select
                className="col-lg-12 col-xl-2 col-md-4 col-sm-5 mr-5 mt-2"
                style={{ padding: "7px" }}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {orderStatus?.map((status) =>
                  status == Order?.orderDetails?.order_status ? (
                    <option value={status?.value} selected>
                      {status?.value}
                    </option>
                  ) : (
                    <option value={status?.value}>{status?.value}</option>
                  )
                )}
              </select>
            </div>
            
          </div> */}

          <Datatable
            defaultSortField={"modified_on"}
            defaultSortAsc={false}
            tableID={"order"}
            rows={formatOrderData}
            columns={orderColumnData}
            add
            search
            orderstatus
            daterange
            clean
            addNewClickHandler={addNewClickHandler}
            request={request}
            setRequest={setRequest}
            // searchTerm={productData?.request?.keyword}
            totalRecords={orderData?.order?.total}
            loading={orderData?.loading}
            addNewLabel="SALES REPORT"
            tableCardClassName={"snoTable"}
            // noPagination
          />
        </Row>
      </Container>

      <ConfirmationAlert
        {...promptMessage}
        modal_center={showPromptPopUp}
        setmodal_center={setShowPromptPopUp}
        onOK={okHandler}
      />
      {orderData?.loading && <Loader />}
    </div>
  );
};

export default Order;
