import { imageUrl } from "@/utils/constants";
import {
  get_data_from_firebase,
  write_data_to_firebase,
} from "@/utils/firebase";
import Image from "next/image";
import Btn from "../button";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { useRef } from "react";

export function RatingOnPaperGrid() {
  const [page_copy_from_firebase, set_page_copy_from_firebase] = useState([
    {
      title: "Seniors love Sukoon",
      value: "95%",
    },
    {
      title: "Conversation Score",
      value: "9.6",
      icon: `https://sukoon-static-website-content.s3.ap-south-1.amazonaws.com/star.svg`,
    },
    {
      title: "Languages Supported",
      value: "15+",
    },
  ]);
  // uncomment this after updating the firebase data
  // useEffect(() => {
  //   get_data_from_firebase("RatingOnPaperGrid").then((res) => {
  //     if (res) {
  //       //@ts-ignore
  //       set_page_copy_from_firebase(res.raiting);
  //     }
  //   });
  // }, []);
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    gap: 10,
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
    <div
      key="sukoon-rating"
      className="flex flex-col justify-around items-center relative w-full h-64 sm:h-72 bg-cover sm:bg-contain bg-center pt-3"
      style={{ backgroundImage: `url(${imageUrl}paper-grid.png)` }}
    >
      <div
        key={"ratings-div"}
        className="hidden sm:flex  w-full items-center justify-evenly sm:justify-around"
      >
        {page_copy_from_firebase.map((rating, index) => {
          return (
            <div
              key={"main-div" + index}
              className="flex flex-col justify-evenly items-center"
            >
              <h1
                key={"heading " + rating.title}
                className="text-2xl font-lightFont content-center"
              >
                {rating.title}
              </h1>
              <div
                key={"nested " + rating.title}
                className="flex flex-row justify-center items-center gap-2"
              >
                {rating.icon ? (
                  <Image
                    src={rating.icon}
                    key={rating.icon}
                    alt={rating.title}
                    width={40}
                    height={20}
                  />
                ) : (
                  <></>
                )}

                <p key={rating.value} className="sm:text-6xl md:text-7xl font-extrabold">
                  {rating.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="sm:hidden">
        {/* @ts-ignore */}
        <Slider
        autoplay={true}
        autoplaySpeed={4000}
          key={"slider-main"}
          {...settings}
          ref={sliderRef}
          className="w-[90vw]"
        >
          {page_copy_from_firebase.map((rating, index) => (
            <div
              key={"main-div" + index}
              className="flex flex-col justify-center items-center"
            >
              
              {/* Navigation and Title */}
              <div
                key={"second-div" + index}
                className="flex flex-row justify-between items-center w-full"
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
              <div
                key={"main-div" + index}
                className="flex flex-col justify-center items-center"
              >
                <h1
                  key={"heading " + rating.title}
                  className="text-lg font-medium content-center"
                >
                  {rating.title}
                </h1>
                <div
                  key={"nested " + rating.title}
                  className="flex flex-row justify-center items-center gap-2"
                >
                  {rating.icon ? (
                    <Image
                      src={rating.icon}
                      key={rating.icon}
                      alt={rating.title}
                      width={30}
                      height={20}
                    />
                  ) : (
                    <></>
                  )}
                  <p key={rating.value} className="text-5xl font-extrabold">
                    {rating.value}
                  </p>
                </div>
              </div>
        

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
  );
}
