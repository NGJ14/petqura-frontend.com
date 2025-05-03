import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProductCategoryDetails } from "../../../store/UserStore/Shop/action";

function FilterNavbar({
  sidebar,
  showSidebar,
  request,
  setRequest,
  PetType,
  categories,
  index,
  setIndex,
}) {
  let [filterName, setFilterName] = useState("Categories");
  let [categoryName, setCategoryName] = useState([]);
  let [priceValue, setPriceValue] = useState([]);
  let [starValue, setStarValue] = useState([]);

  const [req, setReq] = useState(request);
  const [startfilter, setStartFilter] = useState([]);
  const [endfilter, setEndFilter] = useState([]);
  const [startValue, setStartValue] = useState();
  const [endValue, setEndValue] = useState();
  const priceFilter = [
    { id: 1, start_value: 0, end_value: 49 },
    { id: 2, start_value: 50, end_value: 99 },
    { id: 3, start_value: 100, end_value: 499 },
    { id: 4, start_value: 500, end_value: 999 },
    { id: 5, start_value: 1000, end_value: 5000 },
  ];

  const starFilter = [
    { id: 1, value: "One and above" },
    { id: 2, value: "Two and above" },
    { id: 3, value: "Three and above" },
    { id: 4, value: "Four and above" },
  ];

  const SidebarData = [
    { title: "Pets", name: "nav-text" },
    {
      title: "Categories",
      cName: "nav-text",
    },
    {
      title: "Price Range",
      cName: "nav-text",
    },
    {
      title: "Star Rating",
      cName: "nav-text",
    },
  ];

  const dispatch = useDispatch();
  const handleCategoryFilter = (name) => {
    if (!categoryName?.includes(name)) {
      setCategoryName([...categoryName, name]);
    } else {
      setCategoryName(categoryName.filter((item) => item !== name));
    }
    setReq({ ...req, category_filter: categoryName });
  };

  const handlePriceFilter = (start, end) => {
    if (!startfilter.includes(start)) {
      setStartFilter([...startfilter, start]);
    } else {
      setStartFilter(startfilter.filter((item) => item !== start));
    }
    if (!endfilter.includes(end)) {
      setEndFilter([...endfilter, end]);
    } else {
      setEndFilter(endfilter.filter((item) => item !== end));
    }
    if (startfilter.length == 0) {
      return setStartValue(0);
    } else {
      setStartValue(Math.min(...starFilter));
    }
    if (endfilter.length == 0) {
      return setEndValue(5000);
    } else {
      setEndValue(Math.min(...endfilter));
    }
  };

  return (
    <>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <h4 className=" line-border pl-4 mb-3">Filters</h4>
        <ul className="nav-menu-items mt-5">
          {SidebarData.map((item, index) => {
            return (
              <li
                key={index}
                className={`${item.cName} py-2 cursor-pointer`}
                onClick={() => setFilterName(item.title)}
                style={{
                  background: `${
                    item.title == filterName ? "#a7a6a6" : "#f5f3f3"
                  }`,
                }}
              >
                <span>{item.title}</span>
              </li>
            );
          })}
        </ul>
      </nav>
      <nav className={sidebar ? "nav-menu1 active" : "nav-menu1"}>
        <ul className="nav-menu-items1 mt-5">
          {filterName == "Pets" ? (
            PetType?.map((pet, i) => (
              <li
                className="filter-nav-item d-flex cursor-pointer"
                onClick={() => {
                  setIndex(i);
                  setRequest({
                    ...req,
                    ideal_for: pet?.value,
                  });
                  dispatch(
                    getUserProductCategoryDetails({
                      data: {
                        ideal_for: pet?.value,
                      },
                    })
                  );

                  setReq({
                    ...req,
                    ideal_for: pet?.value,
                  });
                }}
              >
                {
                  <i
                    className={`${
                      index == i ? "fa fa-check mr-2 mt-1 orange-font" : "mr-4"
                    }`}
                    aria-hidden="true"
                  ></i>
                }

                <p>{pet?.value}</p>
              </li>
            ))
          ) : filterName == "Categories" ? (
            <div>
              {categories?.length
                ? categories?.map((category) => (
                    <li className="filter-nav-item d-flex ">
                      {
                        <i
                          className={`${
                            categoryName?.includes(category?.category_name)
                              ? "fa fa-check mr-2 mt-1 orange-font"
                              : "mr-4"
                          }`}
                          aria-hidden="true"
                        ></i>
                      }

                      <p
                        className="cursor-pointer"
                        onClick={() => {
                          handleCategoryFilter(category?.category_name);
                        }}
                      >
                        {category?.category_name} ({category?.product_count})
                      </p>
                    </li>
                  ))
                : null}
              <li className="filter-nav-item d-flex  ">
                {
                  <i
                    className={`${
                      "all" == priceValue
                        ? "fa fa-check mr-2 mt-1 orange-font"
                        : "mr-4"
                    }`}
                    aria-hidden="true"
                  ></i>
                }

                <p
                  className="cursor-pointer "
                  onClick={() => {
                    setPriceValue("all");
                    setReq({
                      ...req,
                      start_price: 0,
                      end_price: 5000,
                    });
                  }}
                >
                  All
                </p>
              </li>
            </div>
          ) : filterName == "Price Range" ? (
            <div>
              {categories?.length
                ? priceFilter?.map((price) => (
                    <li className="filter-nav-item d-flex  ">
                      {
                        <i
                          className={`${
                            priceValue?.includes(price?.id)
                              ? "fa fa-check mr-2 mt-1 orange-font"
                              : "mr-4"
                          }`}
                          aria-hidden="true"
                        ></i>
                      }

                      <p
                        className="cursor-pointer "
                        onClick={() => {
                          handlePriceFilter(
                            price.start_value,
                            price?.end_value
                          );
                        }}
                      >
                        Rs.{price?.start_value} to Rs.{price?.end_value}
                      </p>
                    </li>
                  ))
                : null}
              <li className="filter-nav-item d-flex  ">
                {
                  <i
                    className={`${
                      priceValue?.includes("All")
                        ? "fa fa-check mr-2 mt-1 orange-font"
                        : "mr-4"
                    }`}
                    aria-hidden="true"
                  ></i>
                }

                <p
                  className="cursor-pointer "
                  onClick={() => {
                    handlePriceFilter("All");
                  }}
                >
                  All
                </p>
              </li>
            </div>
          ) : filterName == "Star Rating" ? (
            <div>
              {categories?.length
                ? starFilter?.map((star) => (
                    <li className="filter-nav-item d-flex  ">
                      {
                        <i
                          className={`${
                            star?.id == starValue
                              ? "fa fa-check mr-2 mt-1 orange-font"
                              : "mr-4"
                          }`}
                          aria-hidden="true"
                        ></i>
                      }

                      <p
                        className="cursor-pointer "
                        onClick={() => {
                          setStarValue(star?.id);
                          setReq({
                            ...req,
                            rating: star?.id,
                          });
                        }}
                      >
                        {star?.value}
                      </p>
                    </li>
                  ))
                : null}
            </div>
          ) : null}
        </ul>
        {sidebar ? (
          <div className="filter-cation-btn-container row">
            <button
              className=" btn btn-default w-50 font-weight-bold  mt-5 px-0 mx-0"
              type="submit"
              onClick={() => {
                showSidebar();
                setRequest(req);
              }}
            >
              APPLY
            </button>
            <button
              className=" btn btn-default w-50 font-weight-bold  mt-5 px-0 mx-0"
              type="submit"
              onClick={showSidebar}
            >
              CANCEL
            </button>
          </div>
        ) : null}
      </nav>
    </>
  );
}

export default FilterNavbar;
