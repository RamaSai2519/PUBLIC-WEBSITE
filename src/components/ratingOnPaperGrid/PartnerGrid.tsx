"use client";
import { useRef } from "react";
import Btn from "../button";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { imageUrl } from "@/utils/constants";
import {
  get_data_from_firebase,
  write_data_to_firebase,
} from "@/utils/firebase";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick"

const ratings = [
  "https://sukoon-static-website-content.s3.ap-south-1.amazonaws.com/diginty.png",
  "https://sukoon-media.s3.ap-south-1.amazonaws.com/wisdom-circle-logo.svg",
  "https://sukoon-static-website-content.s3.ap-south-1.amazonaws.com/willjini.svg",
  "https://sukoon-static-website-content.s3.ap-south-1.amazonaws.com/ageEasy.svg",
  "https://sukoon-static-website-content.s3.ap-south-1.amazonaws.com/hear-clear.png",
];

export function PartnerGrid() {
  const [logoImages, setLogoImages] = useState(ratings);
  useEffect(() => {
    get_data_from_firebase("brandImages").then((data: any) => {
      setLogoImages(data.images);
    });
  }, []);
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    swipeToSlide: true,
    slidesToScroll: 1,
    arrows: false,
    nextArrow: (
      <div className="custom-arrow custom-next">
        <Btn color="primaryYellow" text="" endIcon={<ArrowForwardIos />} />
      </div>
    ),
    prevArrow: (
      <div className="custom-arrow custom-prev">
        <Btn color="primaryYellow" text="" endIcon={<ArrowBackIos />} />
      </div>
    ),
  };

  return (
    <>
    <div key="sukoon-rating" className="hidden sm:flex  relative w-full  ">
      <Image
        src={`${imageUrl}paper-grid.png`}
        alt={"Paper-grid-background"}
        key={"paper-grid"}
        layout="responsive"
        width={20}
        height={500}
        className=" self-center"
      />

      <div key={"ratings-div"} className="absolute inset-0 flex items-center justify-around gap-10 p-10">
        {logoImages.map((rating,index) => {
          return (
            <div key={"main-div"+index} className="flex flex-col justify-center items-center">
              {/* <h1 key={"heading "+rating.title} className="text-2xl font-lightFont">{rating.title}</h1> */}
              <Image
                    src={rating}
                    key={rating}
                    alt={rating}
                    width={240}
                    height={240}
                  />
            </div>
          );
        })}
      </div>
    </div>
    <div key="sukoon-rating" className="flex sm:hidden w-full h-52 justify-center items-center bg-center pt-3" style={{backgroundImage: `url(${imageUrl}paper-grid.png)`}}>
      <div
        key={"ratings-div"}
        className="flex items-center justify-around mt-5 "
      >
        <div className="w-full justify-center items-center">
          {/* @ts-ignore */}
        <Slider
          key={"slider-main"}
          {...settings}
          ref={sliderRef}
          className="w-[90vw]"
        >
          {logoImages.map((element, index) => (
            <div
              key={"main-div" + index}
              className="flex flex-col justify-center items-center"
            >
              {/* Navigation and Title */}
              <div
                key={"second-div" + index}
                className="flex flex-row justify-center sm:justify-between items-center gap-4 w-full sm:px-8 lg:px-12"
              >
                {/* Backward Navigation */}
                <Btn
                  color="primaryYellow"
                  text=""
                  key={"second-div-forward" + index}
                  size="small"
                  // @ts-ignore
                  onClick={() => sliderRef.current.slickPrev()}
                  endIcon={<ArrowBackIos fontSize="small" />}
                />

                {/* Title with Icon */}
                <span
                  key={"span" + index}
                  className="flex flex-row text-lg sm:text-2xl lg:text-3xl text-black justify-center items-center gap-4 sm:gap-6"
                >
                   <Image
                src={element}
                key={index}
                alt={element}
                width={150}
                height={150}
              />
                 
                </span>

                {/* Forward Navigation */}
                <Btn
                  color="primaryYellow"
                  text=""
                  size="small"
                  // @ts-ignore
                  onClick={() => sliderRef.current.slickNext()}
                  endIcon={<ArrowForwardIos fontSize="small" />}
                />
              </div>
            </div>
          ))}
        </Slider>
        </div>
      </div>
    </div>
    </>
  );
}
