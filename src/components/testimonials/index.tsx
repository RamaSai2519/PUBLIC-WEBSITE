// @ts-nocheck
import Slider from "react-slick";
import React from "react";
import { testimonialsData } from "./data";
import TestimonialCard from "./testimonialCard";
import useDeviceType from "@/hooks/useDeviceType";
import Image from "next/image";

const Testimonials = () => {
  const device = useDeviceType();
  const { isMobile, isTablet } = device;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : isTablet ? 2 : 3,
    slidesToScroll: 1,
    nextArrow: <div />,
    prevArrow: <div />,
  };

  return (
    <div className="bg-[#e2e2e2]/20 py-12 px-8 relative" id="testimonials">
      <h3 className="text-4xl font-lightFont text-center">
        {" "}
        <span className="font-extrabold">Stories from  Sukoon community</span>
      </h3>

      <div className="relative mt-10">
        {/* Left Image */}
        <Image
          src="/rectangle.svg"
          alt="Left decoration"
          width={200}
          height={200}
          className="absolute -left-10 top-1/2 -translate-y-1/2 z-0 opacity-50"
        />
        
        {/* Right Image */}
        <Image
          src="/rectangle.svg"
          alt="Right decoration"
          width={200}
          height={200}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-0 opacity-50"
        />

        <div className="relative z-10">
          <Slider
            className="relative ml-2 mr-2 mt-6 mb-6 h-full flex flex-row gap-9"
            arrows={false}
            {...settings}
          >
            {testimonialsData?.map((item, index) => (
              <TestimonialCard key={index} {...item} />
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
