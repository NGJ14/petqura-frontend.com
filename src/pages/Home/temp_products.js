import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductDetails } from "../../store/UserStore/Shop/action";

const Products = () => {
  const dispatch = useDispatch();
  const shopContent = useSelector((state) => state.Shop);

  const basicRequest = {
    page: 1,
    page_count: 9,
    keyword: "",
    ideal_for: "Dogs",
    sort_order: "lth",
  };
  const [request, setRequest] = useState({ ...basicRequest });

  useEffect(() => {
    request && dispatch(getUserProductDetails({ request: { ...request } }));
  }, [request]);

  return (
    <section id="products" className="mb-0">
      <div className="custom-container mt-0 pt-50 pb-0 mb-0">
        <div className="section-title text-center mb-0 ">
          <div className="row">
            <div className="col-md-12">
              <h2 className="text-center mb-80">
                Our Trending
                <span className="text-theme-colored"> Products</span>
              </h2>
              <div className="row multi-row-clearfix">
                <div className="col-md-8 mt-5 col-lg-10 col-sm-12">
                  <div className="products">
                    <div className="row multi-row-clearfix">
                      {shopContent?.userProduct?.products?.length
                        ? shopContent?.userProduct?.products
                            ?.slice(0, 4)
                            ?.map((product, i) => (
                              <div className=" col-sm-4 col-md-4 col-lg-3 mb-30 col-xs-6 ">
                                <a
                                  href={`/product/${product?.product_id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  <div className="product ">
                                    {/* {i == 2 && (
                                          <span className="tag-sale">Trending!</span>
                                        )} */}
                                    <div className="product-thumb">
                                      <img
                                        alt
                                        src={
                                          product?.product_image_1 &&
                                          product?.product_image_1
                                        }
                                        className="img-responsive img-fullwidth product-hover col-lg-6 mb-4 cust-size"
                                      />
                                      <div className="overlay" />
                                    </div>
                                    <div className="product-details ml-4 ">
                                      <h4 className="product-brand text-dark">
                                        {product?.brand_name}
                                      </h4>
                                      <h5 className="text-dark">
                                        {product?.product_name?.slice(0, 23)}
                                      </h5>
                                      {product?.variants?.length &&
                                        product?.variants
                                          ?.slice(0, 1)
                                          ?.map((variant) => (
                                            <>
                                              <div className="price">
                                                <span className="amount text-dark font-weight-bold">
                                                  Rs.{variant?.price}
                                                </span>
                                                <del className="ml-3">
                                                  <span className="amount">
                                                    Rs.
                                                    {variant?.price * 2}
                                                  </span>
                                                </del>
                                              </div>
                                              <span className=" orange-font">
                                                (50% OFF)
                                              </span>
                                            </>
                                          ))}
                                    </div>
                                  </div>
                                </a>
                              </div>
                            ))
                        : null}
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-right font-weight-bold ">
                <a className="orange-font" href="/store">
                  View All
                </a>
              </p>
              {/* End Portfolio Gallery Grid */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
