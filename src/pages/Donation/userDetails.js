import React, { useEffect, useState } from "react";
import { Card, CardBody, Form, Input } from "reactstrap";

const UserDetails = ({
  amount,
  setActiveTab,
  fullname,
  phone,
  setFullname,
  setPhone,
  email,
  setEmail,
  address1,
  setAddress1,
  address2,
  setAddress2,
  setType,
  type,
  handleAddDetailsClick,
  handleSkipClick,
}) => {
  const [disableSubmit, setDisableSubmit] = useState(false);

  useEffect(() => {
    if (
      fullname == "" ||
      phone == "" ||
      email == "" ||
      address1 == "" ||
      type == ""
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [fullname, phone, email, address1, type]);

  return (
    <Card
      style={{
        borderRadius: "10px",
        border: "0.2px groove #333",
        maxHeight: "550px",
        overflow: "auto",
      }}
      className="pb-5"
    >
      <CardBody className="p-0 text-center">
        <div
          style={{
            background: "#FFF",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <p className="font-weight-bold pt-3 mt-3">
            You can make a big difference to their lives!
          </p>
          <h3 className="orange-font">₹{amount}</h3>
        </div>
        <div className="col-md-12 mt-4 ">
          {/* <label>Enter Full Name</label> */}
          <form onSubmit={handleAddDetailsClick}>
            <div class="form-group">
              <div class="col-sm-6">
                <label for="exampleInputEmail1" style={{ textAlign: "left" }}>
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter Full Name"
                  className="col-md-8 mb-4 form-control"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-6">
                <label
                  for="exampleInputEmail1 text-left"
                  style={{ textAlign: "left" }}
                >
                  Mobile Number
                </label>
                <Input
                  type="number"
                  placeholder="Enter Phone Number"
                  className="col-md-8 mb-4 form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-6">
                <label for="exampleInputEmail1" style={{ textAlign: "left" }}>
                  Email
                </label>
                <Input
                  type="text"
                  placeholder="Enter Email Address"
                  className="col-md-8 mb-4 form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div class="form-check form-check-inline mt-5">
              <Input
                style={{ display: "inline" }}
                type="radio"
                id="on_behalf"
                name="fav_language"
                onChange={(e) => setType(e.target.value)}
                value="on_behalf"
                className="form-check-input"
              />
               {" "}
              <label
                class="form-check-label"
                for="inlineRadio1"
                style={{ width: "100%" }}
              >
                On Behalf
              </label>
            </div>
            <div class="form-check form-check-inline">
              <Input
                type="radio"
                id="deliver"
                name="fav_language"
                value="deliver"
                style={{ display: "inline" }}
                className="form-check-input"
                onChange={(e) => setType(e.target.value)}
              />
               {" "}
              <label
                class="form-check-label"
                for="inlineRadio2"
                style={{ width: "100%" }}
              >
                Deliver
              </label>
            </div>
            <div class="col-sm-6"></div>
            <div class="form-group">
              <div class="col-sm-12">
                <label for="exampleInputEmail1" style={{ textAlign: "left" }}>
                  Address
                </label>

                <textarea
                  className="col-md-8 mb-4 form-control"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="">
              <p className="col-md-12 mb-3 mt-3">
                Your contribution will be used to feed the dogs on our streets,
                filling their hearts and stomach with warmth.
              </p>
            </div>

            <div
              class="form-row "
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button
                className="btn donate-btn-primary"
                onClick={() => setActiveTab("amount")}
              >
                Back
              </button>
              <button
                type="submit"
                className="btn donate-btn-primary"
                disabled={disableSubmit}
              >
                <i className="fa fa-heart"></i>Donate
              </button>
              <button
                type="submit"
                className="btn donate-btn-primary"
                onclick={handleSkipClick}
              >
                Skip & Pay
              </button>
            </div>
          </form>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserDetails;
