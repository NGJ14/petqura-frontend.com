import React, { useEffect, useState } from "react";
import { Collapse, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

const SelectProduct = ({
  categories,
  request,
  setRequest,
  filter,
  setfilter,
}) => {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [foodItem, setFoodItem] = useState(false);
  const [foodValue, setFoodValue] = useState("");
  const [id, setId] = useState("");
  const [foodFilter, setFoodFilter] = useState(false);
  const [foodArr, setFoodArr] = useState([]);

  useEffect(() => {
    if (filter?.length) {
      setFoodFilter(true);
    } else {
      setFoodFilter(false);
      delete request.veg_filter;
    }
  }, [filter]);

  const handleFilter = (e, id, is_food_item) => {
    if (e.target.checked) {
      setfilter((oldArray) => [...oldArray, id]);
      if (is_food_item) {
        setFoodArr([...foodArr, { id: id, foodItem: true }]);
      } else {
        setFoodArr([...foodArr, { id: id, foodItem: false }]);
        setFoodFilter(false);
        delete request.veg_filter;
      }
    } else {
      setfilter(filter.filter((item) => item !== id));
      setFoodArr(foodArr.filter((item) => item?.id !== id));
    }
  };

  useEffect(() => {
    if (foodArr.every((i) => i.foodItem == true)) setId(true);
    else setId(false);
  }, [foodArr]);

  const handleFoodCategory = (value, checked) => {
    if (checked) {
      setFoodValue(value);
    } else {
      setFoodValue("");
    }
  };

  useEffect(() => {
    setRequest({
      ...request,
      category_filter: filter,
      page: 1,
    });
  }, [filter]);

  useEffect(() => {
    if (foodValue != "") {
      setRequest({
        ...request,
        veg_filter: foodValue,
        page: 1,
      });
    } else {
      setRequest({
        ...request,
        veg_filter: "",
        page: 1,
      });
    }
  }, [foodValue]);

  const toggleCollapse1 = () => {
    setIsOpen1(!isOpen1);
    setIsOpen2(false);
  };

  const toggleCollapse2 = () => {
    setIsOpen2(!isOpen2);
    setIsOpen1(false);
  };

  return (
    <>
      {categories?.length ? (
        <aside
          className="widget widget-select-product my-0"
          // style={{ border: "1px solid #eeeeee", padding: "0px 10px" }}
          style={{ padding: "0!important" }}
        >
          <Link to="#" onClick={toggleCollapse1} className="text-dark">
            <CardHeader
              id="profile-user-headingOne"
              className=" d-flex justify-content-between"
            >
              <h5 className="font-size-14 m-0">Categories</h5>
              <i
                className={
                  isOpen1 ? "fas fa-solid fa-caret-up" : "fas fa-solid fa-caret-down"
                }
              ></i>
            </CardHeader>
          </Link>

          <Collapse isOpen={isOpen1}>
            <CardBody>
              <ul>
                {categories?.length
                  ? categories?.map((category, i) => (
                      <li className="d-flex mb-0 pb-0">
                        <label
                          htmlFor={category?.category_name}
                          className="filter-label"
                        >
                          <input
                            className="mt-3"
                            type="checkbox"
                            id={category?.category_name}
                            onClick={(e) => {
                              handleFilter(
                                e,
                                category?.id,
                                category?.is_food_item
                              );
                            }}
                            checked={
                              filter?.includes(category?.id) ? true : false
                            }
                          />
                          {/* <span className="checkBox"></span> */}
                          {category?.category_name}
                          <span className="brand-num">
                            ({category?.product_count})
                          </span>
                        </label>
                      </li>
                    ))
                  : null}
              </ul>
            </CardBody>
          </Collapse>
        </aside>
      ) : null}
      {id && foodFilter ? (
        <aside
          className="widget widget-select-product my-0"
          // style={{ border: "1px solid #eeeeee", padding: "0px 10px" }}
          style={{ padding: "0!important" }}
        >
          <Link to="#" onClick={toggleCollapse2} className="text-dark">
            <CardHeader
              id="profile-user-headingOne d-flex "
              className=" d-flex justify-content-between"
            >
              <h5 className="font-size-14 m-0">VEG,NON-VEG</h5>
              <i
                className={
                  isOpen2 ? "fas fa-chevron-up" : "fas fa-chevron-down"
                }
              ></i>
            </CardHeader>
          </Link>
          <Collapse isOpen={isOpen2}>
            <CardBody>
              <ul>
                <li className="d-flex mb-0 pb-0">
                  <label htmlFor="veg" className="filter-label">
                    <input
                      style={{ display: "inline-block" }}
                      className="mt-3"
                      type="radio"
                      id="veg"
                      value="veg"
                      name="food"
                      checked={foodValue === "veg"}
                      onClick={(e) => {
                        handleFoodCategory(e.target?.value, e.target?.checked);
                      }}
                    />
                    Veg
                  </label>
                </li>

                <li className="d-flex mb-0 pb-0">
                  <label htmlFor="non_veg" className="filter-label">
                    <input
                      style={{ display: "inline-block" }}
                      className="mt-3"
                      type="radio"
                      id="non_veg"
                      value="non_veg"
                      name="food"
                      checked={foodValue === "non_veg"}
                      onClick={(e) => {
                        handleFoodCategory(e.target?.value, e.target?.checked);
                      }}
                    />
                    Non-Veg
                  </label>
                </li>
                <li className="d-flex mb-0 pb-0">
                  <label htmlFor="all" className="filter-label">
                    <input
                      style={{ display: "inline-block" }}
                      className="mt-3"
                      type="radio"
                      id="all"
                      value=""
                      name="food"
                      checked={foodValue === ""}
                      onClick={(e) => {
                        handleFoodCategory("", e.target?.checked);
                      }}
                    />
                    All
                  </label>
                </li>
              </ul>
            </CardBody>
          </Collapse>
        </aside>
      ) : null}
    </>
  );
};

export default SelectProduct;
