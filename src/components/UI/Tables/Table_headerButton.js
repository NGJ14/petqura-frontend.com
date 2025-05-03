import React from "react";

const Table_headerButton = ({
  add,
  upload,
  addNewClickHandler,
  addFee,
  addNewLabel,
  addFeeClickHandler,
  uploadProductshandler,
}) => {
  return (
    <div className="table-header-buttons">
      {add && (
        <button
          type="button"
          className="btn waves-effect waves-light cust_no_shadow"
          style={{ background: "#00419D", color: "#fff", fontWeight: "bold" }}
          onClick={() => addNewClickHandler()}
        >
          {addNewLabel}
        </button>
      )}

      {upload && (
        <button
          className="btn waves-effect waves-light cust_no_shadow"
          style={{ background: "#00419D", color: "#fff", fontWeight: "bold" }}
          onClick={() => uploadProductshandler()}
        >
          UPLOAD PRODUCTS
        </button>
      )}

      {addFee && (
        <button
          className="btn waves-effect waves-light cust_no_shadow"
          style={{ background: "#00419D", color: "#fff", fontWeight: "bold" }}
          onClick={() => addFeeClickHandler()}
        >
          ADD SLOT PRICE
        </button>
      )}
    </div>
  );
};

export default Table_headerButton;
