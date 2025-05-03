import React from "react";
import StarRating from "./StarRating";
import FilterByPrice from "./filterByPrice";
import SelectProduct from "./selectProduct";
import Brands from "./brand";

const Sidebar = ({
  categories,
  request,
  setRequest,
  sidebar,
  brands,
  filter,
  setfilter,
  setbfilter,
  bfilter,
}) => {
  return (
    // Product Filter
    <>
      <div
        className={`${
          sidebar ? null : "col-xl-3 col-lg-3 col-md-3 col-sm-4"
        } ml-0 pl-0 pr-0 mt-4 filter-border`}
      >
        <SelectProduct
          categories={categories}
          request={request}
          setRequest={setRequest}
          sidebar={sidebar}
          filter={filter}
          setfilter={setfilter}
        />
        <FilterByPrice
          request={request}
          setRequest={setRequest}
          sidebar={sidebar}
        />

        <Brands
          brands={brands}
          request={request}
          setRequest={setRequest}
          sidebar={sidebar}
          bfilter={bfilter}
          setbfilter={setbfilter}
        />

        {/* <Brand /> */}
        <StarRating
          request={request}
          setRequest={setRequest}
          sidebar={sidebar}
        />
      </div>
    </>
  );
};

export default Sidebar;
