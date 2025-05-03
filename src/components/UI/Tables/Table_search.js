import React, { useState } from "react";

const Table_search = ({ setRequest, request, searchTerm }) => {
  let [searchText, setSearchText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setRequest({ ...request, keyword: searchText });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="SearchWrapper d-flex" style={{ width: "550px" }}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            className="form-control tableSearchField"
          />
          <button
            style={{
              backgroundColor: "white",
              borderRight: "none",
              borderLeft: "none",
              borderTop: "none",
              borderBottom: "none",
              marginTop: "3px",
              marginBottom: "3px",
              borderTopWidth: "1px",
              borderTopColor: "#CED4DA",
              borderBottomColor: "#ffffff",
              borderBottomWidth: "1px",
              marginLeft: "-26px",
            }}
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Table_search;
