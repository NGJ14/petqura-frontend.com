import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Card, CardBody, CardTitle, Container, Row } from "reactstrap";
import { getLocalStorage } from "../../helpers/utils";
import { getGuestInvoice } from "../../store/UserStore/Guest/action";
import { getInvoice } from "../../store/UserStore/UserOrders/action";
import { getSellerInvoice } from "../../store/serviceProvider/Seller/orders/action";

const Invoice = () => {
  const auth = getLocalStorage("AUTH_DETAILS");
  const UserOrder = useSelector((state) => state.UserOrder);
  const Order = useSelector((state) => state.Order);
  const Guest = useSelector((state) => state.Guest);
  const dispatch = useDispatch();
  const params = useParams();
  let prd_tax = 0;
  let [classCustpage, setclassCustpage] = useState("");
  let [Containerwidth, setContainerwidth] = useState("90%");
  useEffect(() => {
    if (auth?.guest_id) {
      dispatch(
        getGuestInvoice({
          guest: { order_id: params?.id, guest_id: auth?.guest_id },
        })
      );
    } else if (auth?.user?.role == "pet_owner") {
      dispatch(getInvoice({ data: { order_id: params?.id } }));
    } else if (
      auth &&
      auth?.user?.role != "pet_owner" &&
      auth?.user?.role != "admin" &&
      auth?.user?.admin_approved &&
      auth?.user?.profile_completed
    ) {
      dispatch(getSellerInvoice({ data: { id: params?.id } }));
      setclassCustpage("cust-page");
      setContainerwidth("100%");
    }
  }, []);

  return (
    <div
      className={`page-content ` + classCustpage}
      data-testid="component-faqList"
      id="reserveUNList"
    >
      <div className="container" style={{ width: Containerwidth }}>
        <Container fluid id="userManagementWrapper" data-testid="userMgmtWrap">
          <Row className="mb-5">
            <div className="col-lg-12">
              <h3 title="Invoice" className="huddle-user-name ">
                {" "}
                Invoice
              </h3>
              <Card className="mt-3 pb-0" style={{ minHeight: "auto" }}>
                <CardBody className="p-0 ">
                  <CardTitle className="cardTitle text-left">
                    Order Details
                  </CardTitle>
                  <div className="text-left  mt-4 col-lg-6">
                    <p>
                      Purchase ID:{" "}
                      {UserOrder?.invoice?.purchase_id ||
                        Guest?.invoice?.purchase_id ||
                        Order?.invoice?.purchase_id}
                    </p>
                    <p>
                      Dated Added:{" "}
                      {/* {UserOrder?.invoice?.details?.length &&
                      new Date(
                        UserOrder?.invoice?.details[0]?.time_created
                      )?.toLocaleString()} */}
                      {Guest?.invoice?.details?.length &&
                        new Date(
                          Guest?.invoice?.details[0]?.time_created
                        )?.toLocaleString()}
                      {UserOrder?.invoice?.details?.length &&
                        UserOrder?.invoice?.date}
                      {Order?.invoice?.details?.length && Order?.invoice?.date}
                    </p>

                    {UserOrder?.invoice?.payment_mode && (
                      <p>
                        Payment Method:{" "}
                        {`${UserOrder?.invoice?.payment_mode
                          ?.slice(0, 1)
                          ?.toUpperCase()}${UserOrder?.invoice?.payment_mode?.slice(
                          1
                        )}`}
                      </p>
                    )}

                    {Guest?.invoice?.payment_mode && (
                      <p>
                        Payment Method:{" "}
                        {`${Guest?.invoice?.payment_mode
                          ?.slice(0, 1)
                          ?.toUpperCase()}${Guest?.invoice?.payment_mode?.slice(
                          1
                        )}`}
                      </p>
                    )}

                    {Order?.invoice?.payment_mode && (
                      <p>
                        Payment Method:{" "}
                        {`${Order?.invoice?.payment_mode
                          ?.slice(0, 1)
                          ?.toUpperCase()}${Order?.invoice?.payment_mode?.slice(
                          1
                        )}`}
                      </p>
                    )}
                  </div>

                  <div className="text-left  mt-4 col-lg-6">
                    {/* <p>Email: eldhosempeter@gmail.com</p> */}
                    <p>
                      Email:{" "}
                      {UserOrder?.invoice?.email ||
                        Guest?.invoice?.email ||
                        Order?.invoice?.email}
                    </p>
                    {UserOrder?.invoice?.order_status && (
                      <p>
                        Order Status:{" "}
                        {`${UserOrder?.invoice?.order_status
                          ?.slice(0, 1)
                          ?.toUpperCase()}${UserOrder?.invoice?.order_status?.slice(
                          1
                        )}`}
                      </p>
                    )}
                    {Guest?.invoice?.order_status && (
                      <p>
                        Order Status:{" "}
                        {`${Guest?.invoice?.order_status
                          ?.slice(0, 1)
                          ?.toUpperCase()}${Guest?.invoice?.order_status?.slice(
                          1
                        )}`}
                      </p>
                    )}
                    {Order?.invoice?.order_status && (
                      <p>
                        Order Status:{" "}
                        {`${Order?.invoice?.order_status
                          ?.slice(0, 1)
                          ?.toUpperCase()}${Order?.invoice?.order_status?.slice(
                          1
                        )}`}
                      </p>
                    )}
                  </div>
                </CardBody>
              </Card>

              <Card className="mt-3 pb-0" style={{ minHeight: "200px" }}>
                <CardBody className="p-0 ">
                  <div className="text-left  mt-4 col-lg-6">
                    <CardTitle className="cardTitle text-left">
                      Payment Address
                    </CardTitle>

                    <p
                      className="py-1 my-1  pl-0"
                      dangerouslySetInnerHTML={{
                        __html:
                          UserOrder?.invoice?.billing_address ||
                          Guest?.invoice?.billing_address ||
                          Order?.invoice?.billing_address,
                      }}
                    ></p>

                    {/* <p className="py-1 my-1  pl-0">
                      {UserOrder?.invoice?.address?.address ||
                        Guest?.invoice?.address?.address}{" "}
                    </p>
                    <p className="py-1 my-1  pl-0">
                      {UserOrder?.invoice?.address?.state ||
                        Guest?.invoice?.address?.state}{" "}
                      {UserOrder?.invoice?.address?.pin ||
                        Guest?.invoice?.address?.pin}
                    </p>
                    <p className="py-1 my-1  pl-0">
                      Phone:{" "}
                      {UserOrder?.invoice?.address?.phone ||
                        Guest?.invoice?.address?.phone}
                    </p> */}
                  </div>
                  <div className="text-left  mt-4 col-lg-6">
                    <CardTitle className="cardTitle text-left">
                      Shipping Address
                    </CardTitle>
                    <p
                      className="py-1 my-1  pl-0"
                      dangerouslySetInnerHTML={{
                        __html:
                          UserOrder?.invoice?.shipping_address ||
                          Guest?.invoice?.shipping_address ||
                          Order?.invoice?.shipping_address,
                      }}
                    ></p>
                    {/* <p className="py-1 my-1  pl-0">
                      {UserOrder?.invoice?.address?.fullname ||
                        Guest?.invoice?.address?.fullname}{" "}
                    </p>

                    <p className="py-1 my-1  pl-0">
                      {UserOrder?.invoice?.address?.address ||
                        Guest?.invoice?.address?.address}{" "}
                    </p>
                    <p className="py-1 my-1  pl-0">
                      {UserOrder?.invoice?.address?.state ||
                        Guest?.invoice?.address?.state}{" "}
                      {UserOrder?.invoice?.address?.pin ||
                        Guest?.invoice?.address?.pin}
                    </p>
                    <p className="py-1 my-1  pl-0">
                      Phone:{" "}
                      {UserOrder?.invoice?.address?.phone ||
                        Guest?.invoice?.address?.phone}
                    </p> */}
                  </div>
                </CardBody>
              </Card>
              <Card className="mt-3 pb-0" style={{ minHeight: "200px" }}>
                <CardBody className="p-0 ">
                  <CardTitle className="cardTitle text-left">
                    Order Items
                  </CardTitle>
                  <div className="table-responsive text-left  col-lg-12 px-0">
                    <table className="table table-striped table-bordered tbl-shopping-cart">
                      <thead>
                        <tr>
                          <th scope="col">Product Name</th>
                          {/* <th>Brand</th> */}
                          <th scope="col">Quantity</th>
                          <th scope="col">Unit Price</th>
                          <th scope="col">Discount</th>
                          <th scope="col">Net Total</th>
                          <th scope="col">Total Amount</th>
                          <th scope="col">Tax Rate</th>
                          <th scope="col">Tax Type</th>
                          <th scope="col">Tax Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {UserOrder?.invoice?.details?.length
                          ? UserOrder?.invoice?.details?.map((order) => (
                              <>
                                <tr className="cart_item" scope="row">
                                  <td>
                                    <span style={{ display: "none" }}>
                                      {(prd_tax = prd_tax + order.gst)}
                                    </span>
                                    <p>{order?.product_name}</p>
                                    <ul className="variation">
                                      <li>
                                        Variant:{" "}
                                        <span>{order?.variant_name}</span>
                                      </li>
                                    </ul>
                                  </td>
                                  {/* <td className="product-price">
                                    <span className="amount">
                                      {order?.brand_name}
                                    </span>
                                  </td> */}
                                  <td className="product-price">
                                    <span className="amount">
                                      {order?.quantity}
                                    </span>
                                  </td>
                                  <td className="product-price">
                                    <span className="amount">
                                      Rs. {order?.unit_price.toFixed(2)}
                                    </span>
                                  </td>
                                  <td className="product-subtotal">
                                    <span className="amount">
                                      Rs.{" "}
                                      {(
                                        order?.unit_price -
                                        order?.discounted_unit_price
                                      ).toFixed(2)}
                                    </span>
                                  </td>
                                  <td className="product-subtotal">
                                    <span className="amount">
                                      Rs.{" "}
                                      {order?.discounted_unit_price.toFixed(2)}
                                    </span>
                                  </td>
                                  <td className="product-subtotal">
                                    <span className="amount">
                                      Rs.{" "}
                                      {(
                                        order?.discounted_unit_price *
                                        order?.quantity
                                      ).toFixed(2)}
                                    </span>
                                  </td>
                                  <td className="product-subtotal">
                                    <span className="amount">
                                      {(order?.gst_percentage / 2).toFixed(2)} %
                                      <br />
                                      {(order?.gst_percentage / 2).toFixed(2)} %
                                    </span>
                                  </td>
                                  <td className="product-subtotal">
                                    <span className="amount">
                                      CGST
                                      <br />
                                      SGST
                                    </span>
                                  </td>
                                  <td className="product-subtotal">
                                    <span className="amount">
                                      Rs. {(order?.half_gst).toFixed(2)}
                                      <br />
                                      Rs. {(order?.half_gst).toFixed(2)}
                                    </span>
                                  </td>
                                </tr>
                              </>
                            ))
                          : null}
                        {UserOrder?.invoice?.order_status && (
                          <>
                            <tr>
                              <td>Shipping</td>
                              <td></td>
                              <td>
                                Rs.{" "}
                                {UserOrder?.invoice?.delivery_fee == 0
                                  ? "80.00"
                                  : UserOrder?.invoice?.delivery_fee.toFixed(2)}
                              </td>
                              <td>
                                Rs.{" "}
                                {UserOrder?.invoice?.delivery_fee == 0
                                  ? "-80.00"
                                  : "0.00"}
                              </td>
                              <td>
                                Rs.{" "}
                                {UserOrder?.invoice?.delivery_fee.toFixed(2)}{" "}
                              </td>
                              <td>
                                Rs.{" "}
                                {UserOrder?.invoice?.delivery_fee.toFixed(2)}{" "}
                              </td>
                              <td>
                                9.00 %
                                <br />
                                9.00 %
                              </td>
                              <td>
                                CGST
                                <br />
                                SGST
                              </td>
                              <td>
                                Rs.{" "}
                                {(
                                  UserOrder?.invoice?.delivery_fee * 0.09
                                ).toFixed(2)}
                                <br />
                                Rs.{" "}
                                {(
                                  UserOrder?.invoice?.delivery_fee * 0.09
                                ).toFixed(2)}
                              </td>
                            </tr>
                            {UserOrder?.invoice?.reward_points_used > 0 && (
                              <tr>
                                <td>Rewards</td>
                                <td></td>
                                <td></td>
                                <td>
                                  Rs.-{" "}
                                  {(
                                    UserOrder?.invoice?.reward_points_used * 1
                                  ).toFixed(2)}
                                </td>
                                <td>
                                  Rs.-{" "}
                                  {(
                                    UserOrder?.invoice?.reward_points_used * 1
                                  ).toFixed(2)}
                                </td>
                                <td>
                                  Rs.-{" "}
                                  {(
                                    UserOrder?.invoice?.reward_points_used * 1
                                  ).toFixed(2)}
                                </td>
                                <td>
                                  0.0 0%
                                  <br />
                                  0.0 0%
                                </td>
                                <td>
                                  CGST
                                  <br />
                                  SGST
                                </td>
                                <td>
                                  Rs. 0.00
                                  <br />
                                  Rs. 0.00
                                </td>
                              </tr>
                            )}
                            {UserOrder?.invoice?.coupon_amount_used > 0 && (
                              <tr>
                                <td>Gift Coupons</td>
                                <td></td>
                                <td></td>
                                <td>
                                  Rs.-{" "}
                                  {(
                                    UserOrder?.invoice?.coupon_amount_used * 1
                                  ).toFixed(2)}
                                </td>
                                <td>
                                  Rs.-{" "}
                                  {(
                                    UserOrder?.invoice?.coupon_amount_used * 1
                                  ).toFixed(2)}
                                </td>
                                <td>
                                  Rs.-{" "}
                                  {(
                                    UserOrder?.invoice?.coupon_amount_used * 1
                                  ).toFixed(2)}
                                </td>
                                <td>
                                  0.0 0%
                                  <br />
                                  0.0 0%
                                </td>
                                <td>
                                  CGST
                                  <br />
                                  SGST
                                </td>
                                <td>
                                  Rs. 0.00
                                  <br />
                                  Rs. 0.00
                                </td>
                              </tr>
                            )}
                            <tr>
                              <td>
                                <b>Total</b>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>
                                <b>
                                  Rs.{" "}
                                  {(
                                    parseFloat(
                                      UserOrder?.invoice?.total_amount
                                    ) -
                                    (parseFloat(
                                      UserOrder?.invoice?.reward_points_used
                                    ) +
                                      parseFloat(
                                        UserOrder?.invoice?.coupon_amount_used
                                      ))
                                  ).toFixed(2)}{" "}
                                </b>
                              </td>
                              <td></td>
                              <td></td>
                              <td>
                                Rs.{" "}
                                {(
                                  prd_tax + UserOrder?.invoice?.delivery_fee_gst
                                ).toFixed(2)}
                              </td>
                            </tr>
                          </>
                        )}

                        {Order?.invoice?.details?.length
                          ? Order?.invoice?.details?.map((order) => (
                              <>
                                <tr className="cart_item" scope="row">
                                  <td>
                                    <span style={{ display: "none" }}>
                                      {(prd_tax = prd_tax + order.gst)}
                                    </span>
                                    <p>{order?.product_name}</p>
                                    <ul className="variation">
                                      <li>
                                        Variant:{" "}
                                        <span>{order?.variant_name}</span>
                                      </li>
                                    </ul>
                                  </td>
                                  {/* <td className="product-price">
                                    <span className="amount">
                                      {order?.brand_name}
                                    </span>
                                  </td> */}
                                  <td className="product-price">
                                    <span className="amount">
                                      {order?.quantity}
                                    </span>
                                  </td>
                                  <td className="product-price">
                                    <span className="amount">
                                      Rs. {order?.unit_price.toFixed(2)}
                                    </span>
                                  </td>
                                  <td className="product-subtotal">
                                    <span className="amount">
                                      Rs.{" "}
                                      {(
                                        order?.unit_price -
                                        order?.discounted_unit_price
                                      ).toFixed(2)}
                                    </span>
                                  </td>
                                  <td className="product-subtotal">
                                    <span className="amount">
                                      Rs.{" "}
                                      {(order?.discounted_unit_price).toFixed(
                                        2
                                      )}
                                    </span>
                                  </td>
                                  <td className="product-subtotal">
                                    <span className="amount">
                                      Rs.{" "}
                                      {(
                                        order?.discounted_unit_price *
                                        order?.quantity
                                      ).toFixed(2)}
                                    </span>
                                  </td>
                                  <td className="product-subtotal">
                                    <span className="amount">
                                      {(order?.gst_percentage / 2).toFixed(2)} %
                                      <br />
                                      {(order?.gst_percentage / 2).toFixed(2)} %
                                    </span>
                                  </td>
                                  <td className="product-subtotal">
                                    <span className="amount">
                                      CGST
                                      <br />
                                      SGST
                                    </span>
                                  </td>
                                  <td className="product-subtotal">
                                    <span className="amount">
                                      Rs. {(order?.half_gst).toFixed(2)}
                                      <br />
                                      Rs. {(order?.half_gst).toFixed(2)}
                                    </span>
                                  </td>
                                </tr>
                              </>
                            ))
                          : null}
                        {Order?.invoice?.order_status && (
                          <>
                            <tr>
                              <td>Shipping</td>
                              <td></td>
                              <td>
                                Rs.{" "}
                                {Order?.invoice?.delivery_fee == 0
                                  ? "80.00"
                                  : Order?.invoice?.delivery_fee.toFixed(2)}
                              </td>
                              <td>
                                Rs.{" "}
                                {Order?.invoice?.delivery_fee == 0
                                  ? "-80.00"
                                  : "0.00"}
                              </td>
                              <td>
                                Rs. {Order?.invoice?.delivery_fee.toFixed(2)}{" "}
                              </td>
                              <td>
                                Rs. {Order?.invoice?.delivery_fee.toFixed(2)}{" "}
                              </td>
                              <td>
                                9.00 %
                                <br />
                                9.00 %
                              </td>
                              <td>
                                CGST
                                <br />
                                SGST
                              </td>
                              <td>
                                Rs.{" "}
                                {(Order?.invoice?.delivery_fee * 0.09).toFixed(
                                  2
                                )}
                                <br />
                                Rs.{" "}
                                {(Order?.invoice?.delivery_fee * 0.09).toFixed(
                                  2
                                )}
                              </td>
                            </tr>
                            {Order?.invoice?.reward_points_used > 0 && (
                              <tr>
                                <td>Rewards</td>
                                <td></td>
                                <td></td>
                                <td>
                                  Rs.-{" "}
                                  {(
                                    Order?.invoice?.reward_points_used * 1
                                  ).toFixed(2)}
                                </td>
                                <td>
                                  Rs.-{" "}
                                  {(
                                    Order?.invoice?.reward_points_used * 1
                                  ).toFixed(2)}
                                </td>
                                <td>
                                  Rs.-{" "}
                                  {(
                                    Order?.invoice?.reward_points_used * 1
                                  ).toFixed(2)}
                                </td>
                                <td>
                                  0.0 0%
                                  <br />
                                  0.0 0%
                                </td>
                                <td>
                                  CGST
                                  <br />
                                  SGST
                                </td>
                                <td>
                                  Rs. 0.00
                                  <br />
                                  Rs. 0.00
                                </td>
                              </tr>
                            )}
                            {Order?.invoice?.coupon_amount_used > 0 && (
                              <tr>
                                <td>Gift Coupons</td>
                                <td></td>
                                <td></td>
                                <td>
                                  Rs.-{" "}
                                  {(
                                    Order?.invoice?.coupon_amount_used * 1
                                  ).toFixed(2)}
                                </td>
                                <td>
                                  Rs.-{" "}
                                  {(
                                    Order?.invoice?.coupon_amount_used * 1
                                  ).toFixed(2)}
                                </td>
                                <td>
                                  Rs.-{" "}
                                  {(
                                    Order?.invoice?.coupon_amount_used * 1
                                  ).toFixed(2)}
                                </td>
                                <td>
                                  0.0 0%
                                  <br />
                                  0.0 0%
                                </td>
                                <td>
                                  CGST
                                  <br />
                                  SGST
                                </td>
                                <td>
                                  Rs. 0.00
                                  <br />
                                  Rs. 0.00
                                </td>
                              </tr>
                            )}
                            <tr>
                              <td>
                                <b>Total</b>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>
                                <b>
                                  Rs.{" "}
                                  {(
                                    parseFloat(Order?.invoice?.total_amount) -
                                    (parseFloat(
                                      Order?.invoice?.reward_points_used
                                    ) +
                                      parseFloat(
                                        Order?.invoice?.coupon_amount_used
                                      ))
                                  ).toFixed(2)}{" "}
                                </b>
                              </td>
                              <td></td>
                              <td></td>
                              <td>
                                Rs.{" "}
                                {(
                                  prd_tax + Order?.invoice?.delivery_fee_gst
                                ).toFixed(2)}
                              </td>
                            </tr>
                          </>
                        )}

                        {Guest?.invoice?.details?.length
                          ? Guest?.invoice?.details?.map((order) => (
                              <>
                                <tr className="cart_item">
                                  <td>
                                    <span style={{ display: "none" }}>
                                      {(prd_tax = prd_tax + order.gst)}
                                    </span>
                                    <p>{order?.product_name}</p>
                                    <ul className="variation">
                                      <li>
                                        Variant:{" "}
                                        <span>{order?.variant_name}</span>
                                      </li>
                                    </ul>
                                  </td>
                                  <td className="product-price">
                                    <span className="amount">
                                      {order?.quantity}
                                    </span>
                                  </td>
                                  <td className="product-price">
                                    <span className="amount">
                                      Rs. {order?.unit_price.toFixed(2)}
                                    </span>
                                  </td>
                                  <td className="product-price">
                                    <span className="amount">
                                      Rs.{" "}
                                      {(
                                        order?.unit_price -
                                        order?.discounted_unit_price
                                      ).toFixed(2)}
                                    </span>
                                  </td>

                                  <td className="product-subtotal">
                                    <span className="amount">
                                      Rs.{" "}
                                      {order?.discounted_unit_price.toFixed(2)}
                                    </span>
                                  </td>
                                  <td className="product-price">
                                    <span className="amount">
                                      Rs.{" "}
                                      {(
                                        order?.discounted_unit_price *
                                        order?.quantity
                                      ).toFixed(2)}
                                    </span>
                                  </td>
                                  <td className="product-price">
                                    <span className="amount">
                                      {(order?.gst_percentage / 2).toFixed(2)} %
                                      <br />
                                      {(order?.gst_percentage / 2).toFixed(2)} %
                                    </span>
                                  </td>
                                  <td className="product-price">
                                    <span className="amount">
                                      CGST
                                      <br />
                                      SGST
                                    </span>
                                  </td>

                                  <td className="product-price">
                                    <span className="amount">
                                      Rs. {(order?.half_gst).toFixed(2)}
                                      <br />
                                      Rs. {(order?.half_gst).toFixed(2)}
                                    </span>
                                  </td>
                                </tr>
                              </>
                            ))
                          : null}
                        {Guest?.invoice?.details?.length
                          ? Guest?.invoice?.details?.map((order) => (
                              <>
                                <tr>
                                  <td>Shipping</td>
                                  <td></td>
                                  <td>
                                    Rs.{" "}
                                    {Guest?.invoice?.delivery_fee == 0
                                      ? "80.00"
                                      : Guest?.invoice?.delivery_fee.toFixed(2)}
                                  </td>
                                  <td>
                                    Rs.{" "}
                                    {Guest?.invoice?.delivery_fee == 0
                                      ? "-80.00"
                                      : "0.00"}
                                  </td>
                                  <td>
                                    Rs.{" "}
                                    {Guest?.invoice?.delivery_fee.toFixed(2)}{" "}
                                  </td>
                                  <td>
                                    Rs.{" "}
                                    {Guest?.invoice?.delivery_fee.toFixed(2)}{" "}
                                  </td>
                                  <td>
                                    9.00 %
                                    <br />
                                    9.00 %
                                  </td>
                                  <td>
                                    CGST
                                    <br />
                                    SGST
                                  </td>
                                  <td>
                                    Rs.{" "}
                                    {(
                                      Guest?.invoice?.delivery_fee * 0.09
                                    ).toFixed(2)}
                                    <br />
                                    Rs.{" "}
                                    {(
                                      Guest?.invoice?.delivery_fee * 0.09
                                    ).toFixed(2)}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>Total</b>
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    <b>
                                      Rs.{" "}
                                      {Guest?.invoice?.total_amount.toFixed(2)}
                                    </b>
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    Rs.{" "}
                                    {(
                                      prd_tax + Guest?.invoice?.delivery_fee_gst
                                    ).toFixed(2)}
                                  </td>
                                </tr>
                              </>
                            ))
                          : null}
                      </tbody>
                    </table>

                    {/* <div className="text-right mb-5 mt-50 mr-5">
                    <p>
                      Order Amount:{"  "} Rs.
                      {UserOrder?.invoice?.order_amount * 1?.toFixed(2) ||
                        Guest?.invoice?.order_amount * 1?.toFixed(2)}
                      <p className="my-2">
                        ( Including Gst Rs.
                        {UserOrder?.invoice?.gst?.toFixed(2) ||
                          Guest?.invoice?.gst?.toFixed(2)}
                        )
                      </p>
                    </p>
                    <p>
                      Shipping Fee:{"  "} Rs.
                      {UserOrder?.invoice?.delivery_fee ||
                        Guest?.invoice?.delivery_fee}
                    </p>

                    {UserOrder?.invoice?.reward_points_used && (
                      <p>
                        Discount:{"  "}Rs.
                        {UserOrder?.invoice?.reward_points_used}
                      </p>
                    )}
                    <h4>
                      Total:{"  "} Rs.
                      {UserOrder.invoice.total_amount -
                        UserOrder?.invoice?.reward_points_used ||
                        Guest.invoice.total_amount?.toFixed(2)}
                    </h4>
                  </div> */}
                  </div>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Invoice;
