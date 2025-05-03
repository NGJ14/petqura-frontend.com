

import React from "react";
import { DateRange } from "react-date-range";

const DateRangeSelector = ({ handleDateRangeChange, dateRange, minDate = new Date("1970,Jan,1"), maxDate = new Date() }) => {
  return (
    <DateRange
      editableDateInputs={true}
      onChange={item => handleDateRangeChange([item.selection])}
      ranges={dateRange}
      rangeColors={["#42a5f5"]}
      minDate={minDate}
      maxDate={maxDate}
      retainEndDateOnFirstSelection={true}
    />
  );
};

export default DateRangeSelector;
