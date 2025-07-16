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

  const isMobile = window.innerWidth <= 768;
  const [isOpen1, setIsOpen1] = useState(!isMobile); // ✅ collapsed on mobile by default

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

  return (
    <>
      <aside
        className="widget widget-select-product my-0"
        style={{ padding: "0!important" }}
      >
        <Link to="#" onClick={toggleCollapse1} className="text-dark">
          <CardHeader
            id="profile-user-headingOne"
            className=" d-flex justify-content-between"
          >
            <h5 className="font-size-14 m-0">Price</h5>
            <i
              className={
                isOpen1
                  ? "fas fa-solid fa-caret-up"
                  : "fas fa-solid fa-caret-down"
              }
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
            </ul>
          </CardBody>
        </Collapse>
      </aside>
    </>
  );
};

export default FilterByPrice;
