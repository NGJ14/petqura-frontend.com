import React from "react";
import { Card, CardBody } from "reactstrap";

const Thanks = () => {
  return (
    <Card
      style={{
        borderRadius: "10px",
        border: "0.2px groove #333",
        minHeight: "550px",
        overflow: "auto",
      }}
      className="pb-5"
    >
      <CardBody className="p-0">
        <div
          style={{
            background: "#FFF",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <h2 className="mt-5">
            <i
              className="fa fa-check bg-info rounded-circle text-white"
              style={{ fontSize: "20px", padding: "5px" }}
              aria-hidden="true"
            ></i>{" "}
          </h2>
          <h3 className="card-title orange-font">Success</h3>
          <h4 className="card-text mt-50 col-8 mb-50 px-5 ">
            Not all heroes wear a cape. Some are looking at their screens and
            reading this.
          </h4>

          <p className="card-text mt-5 col-8 mb-80 px-5">
            Thank you for your contribution. We and the dogs on the street are
            grateful to you for this gesture.
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default Thanks;
