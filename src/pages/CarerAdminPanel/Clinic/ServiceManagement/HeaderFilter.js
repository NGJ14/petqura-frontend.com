import DateRangeSelector from "../../../../components/DateRangeSelector";
import moment from "moment";
import React, { useState } from "react";
import { Modal } from "reactstrap";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const OrderFilter = ({ setRequest, request }) => {
  const initDateRange = [
    {
      startDate: new Date().setDate("1"),
      endDate: new Date(),
      key: "selection",
    },
  ];
  const [modal_center, setmodal_center] = useState(false);
  const [dateRangestate, setDateRangestate] = useState(initDateRange);

  const getDateRangeString = () => {
    return (
      moment(dateRangestate[0].startDate).format("DD-MM-YYYY") +
      " - " +
      moment(dateRangestate[0].endDate).format("DD-MM-YYYY")
    );
  };

  const tog_center = () => {
    setmodal_center(!modal_center);
  };

  const handleApply = (filterData) => {
    setRequest({
      ...request,
      ...filterData,
    });
  };

  const onClickOk = () => {
    handleApply({
      from_date: moment(dateRangestate[0].startDate).format("DD-MM-YYYY"),
      to_date: moment(dateRangestate[0].endDate).format("DD-MM-YYYY"),
    });
    tog_center();
  };

  return (
    <>
      <div className="date-range-filter mt-4">
        <span className="date-range-label mr-3">Date Range:</span>
        <input
          type="text"
          className="inputField_CSS order-date-range"
          readOnly
          value={getDateRangeString()}
          onClick={tog_center}
        />
        <Modal
          isOpen={modal_center}
          toggle={tog_center}
          centered
          className="date-range-modal"
        >
          <DateRangeSelector
            handleDateRangeChange={(event) => {
              setDateRangestate(event);
            }}
            dateRange={dateRangestate}
            minDate={new Date("2021,Jan,1")}
          />
          <div className="modal-footer">
            <button
              className="btn btn-light"
              onClick={() => {
                setDateRangestate(initDateRange);
                tog_center();
              }}
              data-testid="component-filter-cancel"
            >
              Cancel
            </button>
            <button
              className="btn bgcolor-btn-green"
              onClick={onClickOk}
              data-testid="component-filter-apply"
            >
              Ok
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default OrderFilter;
