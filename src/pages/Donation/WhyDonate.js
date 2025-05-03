import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPAGEById } from "../../store/UserStore/PageContent/action";

const WhyDonate = () => {
  const PageContent = useSelector((state) => state.PageContent);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getPAGEById({ data: { id: "843a85f0-bda2-4722-a205-025314d71075" } })
    );
  }, []);
  return (
    <div className="custom-container row pt-20  ">
      <div className="col-md-12">
        <div className="mx-2">
          {/* <div className="home-stats-wrapper">
            <ul className=" row text-center ">
              <li className=" col-sm-12 col-lg-5   mx-5 my-5 whydonateus-container">
                <h3 classname="orange-font">Purpose</h3>
                <span className="donate-sub">
                  Creating hope and convenience for pets and pet parents.
                </span>
              </li>
              <li className="col-sm-12 col-lg-5 my-5 mx-5 whydonateus-container ">
                <h3 classname="orange-font"> Veterinary Aid</h3>
                <span className="donate-sub">
                  Schedule appointment with your favorite vet within the city.
                </span>
              </li>
              <li className=" col-sm-12 col-lg-5  mx-5  my-5 whydonateus-container">
                <h3 classname="orange-font">Products</h3>
                <span className="donate-sub">
                  Choose amid numerous products for the well-being of your pet.
                </span>
              </li>
              <li className=" col-sm-12 col-lg-5   mx-5  my-5 whydonateus-container">
                <h3 classname="orange-font"> Fast delivery</h3>
                <span className="donate-sub">
                  At your doorstep within 24 hours
                </span>
              </li>
            </ul>
          </div> */}
          {/* <p className="donate-subtitle mt-5 ">
            Purpose: Creating hope and convenience for pets and pet parents
          </p>
          <p className="donate-subtitle mt-5 ">
            Veterinary Aid: Schedule appointment with your favorite vet within
            the city
          </p>
          <p className="donate-subtitle mt-5 ">
            Products: Choose amid numerous products for the well-being of your
            pet
          </p>
          <p className="donate-subtitle mt-5 ">
            Fast delivery: At your doorstep within 24 hours
          </p> */}
        </div>
        <div
          className="responsive-policy-content"
          dangerouslySetInnerHTML={{
            __html: PageContent?.PageContentDetails?.page_content,
          }}
        />

        {/* <h3 className="mt-30 orange-font">Hands4Paws</h3> */}
        {/* <h3 className="orange-font font-weight-bold text-center">
          ‘He who feeds a hungry animal feeds his own soul’ - Charlie Chaplin
        </h3>

        <p className="donate-subtitle my-5 ">
          As animal lovers, we at PawWalker, want to create hope and convenience
          to not only pets, but all stray animals of the city.Mal nourishment
          and lack of care is the sad reality that this helpless community has
          to face. Hands4Paws is our humble initiative to join hands with
          communities and organizations toprovide strays with at least one meal,
          every day to change the current situation.
        </p>

        <h2 className="orange-font">Let us feed, care, and love</h2>

        <p className="donate-subtitle mt-5 ">
          Together, we can enrich our strays’ lives with a constant supply of
          well-deserved, nutritious food. Join our subscription and sponsor a
          meal for any number of dogs or make a heartfelt donation for this
          cause. The food will be fed to the animals by PawWalker on behalf of
          you. However, if you wish to personally feed animals in your vicinity,
          we can deliver the food to your address. Unfortunately, this would
          include additional logistical expense for us.
        </p> */}

        {/* <h3 className="orange-font">Contact Us</h3>

        <p className="donate-subtitle mt-5 ">
          Have a message or suggestion for us? We are eager to hear from you!
        </p> */}
      </div>
    </div>
  );
};

export default WhyDonate;
