import { BannerWrapper, BannerText, BannerImg as storeBannerBannerImg } from '../Home/homeSlider';
import storeBanner1 from "../../assets/images/bannerImage1.png";
import storeBanner2 from "../../assets/images/bannerImage2.png";
import storeBanner3 from "../../assets/images/bannerImage.png";
import { styled } from 'styled-components';
// export const config = "https://pawwalker-files.s3.amazonaws.com/frontend-assets/";
import { config } from "../../config/config";

const storeBanner = () => {
    return (
        <BannerWrapper>
            <BannerText>
                <h1>Your Pet Deserves <span className="textBold">BEST FOOD</span></h1>
                <p className="lightText">Your Pet's Happy Place for Premium Supplies and Exceptional Care Now Get your furry friends' favorite things from the Premier Pet Store in Bangalore.</p>
            </BannerText>
            <BannerImg>
                <img src={`${config.S3imgHostUrl}/frontend-assets/storeDogFood2.png`} className="firstImg" alt="Banner Image"/>
                <img src={`${config.S3imgHostUrl}/frontend-assets/storeDogFood1.png`} className="secondImg" alt="Banner Image"/>
            </BannerImg>
        </BannerWrapper>
    )
}

export default storeBanner;

const BannerImg = styled(storeBannerBannerImg)`
    justify-content: center;

    .firstImg {
        max-width: 50%;
        position: absolute;
        bottom: 0;
    }

    .secondImg {
        position: absolute;
        right: 40px;
        bottom: -27px;
        top: auto;
        max-width: 37%;
        z-index: 101;

        @media only screen and (max-width: 900px) {
            bottom: -5%;
            max-width: 30%;
        }

        @media only screen and (max-width: 576px) {
            max-width: 51%;
        }
    }

    @media only screen and (max-width: 576px) {
        display: flex;
        width: 80%;

        .firstImg {
            max-width: 80%;
            position: absolute;
            bottom: -30px;
        }
    }
`;