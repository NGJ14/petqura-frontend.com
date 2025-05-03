import DateRangeSelector from "../../../../components/DateRangeSelector";
import DateRangeSelectorRsuite from "../../../../components/DateRangeSelectorRsuite";
import moment from "moment";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// https://rsuitejs.com/components/date-range-picker/
//https://master--rsuite.netlify.app/en/components/date-range-picker

const OrderFilter = ({ setRequest, request }) => {
  const handleApply = (filterData) => {
    setRequest({
      ...request,
      ...filterData,
    });
  };

  const setDate = (date) => {
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
    <>
      <div className="date-range-filter">
        <DateRangeSelectorRsuite
          setValue={setDate}
          onClean={onClean}
          // value={value}
          // style={{ width: 220 }}
          // placeholder="Select Date Range"
        />
      </div>
    </>
  );
};

export default OrderFilter;
