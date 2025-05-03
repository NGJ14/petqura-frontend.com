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

import Edit_icon from "../../../../assets/icons/ebud-icons/Edit.svg";
import ConfirmationAlert from "../../../../components/confiramtionAlert";
import Loader from "../../../../components/UI/Loader";
import { SaleReport } from "../../../../store/serviceProvider/Seller/orders/action";
import { getCarerPersonalDetails } from "../../../../store/carer/action";
import { getLocalStorage } from "../../../../helpers/utils";

const SalesReport = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.Order);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});

  const warningAlertRef = useRef(null);
  const pageWrapRef = useRef(null);

  const basicRequest = {
    sort: "time_created",
    sort_order: "desc",
    page: 1,
    page_count: 50,
  };

  const [request, setRequest] = useState({ ...basicRequest });

  useEffect(() => {
    setRequest({ ...basicRequest });
  }, [history?.location?.state?.from]);

  const auth = getLocalStorage("AUTH_DETAILS");

  const okHandler = () => {
    dispatch(
      deleteProductDetails({
        data: { pid: promptMessage.id },
        callback: () => dispatch(getProductDetails(request)),
      })
    );
  };

  useEffect(() => {
    dispatch(getCarerPersonalDetails());

    auth &&
      auth?.user?.role != "pet_owner" &&
      auth?.user?.role != "admin" &&
      auth?.user?.admin_approved &&
      auth?.user?.profile_completed &&
      request &&
      dispatch(SaleReport({ data: request }));
  }, [request]);

  const formatOrderData =
    orderData?.salesReport?.completed_orders?.length &&
    orderData?.salesReport?.completed_orders?.map((order, index) => ({
      no: (request?.page - 1) * request?.page_count + index + 1,
      orderId: (
        <div title={order?.order_details_id}>{order?.order_details_id}</div>
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
            title="Edit"
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
            <img src={Edit_icon} alt="Edit" />
          </button>
        </div>
      ),
    }));

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
          <Breadcrumbs title="Tables" breadcrumbItem="Sales Report" />
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

          <div className="reg_login_headerWrapper my-2 d-flex justify-content-between">
            <OrderFilter request={request} setRequest={setRequest} />
          </div>

          <Datatable
            defaultSortField={"modified_on"}
            defaultSortAsc={false}
            tableID={"order"}
            rows={formatOrderData}
            columns={orderColumnData}
            // add
            search
            // addNewClickHandler={addNewClickHandler}
            request={request}
            setRequest={setRequest}
            // searchTerm={productData?.request?.keyword}
            totalRecords={orderData?.salesReport.total}
            loading={orderData?.loading}
            // addNewLabel="ADD NEW"
            tableCardClassName={"snoTable"}
            tablefooter
            data={orderData?.salesReport}
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

export default SalesReport;
