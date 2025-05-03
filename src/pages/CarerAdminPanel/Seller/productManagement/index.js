import React, { useEffect, useState, useRef } from "react";
import { Container, Row, UncontrolledAlert } from "reactstrap";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../../../components/UI/Tables/Breadcrumb";

import Datatable from "../../../../components/UI/Tables/Datatable";

import {
  getProductDetails,
  deleteProductDetails,
} from "../../../../store/serviceProvider/Seller/action";

import { productColumnData } from "../../../../helpers/columns";

import Edit_icon from "../../../../assets/icons/ebud-icons/Edit.svg";
import Delete_icon from "../../../../assets/icons/ebud-icons/Delete.svg";
import ConfirmationAlert from "../../../../components/confiramtionAlert";
import Loader from "../../../../components/UI/Loader";
import { getLocalStorage } from "../../../../helpers/utils";
import ProductUpload from "./productUpload";

const Product = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.Product);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});
  const [showProductUpload, setShowProductUpload] = useState(false);

  const toggleProductUpload = () => {
    setShowProductUpload(!showProductUpload);
  };

  const pageWrapRef = useRef(null);

  const basicRequest = {
    sort: "time_created",
    sort_order: "desc",
    page: 1,
    page_count: 50,
  };

  const [request, setRequest] = useState({ ...basicRequest });
  const auth = getLocalStorage("AUTH_DETAILS");

  useEffect(() => {
    setRequest({ ...basicRequest });
  }, [history?.location?.state?.from]);

  useEffect(() => {
    auth &&
      auth?.user?.role == "seller" &&
      auth?.user?.admin_approved &&
      auth?.user?.profile_completed &&
      request &&
      dispatch(getProductDetails(request));
  }, [request]);

  const okHandler = () => {
    dispatch(
      deleteProductDetails({
        data: { pid: promptMessage.id },
        callback: () => dispatch(getProductDetails(request)),
      })
    );
  };

  const deletePromptHandler = (id) => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: id,
      title: "",
      content: "Are you sure you want to delete this product",
      type: "delete",
    });
  };

  const addNewClickHandler = () => {
    history.push("/carer/seller/product-addNew");
  };

  const uploadProductshandler = () => {
    toggleProductUpload();
  };

  const formatProductData =
    productData?.product?.products?.length &&
    productData?.product?.products?.map((product, index) => ({
      no: (request?.page - 1) * request?.page_count + index + 1,
      name: <div title={product.product_name}>{product.product_name}</div>,
      brand: <div title={product.brand_name}>{product.brand_name}</div>,
      category: (
        <div title={product.category_name}>{product.category_name}</div>
      ),

      actions: (
        <div className="cust-table-actions-wrap">
          <button
            className=" color-violet action-btn"
            title="Edit"
            onClick={() =>
              history.push(`/carer/seller/product-edit/${product.product_id}`)
            }
          >
            <img src={Edit_icon} alt="Edit" />
          </button>

          <button
            onClick={() => deletePromptHandler(product.product_id)}
            className=" color-red action-btn"
            title="Delete"
          >
            <img src={Delete_icon} alt="Delete" />
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
        <Row className="my-5">
          <Breadcrumbs title="Tables" breadcrumbItem="Products" />
          {((productData?.error &&
            !productData?.error?.includes(
              "Error while adding product at row"
            )) ||
            productData?.success) && (
            <div>
              <UncontrolledAlert
                color={productData?.error ? "danger" : "success"}
                className="alert-dismissible fade show"
                role="alert"
              >
                {productData?.error || productData?.success}
              </UncontrolledAlert>
            </div>
          )}

          <Datatable
            defaultSortField={"modified_on"}
            defaultSortAsc={false}
            tableID={"product"}
            rows={formatProductData}
            columns={productColumnData}
            add
            search
            addNewClickHandler={addNewClickHandler}
            uploadProductshandler={uploadProductshandler}
            request={request}
            setRequest={setRequest}
            searchTerm={productData?.request?.keyword}
            totalRecords={productData?.product?.total}
            loading={productData?.loading}
            addNewLabel="ADD NEW"
            upload="UPLOAD PRODUCTS"
            tableCardClassName={"snoTable"}
          />
        </Row>
      </Container>
      <ConfirmationAlert
        {...promptMessage}
        modal_center={showPromptPopUp}
        setmodal_center={setShowPromptPopUp}
        onOK={okHandler}
      />

      <ProductUpload
        showProductUpload={showProductUpload}
        toggleProductUpload={toggleProductUpload}
      />

      {productData?.loading && <Loader />}
    </div>
  );
};

export default Product;
