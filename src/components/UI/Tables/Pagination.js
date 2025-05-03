import React, { useEffect, useState } from "react";

import Pagination from "react-js-pagination";

const TablePagination = ({ totalRecords, setRequest, request, loading }) => {
  const [activePage, setActivePage] = useState(request?.page || 1);
  const [perPage, setPerPage] = useState(request?.page_count || 50);
  useEffect(() => {
    if (totalRecords <= perPage && request?.page > 1) {
      setActivePage(1);
      setRequest({ ...request, page: 1 });
    }
  }, [totalRecords, perPage]);

  return (
    <div className="table_bottom_wrap">
      <div className="page_dd_wrap">
        <div className="perPage-wrap">
          <label className="col-form-label cust-select-label-wrap">
            Per Page
          </label>
          <select
            className="form-control tableRecordsSelect cursor-pointer"
            onChange={(e) => {
              setPerPage(parseInt(e.target.value, 10));
              setActivePage(1);
              setRequest({ ...request, page: 1, page_count: e.target.value });
            }}
            value={perPage}
          >
            <option>25</option>
            <option>50</option>
            <option>100</option>
            <option>500</option>
            <option>1000</option>
          </select>
        </div>
        {!loading && totalRecords > 0 && (
          <div className="total-records">
            {`${activePage * perPage - (perPage - 1)}-${
              activePage * perPage > totalRecords
                ? totalRecords
                : activePage * perPage
            } of ${totalRecords}`}{" "}
          </div>
        )}
      </div>

      <div className="pagination_wrap">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={perPage}
          totalItemsCount={totalRecords || 0}
          pageRangeDisplayed={5}
          itemClass="page-item"
          linkClass="page-link"
          onChange={(val) => {
            setActivePage(val);
            setRequest({ ...request, page: val });
          }}
        />
      </div>
    </div>
  );
};

export default TablePagination;
