import React, { useState } from "react";
import { Collapse, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

const StarRating = ({ request, setRequest }) => {
  const [isOpen1, setIsOpen1] = useState(true);

  const starFilter = [
    { id: 1, value: "One and above" },
    { id: 2, value: "Two and above" },
    { id: 3, value: "Three and above" },
    { id: 4, value: "Four and above" },
  ];
  const toggleCollapse1 = () => {
    setIsOpen1(!isOpen1);
  };

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
            <h5 className="font-size-14 m-0">Rating</h5>
            <i
              className={isOpen1 ? "fas fa-solid fa-caret-up" : "fas fa-solid fa-caret-down"}
            ></i>
          </CardHeader>
        </Link>
        <Collapse isOpen={isOpen1}>
          <CardBody>
            <ul>
              {starFilter?.length
                ? starFilter?.map((star) => (
                    <li className="d-flex mb-0 pb-0 mt-3">
                      <label htmlFor={star?.id} className="filter-label d-flex">
                        <input
                          className="mt-1"
                          type="radio"
                          name="rating"
                          style={{ display: "inline " }}
                          id={star?.id}
                          onClick={(e) =>
                            e.target.checked
                              ? setRequest({
                                  ...request,
                                  rating: star?.id,
                                  page: 1,
                                })
                              : setRequest({
                                  ...request,
                                  page: 1,
                                })
                          }
                        />
                        {star?.value}
                      </label>
                    </li>
                  ))
                : null}
              <li className="d-flex mb-0 pb-0 mt-3">
                <label htmlFor="star-all" className="filter-label d-flex">
                  <input
                    className="mt-1"
                    type="radio"
                    name="rating"
                    style={{ display: "inline " }}
                    id="star-all"
                    onClick={(e) => {
                      delete request["rating"];
                      e.target.checked
                        ? setRequest({
                            ...request,
                            page: 1,
                          })
                        : setRequest({
                            ...request,
                            page: 1,
                          });
                    }}
                  />
                  All
                </label>
              </li>
            </ul>
          </CardBody>
        </Collapse>
      </aside>
    </>
  );
};

export default StarRating;
