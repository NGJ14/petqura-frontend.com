import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

const Breadcrumb = (props) => {
  return (
    <Row>
      <Col className="col-12">
        <div className="ml-4 my-1 font-weight-bold page-title-box d-flex align-items-center justify-content-between">
          <h4 className="mb-3">{props.breadcrumbItem}</h4>
        </div>
      </Col>
    </Row>
  );
};

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
};

export default Breadcrumb;
