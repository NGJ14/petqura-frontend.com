import React from "react";
import DataTable from "react-data-table-component";
import { Card, CardTitle } from "reactstrap";
import TableSearch from "./Table_search";
import TableStatus from "./Table_status";
import TableOrderStatus from "./Table_order_status";
import TableHeaderButton from "./Table_headerButton";
import TableDateRange from "./Table_date_range";
import TablePagination from "./Pagination";

import "./datatables.scss";
import TableFooter from "./TableFooter";

const Datatable = ({
  title,
  columns,
  rows,
  search,
  daterange,
  clean,
  appointmentstatus,
  orderstatus,
  defaultSortField,
  defaultSortAsc,
  request,
  setRequest,
  totalRecords,
  filter,
  setImportFile,
  addNewClickHandler,
  upload,
  add,
  tableRowClicked,
  searchTerm,
  loading,
  addNewLabel,
  noPagination,
  tableCardClassName,
  tablefooter,
  data,
  addFee,
  addFeeClickHandler,
  uploadProductshandler,
}) => {
  return (
    <Card className={`p-2 ${tableCardClassName}`}>
      {title && <CardTitle>{title}</CardTitle>}
      <div className=" ml-3 table_header">
        {search && (
          <TableSearch
            setRequest={setRequest}
            request={request}
            searchTerm={searchTerm}
          />
        )}
        {appointmentstatus && (
          <TableStatus setRequest={setRequest} request={request} />
        )}
        {orderstatus && (
          <TableOrderStatus setRequest={setRequest} request={request} />
        )}
        {daterange && (
          <TableDateRange
            setRequest={setRequest}
            request={request}
            setValue={daterange}
            onClean={clean}
          />
        )}
        <TableHeaderButton
          filter={filter}
          setRequest={setRequest}
          request={request}
          setImportFile={setImportFile}
          addNewClickHandler={addNewClickHandler}
          upload={upload}
          add={add}
          addFee={addFee}
          addNewLabel={addNewLabel}
          addFeeClickHandler={addFeeClickHandler}
          uploadProductshandler={uploadProductshandler}
        />
      </div>
      <DataTable
        columns={columns}
        data={rows}
        defaultSortField={defaultSortField}
        defaultSortAsc={defaultSortAsc}
        onSort={(column, sortDirection, event) =>
          setRequest({
            ...request,
            sort: column.selector,
            sort_order: sortDirection,
          })
        }
        sortServer={true}
        pagination={false}
        striped={true}
        onRowClicked={tableRowClicked}
      />
      <div>{tablefooter && <TableFooter data={data} />}</div>
      <div>
        {!noPagination && (
          <TablePagination
            setRequest={setRequest}
            request={request}
            totalRecords={totalRecords}
            loading={loading}
          />
        )}
      </div>
    </Card>
  );
};

export default Datatable;
