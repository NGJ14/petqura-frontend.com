import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Footer from "./footer";
import Header from "./header";

const Layout = (props) => {
  const history = useHistory();
  const [footerImg, setFooterImg] = useState("")

  const capitalizeFirstLetter = (string) => {
    return string.charAt(1).toUpperCase() + string.slice(2);
  };

  useEffect(() => {
    let currentage = capitalizeFirstLetter(history?.location?.pathname);

    // document.title = currentage;

    switch(currentage){
      case "Home":
        setFooterImg("homepageFooterImg.png");
        break;
      case "About-us":
        setFooterImg("aboutUsFooterImg.png");
        break
      case "Contact-us":
        setFooterImg("contactUsFooterImg.png");
        break
      case "Clinic":
        setFooterImg("clinicFooterImg.png");
        break
      case "Store":
        setFooterImg("storeFooterImg.png");
        break
        default:
          setFooterImg("aboutUsFooterImg.png");
    }
  }, [history?.location?.pathname]);




  return (
    <React.Fragment>
      <div id="wrapper">
        <Header />
        <div className="main-content">{props.children}</div>
      </div>
      <Footer footerImg={footerImg}/>
    </React.Fragment>
  );
};

export default Layout;
