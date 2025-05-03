import React, { useEffect, useState } from "react";
import { Card, CardBody, Input } from "reactstrap";
import CustomAmount from "./CustomAmount";
import UserDetails from "./userDetails";
import ChooseAmount from "./ChooseAmount";
import { useDispatch, useSelector } from "react-redux";
import {
  addDonationDetails,
  addDonationPayment,
  viewHANDS4PAWSGALERYDetails,
} from "../../store/UserStore/donation/action";
import Success from "../Register/success";
import WhyDonate from "./WhyDonate";
import Faq from "./faq";
import Thanks from "./Thanks";
// import img1 from "../../assets/images/group-portrait-adorable-puppies.jpg";
import img from "../../assets/images/4paws.jpeg";
import { getMid, getWebPayTm } from "../../helpers/utils";

// import "photoswipe/dist/photoswipe.css";
// import { Gallery, Item } from "react-photoswipe-gallery";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Donation = () => {
  const Donation = useSelector((state) => state.Donation);
  const [modal, setModal] = useState(false);

  // const MyGallery1 = () => (
  //   <Gallery withCaption>
  //     <Item
  //       caption="Foo Image 1"
  //       original="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //       // thumbnail="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg"
  //       width="1024"
  //       height="768"
  //     >
  //       {({ ref, open }) => (
  //         <img
  //           ref={ref}
  //           onClick={open}
  //           src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //         />
  //       )}
  //     </Item>
  //     <Item
  //       caption="Foo Image 1"
  //       original="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //       // thumbnail="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg"
  //       width="1024"
  //       height="768"
  //     >
  //       {({ ref, open }) => (
  //         <img
  //           ref={ref}
  //           onClick={open}
  //           src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //         />
  //       )}
  //     </Item>
  //     <Item
  //       caption="Foo Image 1"
  //       original="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //       // thumbnail="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg"
  //       width="1024"
  //       height="768"
  //     >
  //       {({ ref, open }) => (
  //         <img
  //           ref={ref}
  //           onClick={open}
  //           src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //         />
  //       )}
  //     </Item>
  //     <Item
  //       caption="Foo Image 1"
  //       original="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //       // thumbnail="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg"
  //       width="1024"
  //       height="768"
  //     >
  //       {({ ref, open }) => (
  //         <img
  //           ref={ref}
  //           onClick={open}
  //           src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //         />
  //       )}
  //     </Item>
  //     <Item
  //       caption="Foo Image 1"
  //       original="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //       // thumbnail="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg"
  //       width="1024"
  //       height="768"
  //     >
  //       {({ ref, open }) => (
  //         <img
  //           ref={ref}
  //           onClick={open}
  //           src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //         />
  //       )}
  //     </Item>
  //     <Item
  //       caption="Foo Image 1"
  //       original="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //       // thumbnail="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg"
  //       width="1024"
  //       height="768"
  //     >
  //       {({ ref, open }) => (
  //         <img
  //           ref={ref}
  //           onClick={open}
  //           src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //         />
  //       )}
  //     </Item>
  //     <Item
  //       caption="Foo Image 1"
  //       original="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //       // thumbnail="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg"
  //       width="1024"
  //       height="768"
  //     >
  //       {({ ref, open }) => (
  //         <img
  //           ref={ref}
  //           onClick={open}
  //           src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //         />
  //       )}
  //     </Item>
  //     <Item
  //       caption="Foo Image 1"
  //       original="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //       // thumbnail="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg"
  //       width="1024"
  //       height="768"
  //     >
  //       {({ ref, open }) => (
  //         <img
  //           ref={ref}
  //           onClick={open}
  //           src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //         />
  //       )}
  //     </Item>
  //     <Item
  //       caption="Foo Image 1"
  //       original="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //       // thumbnail="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg"
  //       width="1024"
  //       height="768"
  //     >
  //       {({ ref, open }) => (
  //         <img
  //           ref={ref}
  //           onClick={open}
  //           src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //         />
  //       )}
  //     </Item>
  //     <Item
  //       caption="Foo Image 1"
  //       original="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //       // thumbnail="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg"
  //       width="1024"
  //       height="768"
  //     >
  //       {({ ref, open }) => (
  //         <img
  //           ref={ref}
  //           onClick={open}
  //           src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/home-demo/luca-bravo-O453M2Liufs-unsplash_qqt53u/luca-bravo-O453M2Liufs-unsplash_qqt53u_c_scale,w_2500.jpg"
  //         />
  //       )}
  //     </Item>

  //     <Item
  //       original="https://placekitten.com/1024/768?image=2"
  //       thumbnail="https://placekitten.com/60/80?image=2"
  //       width="1024"
  //       height="768"
  //     >
  //       {({ ref, open }) => (
  //         <img
  //           ref={ref}
  //           onClick={open}
  //           src="https://placekitten.com/60/80?image=2"
  //         />
  //       )}
  //     </Item>
  //   </Gallery>
  // );
  // const formatCategoryData2 = Donation?.HANDS4PAWSGALERY?.result?.map(
  //   (document, index) => (
  //     <Item
  //       caption="Foo Image 1"
  //       original={document.image_name}
  //       thumbnail={document.image_name}
  //       width="1024"
  //       // height="768"
  //     >
  //       {({ ref, open }) => (
  //         <img ref={ref} onClick={open} src={document.image_name} />
  //       )}
  //     </Item>
  //   )
  // );
  // const MyGallery2 = () => (
  //   <Gallery withCaption>{formatCategoryData2} </Gallery>
  // );

  const formatGalleryData = Donation?.HANDS4PAWSGALERY?.result?.map(
    (document, index) => (
      <div>
        <img src={document.image_name} />
      </div>
    )
  );
  const options = {
    // margin: 30,
    // responsiveClass: true,
    // nav: true,
    // dots: false,
    // autoplay: false,
    // navText: ["Prev", "Next"],
    // smartSpeed: 3000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };
  const MyGallery = () => (
    <OwlCarousel
      className="owl-theme"
      loop
      margin={10}
      nav
      items={5}
      autoplay={true}
      autoplayTimeout={3000}
      dots={false}
      {...options}
    >
      {formatGalleryData}{" "}
    </OwlCarousel>
  );

  const toggle = () => {
    setModal(!modal);
  };
  const [active, setActive] = useState("profile");
  const [activeTab, setActiveTab] = useState("amount");
  const [activeAmount, setActiveAmount] = useState(1);
  const [amount, setAmount] = useState();
  const [amountChoice, setAmountChoice] = useState("custom");
  const [days, setDays] = useState(0);
  const [petCount, setPetCount] = useState(0);
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [type, setType] = useState("");

  const [errormsg, setError] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setAmount(days * petCount * 15);
  }, [days, petCount]);
  let data;
  const handleAddDetailsClick = (e) => {
    e.preventDefault();
    amountChoice == "custom"
      ? (data = {
          name: fullname,
          contact_no: phone,
          email: email,
          address_line_1: address1,
          address_line_2: address2,
          on_behalf: type == "on_behalf" ? true : false,
          deliver: type == "deliver" ? true : false,
          is_anonymous: false,
          is_fixed: true,
          amount: amount,
        })
      : (data = {
          name: fullname,
          contact_no: phone,
          email: email,
          address_line_1: address1,
          address_line_2: address2,
          on_behalf: type == "on_behalf" ? true : false,
          deliver: type == "deliver" ? true : false,
          is_anonymous: false,
          is_fixed: false,
          no_of_days: days,
          no_of_dogs: petCount,
        });
    dispatch(
      addDonationDetails({
        data: data,
        callback: (payment_id, paytm_token, amount) => {
          makePayment(payment_id, paytm_token, amount);
          // setActiveTab("pay");
        },
      })
    );
  };
  const basicRequest = {
    sort: "time_created",
    sort_order: "desc",
    page: 1,
    page_count: 50,
  };
  const HANDS4PAWSGALERY = useSelector((state) => state.HANDS4PAWSGALERY);
  const [request, setRequest] = useState({ ...basicRequest });
  useEffect(() => {
    dispatch(
      viewHANDS4PAWSGALERYDetails({
        request: request,
      })
    );
  }, [request]);

  const makePayment = (payment_id, paytm_token, amount) => {
    var config = {
      root: "",
      style: {
        bodyBackgroundColor: "#fafafb",
        bodyColor: "",
        themeBackgroundColor: "#0FB8C9",
        themeColor: "#ffffff",
        headerBackgroundColor: "#284055",
        headerColor: "#ffffff",
        errorColor: "",
        successColor: "",
        card: {
          padding: "",
          backgroundColor: "",
        },
      },
      data: {
        orderId: payment_id,
        token: paytm_token,
        tokenType: "TXN_TOKEN",
        amount: amount,
      },
      payMode: {
        labels: {},
        filter: {
          exclude: [],
        },
        order: ["CC", "DC", "NB", "UPI", "PPBL", "PPI", "BALANCE"],
      },
      website: getWebPayTm(),
      flow: "DEFAULT",
      merchant: {
        mid: getMid(),
        redirect: false,
      },
      handler: {
        transactionStatus: function transactionStatus(response) {
          console.log(response);

          dispatch(
            addDonationPayment(
              response,
              window.Paytm.CheckoutJS.close(),
              window.scrollTo({ top: 0, behavior: "smooth" }),
              toggle(),
              setActiveTab("thanks"),
              setFullname(""),
              setEmail(""),
              setPhone(""),
              setAddress1(""),
              setAddress2(""),
              setAmount(""),
              setDays(0),
              setPetCount(0)
            )
          );
        },
        notifyMerchant: function notifyMerchant(eventName, data) {
          console.log("Closed");
        },
      },
    };

    if (window.Paytm && window.Paytm.CheckoutJS) {
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("Error => ", error);
        });
    }
  };

  const handleSkipClick = (e) => {
    e.preventDefault();
    amountChoice == "custom"
      ? (data = {
          on_behalf: type == "on_behalf" ? true : false,
          deliver: type == "deliver" ? true : false,
          is_anonymous: true,
          is_fixed: true,
          amount: amount,
        })
      : (data = {
          on_behalf: type == "on_behalf" ? true : false,
          deliver: type == "deliver" ? true : false,
          is_anonymous: false,
          is_fixed: false,
        });
    dispatch(
      addDonationDetails({
        data: data,
        callback: (payment_id, paytm_token, amount) => {
          makePayment(payment_id, paytm_token, amount);
        },
      })
    );
  };

  const handleDonateAmountClick = () => {
    if (amount == 0) {
      setError(true);
    } else {
      setError(false);
      setActiveTab("user-info");
    }
  };

  return (
    <div className="main-content mb-100 ">
      <img className src={img} style={{ width: "1920px" }} />
      <div className="row mt-0 pt-30">
        <div className="col-md-7 ">
          <WhyDonate />
        </div>
        <div className="col-md-4" style={{ maxWidth: "496px" }}>
          <h3 className="my-5  text-center">
            Donate to help India’s pets hunger free
          </h3>
          <div
            style={{
              maxWidth: "496px",
              zIndex: "99",
            }}
          >
            {activeTab == "amount" ? (
              <Card
                style={{
                  borderRadius: "10px",
                  border: "0.2px groove #333",
                }}
                className="ml-2 pb-5"
              >
                <CardBody className="p-0  text-center">
                  <div
                    style={{
                      background: "#FFF",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  >
                    <p className="font-weight-bold ml-3 pt-3 mt-5">
                      You can make a big difference to their lives!
                    </p>
                  </div>
                  <div className="donate-steps-frequency-block mt-5 mb-40 mx-4 ">
                    <button
                      className={`btn btn-default ${
                        amountChoice == "custom" ? "selected btn-info" : null
                      } `}
                      data-val="one-time"
                      onClick={() => {
                        setAmountChoice("custom");
                        setAmount("");
                        setPetCount("");
                        setDays("");
                      }}
                    >
                      Custom Amount
                      {amountChoice == "custom" ? (
                        <i className="fa fa-check fa-donate-tick "></i>
                      ) : null}
                    </button>

                    <button
                      className={`btn btn-default ${
                        amountChoice == "choose" ? "selected btn-info" : null
                      } `}
                      onClick={() => {
                        setAmountChoice("choose");
                        setAmount("");
                        setPetCount(1);
                        setDays(1);
                      }}
                    >
                      Choose Amount{" "}
                      {amountChoice == "choose" ? (
                        <i className="fa fa-check fa-donate-tick "></i>
                      ) : null}
                    </button>
                  </div>

                  {amountChoice == "custom" ? (
                    <CustomAmount
                      amount={amount}
                      setActiveAmount={setActiveAmount}
                      setAmount={setAmount}
                    />
                  ) : (
                    <ChooseAmount
                      setActiveAmount={setActiveAmount}
                      amount={amount}
                      days={days}
                      petCount={petCount}
                      setAmount={setAmount}
                      setDays={setDays}
                      setPetCount={setPetCount}
                    />
                  )}
                  <h4 className="mt-5">How will my donation help?</h4>
                  <p className="px-4">
                    Your aid will help us provide nutritious meals to the street
                    dogs of Bangalore
                  </p>
                  <div className="donate-steps-frequency-block mt-5 mb-50 mx-4 ">
                    <button
                      className="btn btn-primary"
                      onClick={handleDonateAmountClick}
                    >
                      <i className="fa fa-heart"></i>{" "}
                      Submit&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                    {errormsg ? (
                      <p className="text-danger">
                        Transactions below Rs.1 is not financially viable for us
                        to process
                      </p>
                    ) : null}
                  </div>
                </CardBody>
              </Card>
            ) : activeTab == "user-info" ? (
              <UserDetails
                amount={amount}
                setActiveTab={setActiveTab}
                setFullname={setFullname}
                setPhone={setPhone}
                fullname={fullname}
                phone={phone}
                email={email}
                setEmail={setEmail}
                address1={address1}
                setAddress1={setAddress1}
                address2={address2}
                setAddress2={setAddress2}
                type={type}
                setType={setType}
                handleAddDetailsClick={handleAddDetailsClick}
                handleSkipClick={handleSkipClick}
              />
            ) : activeTab == "thanks" ? (
              <Thanks />
            ) : null}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="container2 p-5">
          <div
            className="col-md-12  text-center"
            style={{ bordor: "1px solid black" }}
          >
            <h3 className="text-theme-colored">Hands4Paws Gallery</h3>
            <p className="mb-4">
              You can't change the world by helping one dog, but you will change
              the world of that dog.
            </p>
            <MyGallery />
            {/* <OwlCarousel className="owl-theme" loop margin={10} nav>
                <div class="item">
                  <h4>1</h4>
                </div>
                <div class="item">
                  <h4>2</h4>
                </div>
                <div class="item">
                  <h4>3</h4>
                </div>
                <div class="item">
                  <h4>4</h4>
                </div>
                <div class="item">
                  <h4>5</h4>
                </div>
                <div class="item">
                  <h4>6</h4>
                </div>
                <div class="item">
                  <h4>7</h4>
                </div>
                <div class="item">
                  <h4>8</h4>
                </div>
                <div class="item">
                  <h4>9</h4>
                </div>
                <div class="item">
                  <h4>10</h4>
                </div>
                <div class="item">
                  <h4>11</h4>
                </div>
                <div class="item">
                  <h4>12</h4>
                </div>
              </OwlCarousel> */}
          </div>
        </div>
      </div>

      {/* <Faq /> */}
      <Success
        modalsuccess={modal}
        setModalSuccess={setModal}
        successMessage="Payment confirmed! Receipt will send to your email address"
        backbuttonTitle="Close"
        is_clinic={true}
      />
    </div>
  );
};

export default Donation;
