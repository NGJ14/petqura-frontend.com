import React from "react";
import moment from "moment";
import "rsuite/dist/rsuite.min.css";
import { DateRangePicker } from "rsuite";

const DateRangeTableFilter = ({ setRequest, request }) => {
  const handleApply = (filterData) => {
    setRequest({
      ...request,
      ...filterData,
    });
  };
  const setValue = (date) => {
    handleApply({
      from_date: moment(date[0]).format("DD-MM-YYYY"),
      to_date: moment(date[1]).format("DD-MM-YYYY"),
    });
  };
  const onClean = () => {
    delete request["from_date"];
    delete request["to_date"];
    setRequest({
      ...request,
    });
  };
  return (
    <div className="pull-right">
      <DateRangePicker
        onOk={setValue}
        style={{ width: 220 }}
        placeholder="Select Date Range"
        onClean={onClean}
      />
    </div>
  );
};

export default DateRangeTableFilter;
