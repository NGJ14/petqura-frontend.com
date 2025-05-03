import "rsuite/dist/rsuite.min.css";
import { DateRangePicker } from "rsuite";
import { useState } from "react";

const DateRangeSelectorRsuite = ({ setValue, value, onClean }) => {
  return (
    <DateRangePicker
      onOk={setValue}
      value={value}
      style={{ width: 220 }}
      placeholder="Select Date Range"
      onClean={onClean}
    />
  );
};

// const DateRangePicker = ({ handleDateRangeChange, dateRange, minDate = new Date("1970,Jan,1"), maxDate = new Date() }) => {
//   return (
//     <DateRange
//       editableDateInputs={true}
//       onChange={item => handleDateRangeChange([item.selection])}
//       ranges={dateRange}
//       rangeColors={["#42a5f5"]}
//       minDate={minDate}
//       maxDate={maxDate}
//       retainEndDateOnFirstSelection={true}
//     />
//   );
// };

export default DateRangeSelectorRsuite;
