import React from "react";

const DashboardOrders = ({ item }) => {
  return (
    <>
      <tr className="unread">
        <td>
          <p className="mb-0">{`${item?.user_details?.first_name} ${item?.user_details?.last_name}`}</p>
        </td>
        <td>
          <p className="m-0">{item?.pet_name}</p>
        </td>
        <td>
          <p className="m-0">{item?.appointment_date}</p>
        </td>

        <td>
          <h6 className="text-muted">
            <i className="fas fa-circle text-c-green f-10 m-r-15" />

            {`${item?.start_time}-${item?.end_time}`}
          </h6>
        </td>
        <td>
          <p className="m-0"> {item?.medical_description}</p>
        </td>
        {/* <td>
        <a
          href={`/carer/seller/order-edit/placed/${item?.appointment_id}`}
          className="label theme-bg2 text-white f-12"
        >
          View
        </a>
      </td> */}
      </tr>
    </>
  );
};

export default DashboardOrders;
