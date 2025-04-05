import { imageUrl } from "@/utils/constants";
import { get_data_from_firebase, write_data_to_firebase } from "@/utils/firebase";
import Image from "next/image";
import useDeviceType from "@/hooks/useDeviceType";
import { useEffect, useState } from "react";

export function CenterArrowWithText() {
  const { isMobile } = useDeviceType();
  const [page_copy_from_firebase, set_page_copy_from_firebase] = useState({
    title: "Sukoon Unlimited: A Community for Seniors, by Seniors",
    subParaOne: "Sukoon Unlimited brings senior citizens across India together in a one-of-a-kind community built on friendship, care, and support. Whether it’s sharing stories, indulging in hobbies, or finding help for everyday needs, this is a space where seniors truly belong.",
    subParaTwo: "This community of Seniors is dedicated to being there for each other, no matter your needs. From senior care assistance to meaningful connections and joyful experiences, Sukoon Unlimited ensures you never feel alone. Here, every member is valued, every moment cherished, and every day made brighter with companionship and support.",
    subParaThree: "Join Sukoon Unlimited and start your journey toward happier, healthier living today!"
  })
  useEffect(() => {
    get_data_from_firebase('centerArrowWithText').then(res => {
      if (res) {
        // @ts-ignore
        set_page_copy_from_firebase(res)
      }
    })
  }, [])
  return (
    <div
      key="hero-sukoon-span-1"
      className="p-2 sm:p-4 flex flex-col md:flex-col self-center justify-center items-center w-full [&>*]:max-h-[500px]"
    >
      {/* <Image
        alt="Sukoon logo"
        key={"AppHeaderImage"}
        className="self-center"
        src={`${imageUrl}arrowTop.svg`}
        width={isMobile?75:150}
        height={isMobile?50:100}
      /> */}
      {/* <h1
    key="h1-sukkon-span"
    className="text-2xl md:text-5xl text-center md:text-left font-lightFont leading-6 sm:leading-9 md:leading-[50px]"
  >
    Meet the Visionary
  </h1> */}
      <h1 key={page_copy_from_firebase.title} className="text-2xl md:text-4xl text-center md:text-left font-extrabold mt-4 leading-6 sm:leading-9 md:leading-[50px]">
        <b key={page_copy_from_firebase.title} className="text-primaryYellow ">{page_copy_from_firebase.title}</b>
      </h1>
      <div
        key="div-sukkon-span-2"
        className="flex flex-col items-center md:items-start text-base sm:gap-4 gap-4 p-2 sm:p-0 [&>*]:max-w-[500px]"
      >
        <div
          key="first-para-sukkon-span"
          className="text-center"
        >
          <p className="md:text-2xl text-base font-normal text-justify mt-4" key={page_copy_from_firebase.subParaOne}>
            {page_copy_from_firebase.subParaOne}
          </p>

          <p className="md:text-2xl text-base font-normalFont text-justify mt-4" key={page_copy_from_firebase.subParaTwo}>
            {page_copy_from_firebase.subParaTwo}
          </p>

          <p className="md:text-2xl text-base font-bold text-justify mt-4" key={page_copy_from_firebase.subParaThree}>
            {page_copy_from_firebase.subParaThree}
          </p>
        </div>
      </div>
    </div>
  );
}
