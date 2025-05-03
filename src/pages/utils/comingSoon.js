import React from "react";
import Footer from "../../components/Layout/footer";
import Header from "../../components/Layout/header";

const ComingSoon = () => {
  return (
    <>
      <div className="main-content custom-not-found">
        <section id="home" className="fullscreen bg-lightest">
          <div className="display-table text-center">
            <div className="display-table-cell">
              <div className="container pt-0 pb-0">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2">
                    <h2 className="font-100 text-theme-colored mt-0 mb-0">
                      <i className="fa fa-map-signs text-gray-silver"></i>Coming
                      Soon!
                    </h2>
                    <h2 className="mt-0">Page is on build process</h2>
                    <p>The page you were looking is on building process.</p>
                    <a
                      className="btn btn-border btn-gray btn-transparent btn-circled smooth-scroll-to-target"
                      href="/home"
                    >
                      Return Home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ComingSoon;
