// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import Btn from "../button";
import Image from "next/image";
import { imageUrl } from "@/utils/constants";
import MaxWidthWrapper from "../maxWidthWrapper";
import { CenterIconWithTextCard } from "../v2/CenterIconWithTextCard/CenterIconWithTextCard";
import useCustomScrollPosition from "@/utils/useCustomScrollPostition";
import Link from "next/link";
import PricingPlansV2 from "../PricingTable/index.v2";
import {
  ArrowBackIos,
  ArrowForwardIos,
  CallOutlined,
  PhoneInTalk,
} from "@mui/icons-material";
import { useAppSelector } from "@/store/store";
import SignBtn from "@/hooks/auth";
import { CenterArrowWithText } from "../centerArrowWithText/CenterArrowWithText";
//@ts-ignore
import { RatingOnPaperGrid } from "../ratingOnPaperGrid/RatingOnPaperGrid";
import Slider from "react-slick";
import {
  get_data_from_firebase,
  write_data_to_firebase,
} from "@/utils/firebase";

const SukoonUnlimited = () => {
  const [page_copy, set_page_copy] = useState({
    content: [
      {
        title: "Sarathis",
        imageUrl: `${imageUrl}sarathi.png`,
        description:
          "Sarathis are seniors like you who offer friendship and support over a call. Think of them as caring friends who are always ready to listen and chat with you",
        features: [
          {heading:"100% care:", subHeading:"Seniors who care and truly understand you"},
          {heading:"Always available:", subHeading:"Talk between 9 A to 9M, any day of the week"},
          {heading:"100% confidential:", subHeading:"All conversations are private and secure"},
        ],
        href: "/speak?category=sarathi",
        buttonText: "Our Sarathis",
      },
      {
        title: "Counselors",
        imageUrl: `/learn.jpg`,
        description:
          "Get confidential support from certified counselors with 15+ years of experience in psychology.",
        features: [
          {heading:"Certified Counselors:", subHeading:"Trained professionals who provide emotional support and guidance"},
          {heading:"Always Available:", subHeading:"Daily from 10 AM to 1 PM, 4 PM to 7PM"},
          {heading:"100% confidential:", subHeading:"All conversations are private and secure"},
        ],
        href: "/speak?category=expert",
        buttonText: "Our Coaches",
      },
      {
        title: "Meet-ups",
        imageUrl: `/IMG_1010.JPG`,
        description:
          "Sukoon meetups are a great way to have fun, learn something new or get group counselling support",
        features: [
          {heading:"Host a Meetup:", subHeading:"Share your wisdom, life stories and talent with the community"},
          {heading:"Make New friends:", subHeading:"Meet amazing Senios just like you"},
          {heading:"Daily Dose:", subHeading:"Exciting events happen every day! Enjoy games, quizzes, music, movies, and more."},

          
        ],
        href: "/events",
        buttonText: "Our Meet ups",
      },
      {
        title: "Assitance",
        imageUrl: `/img-8.jpeg`,
        description:
          "Need help with your smartphone, apps, online payments, or social media? Sukoon’s Digital Assistance is here to help",
        features: [
          {heading:"100% support:", subHeading:"Get help on anything digital - social media, travel, online ordering, travel booking, Smartphone queries"},
          {heading:"Always Available:", subHeading:"Call anytime from 9 AM – 7 PM at +91 8660610840 for friendly digital support"},
          {heading:"Pay it forward:", subHeading:"Get help to find right volunterring oppirtunities for yourself"},
          
        ],
        href: "/assistance",
        buttonText: "Contact Us",
      },
    ],
    paperContent: {
      title: "Would you like to be",
      subTitle: " a part of Sukoon?",
      subHeading:
        "You are one step away from joining India’s most caring and loved community of Seniors.",
    },
    trustMarker: [
      {
        title: "Trust",
        description:
          "Each Sukoon Saarthi is carefully selected and verified to ensure genuine care.",
        imageUrl: `${imageUrl}trust-hand.svg`,
      },
      {
        title: "Safe",
        description:
          "All calls are fully secure, providing a safe space where seniors can feel cared for and at ease.",
        imageUrl: `${imageUrl}safe.svg`,
      },
      {
        title: "Available",
        description:
          "We're here every day from 9 AM to 9 PM, offering trusted support whenever you need it.",
        imageUrl: `${imageUrl}available.svg`,
      },
    ],
  });
  // uncomment after firebase update
  useEffect(() => {
    // write_data_to_firebase("sukoonUnlimited", page_copy);
    get_data_from_firebase("sukoonUnlimited").then((res) => {
      if (res) {
        set_page_copy(res);
      }
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

  const { isScrolled } = useCustomScrollPosition(2);
  const userInfo = useAppSelector((state) => state.authUserReducer.data);
  return (
    <>
      <MaxWidthWrapper>
        <div
          id="sukoon-video-guide"
          className={`${
            isScrolled
              ? "come-up visible"
              : "come-up visible sm:animate-fade-out"
          } top-8 sm:top-[-20px] flex flex-col items-center justify-center transition-all duration-500 rounded-xl w-full min-w-80 relative `}
        >
          <div className="relative inline-block">
            <div className="absolute top-1 left-1 w-full h-full border-[3px] border-black border-solid rounded-lg z-0"></div>

            <iframe
              className="relative aspect-video w-[90vw] sm:w-[60vw] md:w-[60vw] lg:w-[60vw] rounded-lg "
              src="https://www.youtube.com/embed/pecU_kh_qHw"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <CenterArrowWithText />
        </div>
      </MaxWidthWrapper>
      <div className="flex md:flex mt-8">
        <RatingOnPaperGrid />
      </div>

      <div className="flex w-full justify-center items-center mt-4">
        {/* //@ts-ignore */}
        <Slider
        autoplay={true}
        autoplaySpeed={5000}
          key={"slider-main"}
          {...settings}
          ref={sliderRef}
          className="w-[90vw] "
        >  {page_copy.content.map((element, index) => (
          <div
            key={`main-div-${index}`}
            className="flex flex-col justify-center items-center mt-2 sm:mt-0 mb-8 sm:mb-12 lg:mb-16"
          >
            {/* Navigation and Title for Big screen */}
            <div
              key={`nav-big-${index}`}
              className="hidden md:flex flex-row justify-between items-center w-full mt-2 sm:px-8 lg:px-12"
            >
              <Btn
                color="primaryYellow"
                text=""
                key={`btn-prev-big-${index}`}
                size="small"
                onClick={() => sliderRef.current.slickPrev()}
                endIcon={<ArrowBackIos fontSize="small" />}
              />

              <span
                key={`title-big-${index}`}
                className="flex flex-row text-lg sm:text-2xl lg:text-3xl text-black justify-center items-center gap-1 sm:gap-6"
              >
                <Image
                  key={`title-icon-big-${index}`}
                  src={`${imageUrl}meditate-icon.svg`}
                  className="bg-[#FFEAB1] p-2 rounded-full"
                  alt={element.title}
                  width={40}
                  height={40}
                />
                  <p className="text-2xl font-extrabold sm:text-3xl md:text-4xl lg:text-5xl">
                    {element.title}
                  </p>
              </span>

              <Btn
                color="primaryYellow"
                text=""
                key={`btn-next-big-${index}`}
                size="small"
                onClick={() => sliderRef.current.slickNext()}
                endIcon={<ArrowForwardIos fontSize="small" />}
              />
            </div>

            {/* Content Section */}
            <div
              key={`content-section-${index}`}
              className="flex flex-col lg:flex-row items-center justify-between px-2 gap-8 sm:gap-12 sm:px-8 lg:px-12"
            >
              {/* Image Section */}
              <div
                key={`image-container-${index}`}
                className="relative inline-block w-full mx-2 sm:w-[70%] md:w-[70%] lg:w-[40%] xl:w-[30%] h-[200px] sm:h-[300px] lg:h-[400px]"
              >
                <div
                  key={`image-border-${index}`}
                  className="absolute top-1 right-1 w-full h-full border-[3px] border-black border-solid rounded-[20px] xs:rounded-[20px] sm:rounded-[40px] md:rounded-[30px] lg:rounded-[60px] rounded-br-none z-0"
                ></div>
                <Image
                  key={`image-${index}`}
                  src={element.imageUrl}
                  alt="Sarathi Feature"
                  fill
                  className="object-cover rounded-[20px] xs:rounded-[20px] sm:rounded-[40px] md:rounded-[30px] lg:rounded-[60px] rounded-br-none"
                />
              </div>

              {/* Navigation and Title for Mobile */}
              <div
                key={`nav-mobile-${index}`}
                className="flex md:hidden flex-row justify-between items-center w-full mt-2 sm:px-8 lg:px-12"
              >
                <Btn
                  color="primaryYellow"
                  text=""
                  key={`btn-prev-mobile-${index}`}
                  size="small"
                  onClick={() => sliderRef.current.slickPrev()}
                  endIcon={<ArrowBackIos fontSize="small" />}
                />

                <span
                  key={`title-mobile-${index}`}
                  className="flex flex-row text-lg sm:text-2xl lg:text-3xl text-black justify-center items-center gap-1 sm:gap-6"
                >
                  <Image
                    key={`title-icon-mobile-${index}`}
                    src={`${imageUrl}meditate-icon.svg`}
                    className="bg-[#FFEAB1] p-2 rounded-full"
                    alt={element.title}
                    width={40}
                    height={40}
                  />
                  <p className="text-2xl font-extrabold ">
                    {element.title}
                  </p>
                </span>

                <Btn
                  color="primaryYellow"
                  text=""
                  key={`btn-next-mobile-${index}`}
                  size="small"
                  onClick={() => sliderRef.current.slickNext()}
                  endIcon={<ArrowForwardIos fontSize="small" />}
                />
              </div>

              {/* Text Section */}
              <div key={`text-section-${index}`} className="w-full mx-2 sm:w-[80%] md:w-[90%] lg:w-[60%] flex flex-col gap-6">
                <p className="font-medium text-lg md:text-xl lg:text-2xl">
                  {element.description}
                </p>

                {/* Features */}
                <ul key={`features-list-${index}`} className="list-none flex flex-col gap-4">
                  {element.features.map((feature, featureIndex) => (
                    <li key={`feature-${index}-${featureIndex}`} className="flex gap-3 items-center">
                      <Image
                        key={`feature-icon-${index}-${featureIndex}`}
                        src={`${imageUrl}check.svg`}
                        alt="Check"
                        width={20}
                        height={20}
                      />
                      <span className="text-base md:text-xl font-bold mr-1">
                        {feature.heading} <span className="text-base md:text-xl font-light">
                          {feature.subHeading}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Buttons */}
                <div
                  key={`buttons-${index}`}
                  className="flex flex-row gap-2 justify-start sm:justify-center md:justify-center lg:justify-start items-center"
                >
                  <Image
                    key={`arrow-curl-${index}`}
                    src={`${imageUrl}arrow-curl.svg`}
                    alt="Curled Right Arrow"
                    width={90}
                    height={90}
                    className="scale-x-[-1]"
                  />
                  <Link href={element.href} key={`link-btn-${index}`}>
                    <Btn
                      customClass="rounded-xl flex items-center justify-center gap-1 font-extrabold"
                      size="large"
                      color="primaryYellow"
                      fontSize="text-base"
                    >
                      <span className="text-sm sm:text-base">
                        {element.buttonText}
                      </span>
                      <Image
                        key={`button-icon-${index}`}
                        src={`${imageUrl}rounded-right-arrow.svg`}
                        alt="Rounded Right Arrow"
                        width={5}
                        height={10}
                      />
                    </Btn>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    
        </Slider>
      </div>

      {userInfo?._id ? null : (
        <div
          style={{ backgroundImage: `url(${imageUrl}bg-paper.png)` }}
          className="flex flex-col md:flex-row justify-center items-center px-4 py-6 md:pb-0 gap-6"
        >
          <div className="pb-2">
            <div className="flex flex-col ">
              <h1 className="font-medium text-3xl md:text-5xl">
                {page_copy.paperContent.title}
                <span className="font-extrabold text-3xl md:text-5xl">
                  {page_copy.paperContent.subTitle}
                </span>
              </h1>
              <h1 className="text-xl font-normal w-[70%] md:w-full block sm:hidden md:hidden lg:block flex-wrap">
                {page_copy.paperContent.subHeading}
              </h1>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-4">
              <SignBtn isInline={true} />
              <Link
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.sukoon.india&hl=en"
              >
                <Btn
                  customClass="flex items-center justify-center gap-3"
                  isFullWidth={true}
                  color="primaryYellow"
                  fontSize="text-sm"
                  fontWeight="font-bold"
                  textColor="black"
                  border="black"
                  borderType="3d"
                >
                  <span className=" font-boldFont">{"Download the App"}</span>
                  <Image
                    src={`${imageUrl}rounded-right-arrow.svg`}
                    alt="Curled Right Arrow"
                    width={10}
                    height={30}
                  />
                </Btn>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex w-[40%]">
            <Image
              src={`${imageUrl}brand-hand.svg`}
              alt="Paper"
              width={500}
              height={100}
            />
          </div>
        </div>
      )}
      {/* PLEASE PUT IN SEPEARE COMPONENT POST COMPLETION */}
      <div className="flex relative w-full max-w-6xl mx-auto px-4 py-12 items-center justify-center">
        <div className="relative w-full">
          <Image
            src={`${imageUrl}eclipse.svg`}
            alt="Paper"
            layout="fill"
            objectFit="cover"
            className="hidden z-0 relative w-full max-w-6xl mx-auto px-4 py-12 sm:flex items-center justify-center"
          />
          <div className="hidden relative sm:flex flex-row justify-center md:flex-row gap-8 items-stretch z-10">
            {page_copy.trustMarker.map((marker, index) => (
              <CenterIconWithTextCard
                key={index}
                title={marker.title}
                description={marker.description}
                imageUrl={marker.imageUrl}
              />
            ))}
          </div>
          {/* <div className="flex flex-row justify-around items-center w-full z-10 sm:hidden">
            {page_copy.trustMarker.map((marker, index) => (
              <div
                key={`major-${index}`}
                className="flex flex-col justify-center items-center"
              >
                <div className=" bg-goldLight p-3 h-20 w-20 rounded-2xl">
                  <Image
                    key={index}
                    src={marker.imageUrl}
                    alt="Profile"
                    width={75}
                    height={75}
                  ></Image>
                </div>
                <p className="text-lg font-normal">{marker.title}</p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SukoonUnlimited;
