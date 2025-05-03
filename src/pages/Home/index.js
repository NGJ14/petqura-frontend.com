import { useEffect, useRef } from "react";
import { useHistory } from "react-router";
import History from "./history";
import HomeSlider from "./homeSlider";
import Services from "./services";
import WhyChoseUsNew from "./whychoseusnew";
import WhatClientSays from "./whatclientsays";
import OurBlogPost from "./ourblogpost";
import { Helmet } from "react-helmet";

const Home = () => {
  const history = useHistory();
  const contactRef = useRef(null);

  if (history?.location?.state?.contact) {
    contactRef?.current?.scrollIntoView();
  }

  useEffect(() => {
    if (history?.location?.state?.contact) {
      contactRef?.current?.scrollIntoView();
    }
  }, [history?.location?.state?.contact]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Find No. 1 Pet Clinic Near You | Pet Grooming in Bangalore
        </title>
        <meta
          name="description"
          content="Find pet doctors, Pet grooming and pet shops near you based on your needs. Find & book your session at a pet clinic near you with ease. Book Now."
        />
        <meta
          name="keywords"
          content="Pet Clinic Near Me, Pet Doctor Near Me, Pet Grooming Near Me, Pet Shop In Bangalore"
        ></meta>
      </Helmet>

      <div className="main-content">
        <section id="home">
          <div className="container-fluid p-0">
            <HomeSlider />
            <Services />
            {/* <WhyChoseUsNew /> */}
            <WhatClientSays />
            <OurBlogPost />
            {/* <About /> */}
            {/* <Doctors /> */}
            {/* <Products /> */}
            {/* <History contactRef={contactRef} /> */}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
