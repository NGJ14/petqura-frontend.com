import React, { useState } from "react";

const Table_status = ({ setRequest, request, searchTerm }) => {
  let [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("placed");
  const appointmentStatus = [
    { id: 1, value: "all", data: "All Appointments" },
    { id: 2, value: "pending", data: "Pending Requests" },
    { id: 3, value: "confirmed", data: "Confirmed Appointments" },
    { id: 4, value: "cancelled", data: "Cancelled Appointments" },
    { id: 5, value: "completed", data: "Completed Appointments" },
    { id: 5, value: "clinic_blocked", data: "Blocked Slots" },
    // { id: 4, value: "user_cancelled", data: "User Cancelled" },
    {
      id: 6,
      value: "reschedule_requested",
      data: "Reschedule Requested Appointments",
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(e.target.value);

    setRequest({ ...request, status: e.target.value });
  };
  return (
    <div className="pull-right">
      <form onSubmit={handleSubmit}>
        <div className="pl-3">
          <select
            className="col-lg-12 col-xl-6 col-md-4 col-sm-5"
            style={{ padding: "6px" }}
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

export default Table_status;
