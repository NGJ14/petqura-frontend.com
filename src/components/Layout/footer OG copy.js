import React from "react";
import logo from "../../assets/images/logo-wide-white.png";
const Footer = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  return (
    <footer id="footer" className="bg-black-222 " style={{ zIndex: "-100" }}>
      <div
        className="row border-bottom-black custom-footer-section d-flex  justify-content-between"
        style={{ minHeight: "30px" }}
      >
        {/* <li className="mt-2">
          <i className="fa fa-globe  text-white text-theme-colored  mr-2" />{" "}
          <a
            style={{ zIndex: 100 }}
            className="widget-title  text-white font-weight-bold"
            href="http://www.pawwaker.in"
          >
            www.pawwalker.in
          </a>
        </li> */}
        <a
          style={{ zIndex: 100 }}
          className="widget-title text-white font-weight-bold mt-2"
          href="/cookie-policy"
          target="_blank"
        >
          Cookies Policy
        </a>
        <a
          style={{ zIndex: 100 }}
          className="widget-title text-white font-weight-bold mt-2"
          href="/terms-of-service"
          target="_blank"
        >
          Terms of Service
        </a>
        <a
          style={{ zIndex: 100 }}
          className="widget-title text-white font-weight-bold mt-2"
          href="/refund-and-cancellation"
          target="_blank"
        >
          Refund and Cancellation
        </a>
        <a
          style={{ zIndex: 100 }}
          className="widget-title text-white font-weight-bold mt-2"
          href="/about-us"
          target="_blank"
        >
          About Us
        </a>
        <ul className="styled-icons icon-dark icon-circled icon-sm mb-3">
          <li>
            <a
              href="https://www.facebook.com/pawwalkerofficial"
              target="_blank"
            >
              <i className="fa fa-facebook" />
            </a>
          </li>

          <li>
            <a
              href="https://www.instagram.com/pawwalkerofficial/"
              target="_blank"
            >
              <i className="fa fa-instagram" />
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom bg-black-333">
        <div className="container pt-10 pb-10">
          <div className="row">
            <div className="col-md-6">
              <p className="font-11 text-white m-0">
                Copyright ©{getCurrentYear()} pawwalker. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
