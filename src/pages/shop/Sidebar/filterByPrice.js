import React, { useEffect, useState } from "react";

import { Collapse, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const FilterByPrice = ({ request, setRequest }) => {
  const [startfilter, setStartFilter] = useState([]);
  const [endfilter, setEndFilter] = useState([]);
  const [val1, setVal1] = useState([0, 1000]);
  const [val2, setVal2] = useState([0, 1000]);
  // const priceFilter = [
  //   { id: 6, start_value: 1, end_value: 49 },
  //   { id: 7, start_value: 50, end_value: 99 },
  //   { id: 8, start_value: 100, end_value: 499 },
  //   { id: 9, start_value: 500, end_value: 999 },
  //   { id: 10, start_value: 1000, end_value: 99999 },
  // ];
  const [isOpen1, setIsOpen1] = useState(true);

  const toggleCollapse1 = () => {
    setIsOpen1(!isOpen1);
  };

  useEffect(() => {
    setRequest({
      ...request,
      start_price: val1[0],
      end_price: val1[1],
      page: 1,
    });
  }, [val2]);

  console.log(val1);

  return (
    <>
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
            <h5 className="font-size-14 m-0 ">Price</h5>
            <i
              className={isOpen1 ? "fas fa-solid fa-caret-up" : "fas fa-solid fa-caret-down"}
            ></i>
          </CardHeader>
        </Link>
        <Collapse isOpen={isOpen1}>
          <CardBody>
            <ul>
              <div>
                <p className="my-2">
                  Rs.{val1[0]} - Rs.{val1[1]}
                </p>
                <Slider
                  range
                  draggableTrack
                  min={0}
                  max={10000}
                  value={val1}
                  onAfterChange={setVal2}
                  onChange={setVal1}
                />
              </div>
              {/* {priceFilter?.length
                ? priceFilter?.map((price) => (
                    <li className="d-flex mb-0 pb-0">
                      <label htmlFor={price?.id} className="filter-label">
                        <input
                          className="mt-3"
                          type="radio"
                          name="price"
                          id={price?.id}
                          style={{ display: "inline" }}
                          onClick={(e) =>
                            e.target.checked
                              ? setRequest({
                                  ...request,
                                  start_price: price?.start_value,
                                  end_price: price?.end_value,
                                  page: 1,
                                })
                              : setRequest({
                                  ...request,
                                  start_price: 0,
                                  end_price: 10000,
                                  page: 1,
                                })
                          }
                        />
                        Rs. {price?.start_value} <span>to</span> Rs.{" "}
                        {price?.end_value}
                      </label>
                    </li>
                  ))
                : null}
              <li className="d-flex mb-0 pb-0">
                <label htmlFor="all-price" className="filter-label">
                  <input
                    className="mt-3"
                    type="radio"
                    name="price"
                    id="all-price"
                    style={{ display: "inline" }}
                    onClick={(e) => {
                      delete request?.start_price;
                      delete request?.end_price;
                      setRequest({
                        ...request,
                        page: 1,
                      });
                    }}
                  />
                  All
                </label>
              </li> */}
            </ul>
          </CardBody>
        </Collapse>
      </aside>
    </>
  );
};

export default FilterByPrice;
