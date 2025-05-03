import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import BackButton from "../../../components/UI/BackButton";
import { getAddressById } from "../../../store/UserStore/Address/action";

const ViewAddress = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const addressDetail = useSelector((state) => state.Address);

  useEffect(() => {
    dispatch(getAddressById({ data: { id: params.id } }));
  }, []);

  const history = useHistory();
  return (
    <div className="common-container main-content">
      <div className="container ">
        <div className="mt-5">
          <div className="row ">
            <div className="text-right mb-5">
              <button
                className="btn orange-background text-white"
                onClick={() =>
                  history.push({ pathname: "/profile", tab: "addresses" })
                }
              >
                {"<< Back To Addresses"}
              </button>
            </div>
            <div className="icon-box bg-lighter p-30 mt-sm-0 border-1px  pt-50 pb-50 ">
              <a
                className="float-right  mt-10 text-dark h5"
                href={`/edit-address/${params?.id}`}
              >
                EDIT
              </a>
              <h3 className="icon-box-title mt-3">
                {addressDetail?.address?.fullname}
              </h3>
              <br />
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Full Name</strong> :{" "}
                    {addressDetail?.address?.fullname}
                  </p>
                  <p>
                    <strong>Address</strong> : {addressDetail?.address?.address}
                  </p>
                  {/* <p>
                    <strong></strong>LandMark : Karingachira Church
                  </p> */}
                  <p>
                    <strong>State</strong> : {addressDetail?.address?.state}
                  </p>
                  <p>
                    <strong>Pincode</strong>: {addressDetail?.address?.pin}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Mobile</strong>: {addressDetail?.address?.phone}
                  </p>
                  <p>
                    <strong>City</strong>: {addressDetail?.address?.city}
                  </p>
                  <p>
                    <strong>Address Type</strong>:{" "}
                    {addressDetail?.address?.address_type}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAddress;
