import React, { useEffect, useState } from "react";

import Pagination from "react-js-pagination";

const TablePagination = ({ totalRecords, setRequest, request }) => {
  const [activePage, setActivePage] = useState(request?.page || 1);
  const [perPage] = useState(request?.page_count || 9);
  useEffect(() => {
    if (totalRecords <= perPage && request?.page > 1) {
      setActivePage(1);
      setRequest({ ...request, page: 1 });
    }
  }, [totalRecords, perPage, setRequest, request]);

  const [aStateVariable, setAStateVariable] = useState(false);

  const handleClick = () => {
    setAStateVariable(true);
  };

  useEffect(() => {
    if (aStateVariable === true) {
      window.scrollTo(0, 0);
      setAStateVariable(false);
    }
  }, [aStateVariable]);

  return (
    <div className="pagination_wrap mt-3 mx-3">
      <Pagination
        activePage={activePage}
        itemsCountPerPage={perPage}
        totalItemsCount={totalRecords || 0}
        pageRangeDisplayed={5}
        itemClass="page-item"
        linkClass="page-link"
        onChange={(val) => {
          handleClick();
          setActivePage(val);
          setRequest({ ...request, page: val });
        }}
      />
    </div>
  );
};

export default TablePagination;
