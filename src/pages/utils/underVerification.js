import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getLocalStorage, removeItem } from "../../helpers/utils";
import { logoutUser } from "../../store/UserStore/Login/action";

const UnderVerification = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = getLocalStorage("AUTH_DETAILS");
  const logout = () => {
    dispatch(
      logoutUser({
        data: { access_token: auth?.access_token },
        callback: () => {
          removeItem("AUTH_DETAILS");
          history.push("/carer/login");
        },
      })
    );
  };
  return (
    <>
      {/* <Header /> */}
      <div className="main-content">
        <section id="home" className="fullscreen bg-lightest">
          <div className="display-table text-center">
            <div className="display-table-cell">
              <div className="container pt-0 pb-0">
                <div className="row">
                  <div className="col-md-8 col-md-offset-2">
                    <h2 className=" text-theme-colored mt-0 mb-4">
                      Profile Completed
                    </h2>
                    <h4 className="mt-0">
                      Admin will verify and reply through your registered email
                      address
                    </h4>
                    {/* <p>The page you were looking for could not be found.</p> */}
                    <a
                      className="btn btn-border btn-gray btn-transparent btn-circled smooth-scroll-to-target"
                      href="/home"
                    >
                      Go To PawWalker Website
                    </a>
                    <a
                      className="btn btn-border btn-gray btn-transparent btn-circled smooth-scroll-to-target"
                      onClick={logout}
                    >
                      Logout
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

export default UnderVerification;
