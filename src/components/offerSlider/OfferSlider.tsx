import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import React from "react";
import StackedAvatars from "../stackedAvatars/StackedAvatars";

const OfferSlider = () => {
  const imagesSrc = [
    "https://sukoon-static-website-content.s3.ap-south-1.amazonaws.com/icici-logo.svg",
    "https://sukoon-static-website-content.s3.ap-south-1.amazonaws.com/icici-logo.svg",
  ];

  const offers:any = [
    // {
    //   title:
    //     "Flat 15% discount on payment by select ICICI Debit and Credit cards",
    //   imageUrl: imagesSrc,
    // },
    // {
    //   title: "Flat 15% discount on payment by AXIS Net Banking and Debit cards",
    //   imageUrl: imagesSrc,
    // },
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);

  function sliderPosition(position: number) {
    setCurrentSlide(currentSlide + position);
  }
  return (
    <div className="flex flex-row items-center justify-center gap-2">
    {offers.length > 0 &&   <React.Fragment>
        <div className="flex flex-row gap-2 justify-center items-center ">
          {currentSlide === 0 ? null : (
            <ArrowBackIos
              onClick={() => sliderPosition(-1)}
              className="text-sm"
            />
          )}

          <div>
            <StackedAvatars images={offers[currentSlide].imageUrl} />
            <p className="text-sm font-normalFont">
              {offers[currentSlide].title}
            </p>
          </div>
        </div>
        {offers.length - 1 == currentSlide ? null : (
          <ArrowForwardIos
            onClick={() => sliderPosition(+1)}
            className="text-sm"
          />
        )}
      </React.Fragment>}
    </div>
  );
};

export default OfferSlider;
