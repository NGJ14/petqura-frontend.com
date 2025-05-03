import React from "react";

const DashboardOrders = ({ item }) => {
  return (
    <tr className="unread">
      <td>
        <h6 className="mb-1">{item?.product_name}</h6>
      </td>
      <td>
        <p className="m-0">{item?.variant_name}</p>
      </td>
      <td>
        <p className="m-0">{item?.time_created}</p>
      </td>
      <td>
        <p className="m-0">{item?.price}</p>
      </td>
      <td>
        <h6 className="text-muted">
          <i className="fas fa-circle text-c-green f-10 m-r-15" />
          {item?.order_status}
        </h6>
      </td>
      <td>
        <a
          href={`/carer/seller/order-edit/placed/${item?.order_details_id}`}
          className="label theme-bg2 text-white f-12"
        >
          View
        </a>
      </td>
    </tr>
  );
};

export default DashboardOrders;
