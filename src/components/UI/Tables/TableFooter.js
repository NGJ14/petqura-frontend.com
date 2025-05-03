import React from "react";

const TableFooter = ({ data }) => {
  return (
    <div className="text-left my-5 ml-4">
      <p>
        <span>
          <strong>Total Revenue</strong>
        </span>{" "}
        : {data?.total_revenue}
      </p>
    </div>
  );
};

export default TableFooter;
