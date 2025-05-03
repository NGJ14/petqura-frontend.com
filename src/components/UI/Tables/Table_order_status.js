import React, { useState } from "react";

const Table_order_status = ({ setRequest, request, searchTerm }) => {
  let [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("placed");
  const appointmentStatus = [
    { id: 1, value: "placed", data: "New Orders" },
    { id: 2, value: "completed", data: "Completed Orders" },
    { id: 3, value: "shipped", data: "Shipped Orders" },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
    setRequest({ ...request, status: e.target.value });
  };
  return (
    <div className="pull-right">
      <form onSubmit={handleSubmit}>
        <div style={{ width: "200px", marginLeft: "10px" }}>
          <select
            className="col-lg-12 col-xl-6 col-md-4 col-sm-5  "
            style={{ padding: "5px" }}
            value={status}
            onChange={(e) => handleSubmit(e)}
          >
            {appointmentStatus?.map((status) => (
              <option value={status?.value} selected>
                {status?.data}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Table_order_status;
