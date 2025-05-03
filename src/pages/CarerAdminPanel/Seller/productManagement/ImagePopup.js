import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Modal, Row } from "reactstrap";
import Loader from "../../../../components/UI/Loader";
import { getProductSuggestion } from "../../../../store/serviceProvider/Seller/action";

const ImagePopup = ({
  modal_center,
  setmodal_center,
  currentImage,
  prodCat,
  setImg1,
  setImg2,
  setImg3,
  setShowUrl,
  img1,
  img2,
  img3,
  setAdminImage,
  setadmin_product,
}) => {
  const dispatch = useDispatch();
  const [selectImage, setselectImage] = useState("");
  const [tempImg, setTempImg] = useState("");

  const handleImageClick = () => {
    setselectImage(tempImg);
    setShowUrl(false);
    // if (!addImage) {
    if (currentImage == "img1") {
      setImg1(tempImg);
      setadmin_product(1);
    } else if (currentImage == "img2") {
      setImg2(tempImg);
      setadmin_product(1);
    } else if (currentImage == "img3") {
      setImg3(tempImg);
      setadmin_product(1);
    }
    // }
  };

  const removeImageClick = () => {
    if (currentImage == "img1") {
      setImg1("");
    } else if (currentImage == "img2") {
      setImg2("");
    } else if (currentImage == "img3") {
      setImg3("");
    }
  };

  const params = useParams();

  useEffect(() => {
    dispatch(
      getProductSuggestion({
        request: { product_id: params?.id },
      })
    );
  }, []);

  return (
    <>
      <Modal
        isOpen={modal_center}
        centered={true}
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <div className="modal-header" style={{ direction: "ltr" }}>
          <h5 className="modal-title mt-0">Choose Image</h5>
        </div>
        <div className="modal-body">
          <div>
            <div>
              {
                <ul
                  className={`${
                    prodCat?.admin_product?.suggestions?.length
                      ? "variant-list-container"
                      : "variant-empty-container"
                  }`}
                >
                  {prodCat?.admin_product?.suggestions?.length
                    ? prodCat?.admin_product?.suggestions?.map((product) => (
                        <>
                          {product?.product_image_1 &&
                          img1 !== product?.product_image_1 &&
                          img2 !== product?.product_image_1 &&
                          img3 !== product?.product_image_1 ? (
                            <li className=" variant-list mt-20 mb-20">
                              <a className="cursor-pointer variant-list_link">
                                <img
                                  className={`${
                                    tempImg == product?.product_image_1
                                      ? "gradient-select"
                                      : "gradient"
                                  } `}
                                  src={product?.product_image_1}
                                  width="170px"
                                  onClick={() =>
                                    setTempImg(product?.product_image_1)
                                  }
                                />
                              </a>
                            </li>
                          ) : null}
                          {product?.product_image_2 &&
                          img2 !== product?.product_image_2 &&
                          img2 !== product?.product_image_2 &&
                          img3 !== product?.product_image_2 ? (
                            <li className=" variant-list mt-20 mb-20">
                              <a className="cursor-pointer variant-list_link">
                                <img
                                  className={`${
                                    tempImg == product?.product_image_2
                                      ? "gradient-select"
                                      : "gradient"
                                  } `}
                                  src={product?.product_image_2}
                                  width="170px"
                                  onClick={() =>
                                    setTempImg(product?.product_image_2)
                                  }
                                />
                              </a>
                            </li>
                          ) : null}
                          {product?.product_image_3 &&
                          img3 !== product?.product_image_3 &&
                          img3 !== product?.product_image_3 &&
                          img3 !== product?.product_image_3 ? (
                            <li className=" variant-list mt-20 mb-20">
                              <a className="cursor-pointer variant-list_link">
                                <img
                                  className={`${
                                    tempImg == product?.product_image_3
                                      ? "gradient-select"
                                      : "gradient"
                                  } `}
                                  src={product?.product_image_3}
                                  width="170px"
                                  onClick={() =>
                                    setTempImg(product?.product_image_3)
                                  }
                                />
                              </a>
                            </li>
                          ) : null}
                        </>
                      ))
                    : null}{" "}
                </ul>
              }
            </div>
          </div>
        </div>
        {prodCat?.admin_product?.suggestions?.length ? (
          <div className="modal-footer">
            <button
              type="button"
              className="btn orange-background text-white"
              onClick={() => {
                setmodal_center(false);
                handleImageClick();
              }}
            >
              OK
            </button>
            <button
              type="button"
              className="btn  text-dark"
              onClick={() => {
                setmodal_center(false);
                setTempImg("");
                removeImageClick();
                setselectImage("");
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="text-center modal-footer d-flex justify-content-center flex-column mt-3">
            <p className="">No Image Found</p>

            <button
              type="button"
              className="btn  text-dark"
              onClick={() => {
                setmodal_center(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </Modal>
      {prodCat?.loading && <Loader />}
    </>
  );
};

export default ImagePopup;
