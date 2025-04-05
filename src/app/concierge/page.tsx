'use client'
import Btn from "@/components/button";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import SukoonAssistants from "@/components/sukoonAssistants";
import TrustCard from "@/components/trust-card";
import appTheme from "@/theme";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

const Concierge = () => {
  const iconStyle = {
    width: 32,
    height: 32,
    color: appTheme.colors.darkGray,
  };
  const commitmentIconStyle = {
    width: 32,
    height: 32,
    color: appTheme.colors.darkGray,
  };



  const services = [
    {
      icon: '/concierge/phone.png',
      title: "100% simple",
      des: "Dial +918660610840 for any help needed",
    },
    {
      icon: '/concierge/secure.png',
      title: "100% safe",
      des: "No payment related information to be shared",
    },
    {
      icon: '/concierge/person.png',
      title: "100% supportive",
      des: "All digital related queries and tasks supported",
    },
  ];

  return (
    <div className="min-h-screen px-8 py-4 sm:py-4 ">
      <MaxWidthWrapper>
        <head>
          <title> Sukoon Assistant | Sukoon Unlimited | Speak with sarathis whenever you want</title>
        </head>
        <div className="flex flex-col items-center justify-center my-4">
          <div className="section-title italic flex flex-row">
            Sukoon Assistant
          </div>
          <p className="text-base font-normalFont text-gray-600 pt-2">
            Available 12 hours a day, 7 days a week, our Concierge service makes your daily lives easier by doing everything digital you want to do, don't want to do or don't have time to do. From everyday requests to learning something new, Sukoon Assistants are here to provide help on demand.
          </p>
        </div>
        <SukoonAssistants showLearnMoreBtn={false} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {services?.map((item, index) => (
            <div key={'concierge-main' + index} className="flex flex-col justify-center gap-4 items-center shadow-lg rounded-lg border border-primaryYellow p-10">
              <Image key={`image-${index}`} alt={item.title + " sukoonunlimited.com"} src={item.icon} width={40} height={80} />
              <p key={item.title + " p"} className="text-lg font-heavyFont"> {item.title}</p>
              <p key={item.des + " p"} className="text-base font-normalFont"> {item.des}</p>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Concierge;
