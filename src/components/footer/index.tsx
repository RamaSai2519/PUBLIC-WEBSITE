"use client";
import { Copyright, WhatsApp } from "@mui/icons-material";
import Logo from "../logo";
import MaxWidthWrapper from "../maxWidthWrapper";
import { links, socialLinks } from "./data";
import Image from "next/image";
import { imageUrl } from "@/utils/constants";
import Link from "next/link";
import Btn from "../button";
import SignBtn from "@/hooks/auth";
import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { get_data_from_firebase } from "@/utils/firebase";

const Footer = () => {
  const [callPhoneNumber, setCallPhoneNumber] = useState("8660610849");
  const init = async () => {
    await get_data_from_firebase("phoneNumber").then((res) => {
      //@ts-ignore
      setCallPhoneNumber(res.number);
    });
  };

  useEffect(() => {
    init();
  }, []);
  const authData = useAppSelector((state) => state.authUserReducer.data);
  const SukoonCopyright = () => (
    <p className="font-lightFont sm:pl-2 md:pl-3 lg:pl-4">
      <Copyright /> 2023-24. Three Dots & Dash Pvt Ltd is the registered name of
      the company. Sukoon Unlimited is the Brand Name.
    </p>
  );

  const SukoonTerms = () => (
    <div className="px-2 md:pr-3 lg:pr-4 w-full flex justify-between gap-5 items-center [&>*]:whitespace-nowrap [&>*]:font-lightFont [&>*]:text-gray-400">
      <Link
        href="/terms-and-conditions"
        key={"Terms & Conditions-link"}
        title="Terms & Conditions"
      />
      <Link
        href="/privacy-policy"
        key={"Privacy Policy-link"}
        title="Privacy Policy"
      />
    </div>
  );

  return (
    <footer className="bg-[#FFF6DF]">
      <MaxWidthWrapper>
        {!authData?._id ? (
          <div className="text-center py-8 w-full flex flex-col gap-3 items-center justify-center">
            <h2 className="text-xl sm:text-3xl font-lightFont mb-4 text-wrap w-full sm:w-1/2">
              Helping seniors overcome isolation with connection, purpose, and
              support
            </h2>
            <div className="flex flex-col sm:flex-row gap-2">
              <SignBtn isInline={true} />
              <Link
              className="sm:w-[40%]"
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.sukoon.india&hl=en"
              >
                <Btn
                  customClass="flex items-center justify-center gap-3"
                  color="primaryYellow"
                  fontSize="text-lg"
                  isFullWidth
                  textColor="black"
                  border="black"
                  borderType="3d"
                >
                  <span className="text-base">{"Download the App"}</span>
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
        ) : (
          <div></div>
        )}
        <div className="px-8 py-12 flex-col sm:flex-row flex justify-between items-start gap-6">
          <div className="size-36">
            <Logo />
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-x-16 w-full md:w-auto">
            {links?.map((item, i) => (
              <a
                key={i}
                className="font-normalFont text-base hover:underline cursor-pointer"
                href={item?.link}
              >
                {item?.label}
              </a>
            ))}
          </div>
          <div className="[&>*]:text-lg">
            <h3 className="font-heavyFont">
              Sukoon for Seniors.
              <br /> Connections you can Trust.
            </h3>
            <h3 className="my-4">+91{callPhoneNumber}</h3>
            <p className="font-bold underline"> Address</p>
            <p className="font-lightFont"> Third Floor</p>
            <p className="font-lightFont">Ataura Co-working Space</p>
            <p className="font-lightFont">Koramangla 5th Block</p>
            <p className="font-lightFont">Bengaluru, KA, 560095</p>
            {/* <a href="https://chat.whatsapp.com/Gvl7RE4Zu0i2C1tJIKSeYW" target="blank">
              <div className="flex gap--2 items-center sm:mt-2">
                <img src="/whatsapp.png" alt="Whatsapp" />
                <p className="hover:underline">Join our Community</p>
              </div>
            </a> */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
              <p className="font-lightFont my-2">Follow us:</p>
              <div className="flex items-center gap-4">
                {socialLinks?.map((item, index) => (
                  <a
                    className="size-6 flex justify-center items-center"
                    key={index}
                    href={item.link}
                    target="_blank"
                  >
                    {<item.icon />}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* FOR MOBILE */}
        <div className="block md:hidden px-8">
          <div className="py-4 border-y border-primaryYellow">
            <SukoonTerms />
          </div>
          <div className="w-[80%] md:w-full pl-4 text-sm opacity-60 md:text-center pb-8 mt-8">
            <SukoonCopyright />
          </div>
        </div>
        {/* FOR MOBILE */}

        {/* FOR DESKTOP */}

        <div className="hidden md:block">
          <hr className="border-none w-full bg-primaryYellow h-[1px]" />
          <div className="flex justify-between items-center py-4 pb-6">
            <SukoonCopyright />
            <span>
              <SukoonTerms />
            </span>
          </div>
        </div>

        {/* FOR DESKTOP */}
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
