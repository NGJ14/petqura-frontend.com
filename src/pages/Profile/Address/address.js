import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ConfirmationAlert from "../../../components/confiramtionAlert";
import {
  deleteAddressDetails,
  getAddressDetails,
} from "../../../store/UserStore/Address/action";

const Address = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const addressDetails = useSelector((state) => state.Address);
  const [showPromptPopUp, setShowPromptPopUp] = useState(false);
  const [promptMessage, setPromptMessage] = useState({});

  useEffect(() => {
    dispatch(getAddressDetails({ data: { address_use: "shipping" } }));
  }, []);

  const deletePromptHandler = (id) => {
    setShowPromptPopUp(!showPromptPopUp);
    setPromptMessage({
      id: id,
      title: "",
      content: "Are you sure you want to delete this address",
      type: "delete",
    });
  };

  const okHandler = () => {
    if (promptMessage?.type == "delete") {
      dispatch(
        deleteAddressDetails({
          address: { id: promptMessage?.id },
          callback: () =>
            dispatch(getAddressDetails({ data: { address_use: "shipping" } })),
        })
      );
    }
  };

  return (
    <section className="col-md-12 d-flex">
      <div className="container pt-0">
        <div className="section-content">
          <div className="row ">
            {addressDetails?.addresses?.length
              ? addressDetails?.addresses?.map((address) => (
                  <div className="col-md-6">
                    <div className="icon-box bg-lighter text-center p-30 mt-sm-0 border-1px">
                      <a
                        style={{ textDecoration: "none" }}
                        href={`/view-address/${address?.id}`}
                      >
                        <h4 className="icon-box-title text-uppercase letter-space-3">
                          <p className="text-theme-colored">
                            {address?.fullname}
                          </p>
                        </h4>
                        <h5 className="text-dark">{address?.address}</h5>
                        <h5 className="text-dark">{`${address?.state}, ${address?.pin}`}</h5>
                        <h5 className="text-dark">Phone: {address?.phone}</h5>
                      </a>

                      <div className="mt-4">
                        <button
                          onClick={() =>
                            history.push({
                              pathname: `/edit-address/${address?.id}`,
                              from: "address-list",
                            })
                          }
                          className="btn btn-outline-dark btn-lg btn-light"
                          style={{ fontSize: "17px" }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deletePromptHandler(address?.id)}
                          className="btn btn-outline-dark btn-lg btn-light mr-4"
                          style={{ fontSize: "17px" }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              : null}

            <div className="col-md-6 ">
              <div
                className="icon-box bg-lighter text-center p-30 mt-sm-0 border-1px card-address-cust"
                data-margin-top="-90px"
                // style={{ marginTop: "-90px" }}
              >
                <a
                  className="icon bg-theme-colored icon-circled icon-border-effect effect-circled text-white"
                  href="/add-address"
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>{" "}
                </a>
                <h4 className="icon-box-title text-uppercase letter-space-3">
                  <h5 className="text-theme-colored">ADD NEW ADDRESS</h5>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationAlert
        {...promptMessage}
        modal_center={showPromptPopUp}
        setmodal_center={setShowPromptPopUp}
        onOK={okHandler}
      />
    </section>
  );
};

export default Address;
