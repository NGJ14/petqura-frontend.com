import React, { useEffect, useState } from "react";
import { Collapse, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

const Brands = ({ brands, request, setRequest, bfilter, setbfilter }) => {
  const [isOpen1, setIsOpen1] = useState(true);

  const handleFilter = (e, id, is_food_item) => {
    if (e.target.checked) {
      setbfilter((oldArray) => [...oldArray, id]);
    } else {
      setbfilter(bfilter.filter((item) => item !== id));
    }
  };


  useEffect(() => {
    setRequest({
      ...request,
      brand_filter: bfilter,
      page: 1,
    });
  }, [bfilter]);

  const toggleCollapse1 = () => {
    setIsOpen1(!isOpen1);
  };

  return (
    <>
      {brands?.length ? (
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
              <h5 className="font-size-14 m-0">Brands</h5>
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
                {brands?.length
                  ? brands?.map((category, i) => (
                      <li className="d-flex mb-0 pb-0">
                        <label htmlFor={category} className="filter-label">
                          <input
                            className="mt-3"
                            type="checkbox"
                            id={category}
                            onClick={(e) => {
                              handleFilter(e, category);
                            }}
                            checked={bfilter?.includes(category) ? true : false}
                          />
                          {category}
                          {/* <span className="brand-num">
                            ({category?.product_count})
                          </span> */}
                        </label>
                      </li>
                    ))
                  : null}
              </ul>
            </CardBody>
          </Collapse>
        </aside>
      ) : null}
    </>
  );
};

export default Brands;
