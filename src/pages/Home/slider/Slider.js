import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import img1 from "../../../assets/images/slider-image/slider-1.jpg";
import img2 from "../../../assets/images/slider-image/slider-2.jpg";
import leftArrow from "../../../assets/icons/l-arrow.png";
import rightArrow from "../../../assets/icons/r-arrow.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdImage } from "../../../store/UserStore/AdImage/action";
const Slider = () => {
  const dispatch = useDispatch();
  const AdImage = useSelector((state) => state.AdImage);
  useEffect(() => {
    dispatch(getAdImage());
  }, [dispatch]);

  const properties = {
    canSwipe: true,
    pauseOnHover: true,
    autoplay: true,
    indicators: true,
    duration: 3000,
    transitionDuration: 500,
    infinite: true,
    prevArrow: (
      <div style={{ width: "25px", marginRight: "-30px" }}>
        <img src={leftArrow} className="cursor-pointer" />
      </div>
    ),
    nextArrow: (
      <div style={{ width: "25px", marginLeft: "-30px" }}>
        <img src={rightArrow} className="cursor-pointer" />
      </div>
    ),
  };

  return (
    <div>
      <div>
        {AdImage?.adImage?.slider_image_1 ? (
          <Slide {...properties}>
            {AdImage?.adImage?.slider_image_1 && (
              <div>
                <img src={AdImage?.adImage?.slider_image_1} />
              </div>
            )}
            {AdImage?.adImage?.slider_image_2 && (
              <div>
                <img src={AdImage?.adImage?.slider_image_2} />
              </div>
            )}
            {AdImage?.adImage?.slider_image_3 && (
              <div>
                <img src={AdImage?.adImage?.slider_image_3} />
              </div>
            )}
          </Slide>
        ) : null}
      </div>
    </div>
  );
};

export default Slider;
