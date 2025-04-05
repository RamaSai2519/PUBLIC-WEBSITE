import React, { useEffect, useState } from "react";
import Btn from "../button";
import Link from "next/link";
import useCustomScrollPosition from "@/utils/useCustomScrollPostition";
import {
  get_data_from_firebase,
  write_data_to_firebase,
} from "@/utils/firebase";
import { useAppSelector } from "@/store/store";
import { isMobile } from "react-device-detect";
import Image from "next/image";
import { useRouter,usePathname } from "next/navigation";
interface heroProps {
  backgroundImage?: string;
  title?: string;
  subTitle?: string;
  hero_text_color?: string;
  hero_subText_color?: string;
  getStartedBtnColor?: 'white' | 'black';
}

const Hero = ({ backgroundImage, title, subTitle,hero_text_color,hero_subText_color, getStartedBtnColor }: heroProps) => {
  const { isScrolled } = useCustomScrollPosition(2);

  const router = usePathname();

  const authUserDetails = useAppSelector((state) => state.authUserReducer.data);
  const [hero_copy_obj, set_hero_copy_obj] = useState({
    title: "Spreading Joy, Every Moment",
    subtitle: "Community for Seniors by Seniors",
    btnText: "Register Now",
    appBtnText: "Download the App",
  }); 
  if (!backgroundImage) {
    backgroundImage = "/hbd_background.jpeg";
  }
  useEffect(() => {
    get_data_from_firebase("hero").then((res) => {
      if (res) {
        //@ts-ignore
        set_hero_copy_obj(res);
      }
    });
  }, []);
  return (
    <div
      style={{
        backgroundImage: ` ${isMobile ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),':''} url(${backgroundImage})`,
        backgroundSize:"cover",
        backgroundPosition: "top 0px right 28%",
        backgroundRepeat: "no-repeat",
        ...(isMobile && { boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.5)" }),
      }}
      // style={{
      //   backgroundImage: ` ${isMobile ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),':''} url(${backgroundImage})`,
      //   backgroundSize: isMobile ? "cover" : "contain",
      //   backgroundPosition: "top 0px right 28%",
      //   backgroundRepeat: "no-repeat",
      //   ...(isMobile && { boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.5)" }),
      // }}
      className="relative md:top-12 z-0 flex flex-col items-start justify-center bg-gradient-to-b from-gray-900 to-gray-800 h-[70vh] sm:h-[70vh] md:h-[70vh] lg:h-[95vh] xl:h-[90vh]"
    >
      {
        isMobile && router.includes("axis") ? <div className="absolute  top-9 flex justify-center items-center w-full ">
          <Image alt="axis bank logo" src="/axis-icon.png" width={200} height={200} />
        </div> : <div className="absolute top-7 right-0 lg:top-16 flex flex-col items-end gap-1 w-[300px] sm:w-[60%]">
          <div className="self-start relative left-4 sm:left-32 lg:left-44 xl:left-48 w-[200px] lg:w-auto text-sm text-stone-50 rounded-bl-none rounded-full bg-[#2B2B2B] p-2 text-center">
            Sukoon is a community of {" "}
            <span className="text-primaryYellow">5000+</span> happy senior citizens
          </div>
          <div className="self-end relative right-16 sm:right-36 lg:right-56 xl:right-72 text-sm text-stone-50 rounded-br-none rounded-full bg-[#2B2B2B] p-2 text-center">
            I would love to be a part of it!
          </div>
        </div>
      }
     
      
      
      {/* Hero Content */}
      <div className="relative items-center justify-center top-24 m-2 sm:ml-20 mb-2 z-10 max-w-full flex flex-col gap-6 sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h1 className={`${hero_text_color || 'text-white' } text-3xl md:text-4xl lg:text-5xl font-bold leading-tight`}>
          {title || hero_copy_obj.title}
          <br />
          <br />
          <span className={`${hero_subText_color ? `text-[${hero_subText_color}]` : 'text-primaryYellow'} font-bold italic`}>
            {subTitle || hero_copy_obj.subtitle}
          </span>
        </h1>
        {!authUserDetails?.isPaidUser ? (
          <span className="flex flex-row gap-4">
            <Link href="/speak">
              <Btn
                text={hero_copy_obj.btnText}
                color="transparent"
                textColor={getStartedBtnColor ? getStartedBtnColor : "white"}
                customClass={`border-2 border-white hover:bg-${getStartedBtnColor || 'white'} hover:text-gray-900 transition-all duration-300`}
                border={getStartedBtnColor ? getStartedBtnColor : "white"}
                borderType="rounded"
              />
            </Link>
            <Link
              target="_blank"
              href="https://play.google.com/store/apps/details?id=com.sukoon.india&hl=en"
            >
              <Btn
                text={hero_copy_obj.appBtnText || "Download the App"}
                color="primaryYellow"
                textColor="black"
                border="black"
                borderType="3d"
              />
            </Link>
          </span>
        ) : (
          <></>
        )}
      </div>
      
      {/* Scroll Effect Gradient */}
      <div
        className={`absolute bottom-0 left-0 right-0 w-full h-20 ${
          isScrolled ? "bg-gradient-to-t from-white to-transparent" : ""
        }`}
      />
    </div>
  );
};

export default Hero;
