import React, { useEffect, useState } from "react";
import { useDispatc, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "reactstrap";
import {
  bulkProductUpload,
  getProductDetails,
} from "../../../../store/serviceProvider/Seller/action";
import Success from "../../../Register/success";

const ProductUpload = ({ showProductUpload, toggleProductUpload }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [folderName, setFolderName] = useState("");

  const [disable, setDisable] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const [file, setFile] = useState(null);
  const productData = useSelector((state) => state.Product);

  const basicRequest = {
    sort: "time_created",
    sort_order: "desc",
    page: 1,
    page_count: 50,
  };

  useEffect(() => {
    if (file == null || folderName == "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [file, folderName]);

  const [request, setRequest] = useState({ ...basicRequest });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({ folder: folderName }));

    dispatch(
      bulkProductUpload({
        products: formData,
        callback: () => {
          toggleProductUpload();
          toggle();
          dispatch(getProductDetails(request));
          setFile(null);
        },
        history: history,
      })
    );
  };

  return (
    <>
      <Modal
        isOpen={showProductUpload}
        centered={true}
        toggle={toggleProductUpload}
        style={{ maxWidth: "520px", width: "100%" }}
      >
        <div className="modal-header mb-5 text-center">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              toggleProductUpload();
              //   dispatch(resetUserRegisterErrors());
            }}
          >
            <span aria-hidden="true" style={{ fontSize: "25px" }}>
              &times;
            </span>
          </button>
        </div>

        <div className="modal-body">
          <div className="d-flex flex-column text-center">
            <form onSubmit={handleSubmit}>
              <div className="form-title  ">
                <h3>Upload Products File</h3>
              </div>
              <div className="text-left col-md-8 ml-4 pl-4 mb-5">
                <label>Enter Folder Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Folder name"
                  value={folderName}
                  style={{ fontSize: "1.5rem" }}
                  onChange={(e) => setFolderName(e.target.value)}
                />
              </div>

              <div
                className="form-group my-5"
                style={{
                  margin: "15px 18px",
                  padding: "0px 13px",
                }}
              >
                <input
                  type="file"
                  id="name"
                  style={{ fontSize: "1.5rem" }}
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              {productData?.error && (
                <p className="mandatory font-13">{productData?.error}</p>
              )}

              <button
                type="submit"
                className="btn btn-success"
                style={{
                  padding: "5px 80px",
                  fontWeight: "bold",
                }}
                disabled={disable ? true : false}
              >
                Upload
                {productData?.loading ? (
                  <i
                    className="fa fa-spinner fa-spin ml-3"
                    aria-hidden="true"
                  ></i>
                ) : null}
              </button>
            </form>
          </div>
        </div>
      </Modal>
      <Success
        modalsuccess={modal}
        setModalSuccess={setModal}
        successMessage="Product Exported Successfully"
        backbuttonTitle="Close"
        is_clinic={true}
      />
    </>
  );
};

export default ProductUpload;
