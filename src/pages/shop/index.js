import { Helmet } from "react-helmet";
import ShopItems from "./shopItems";
import Navbar from "./Sidebar/filterNav";

const Shop = () => {
  return (
    <>

    <Helmet>
        <meta charSet="utf-8" />
        <title>Pet Shop in Bangalore: PawWalker -  Pet's Ultimate Shopping Stop</title>
        <meta name="description" content="Discover the best pet store in Bangalore, PawWalker, for all your pet care needs. From premium pet supplies to top-notch pet grooming service near you." />
        <meta name="keywords" content="Pet Shop In Bangalore, Best pet store in Bangalore, Pet Grooming Near you, Pet Care Near you"></meta>
    </Helmet>
    <div className="main-content">
      <section
        className="inner-header divider parallax layer-overlay overlay-white-8"
        data-bg-img="http://placehold.it/1920x1280"
      ></section>
      <Navbar />
      <ShopItems />
    </div>
    </>
  );
};

export default Shop;
