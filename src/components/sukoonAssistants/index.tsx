import React, { useEffect, useState } from "react";
import { assistantsData } from "./data";
import AssistantsAccordion from "./assistantsAccordion";
import Image from "next/legacy/image";
import Btn from "../button";
import MaxWidthWrapper from "../maxWidthWrapper";
import Link from "next/link";
import { get_data_from_firebase } from "@/utils/firebase";

interface iAssistant {
  showLearnMoreBtn?: boolean;
}
const SukoonAssistants = (props: iAssistant) => {

  const [callPhoneNumber,setCallPhoneNumber] = useState('8660610849')
  const init = async () => {
    await get_data_from_firebase("phoneNumber").then(res => {
      //@ts-ignore
      setCallPhoneNumber(res.number)
    })
  }

  useEffect(()=>{
    init();
  },[])
  const { showLearnMoreBtn = true } = props
  return (
    <MaxWidthWrapper>
      <div className="px-4">
        <div className="flex md:gap-20 lg:gap-24 xl:gap-28 w-full">
          <div className="w-full lg:w-[40%]">
            {showLearnMoreBtn &&
              <div>
                <h1 className="text-2xl sm:text-5xl text-center sm:text-left">Sukoon Assistant</h1>
                <p className="text-base font-normalFont justify-between p-2 mt-2" >Received a payment request or link that you are apprehensive about? Got a FB invite that seems fishy? Received a request to connect that seems odd? Unsure how to create a new account or complete a transaction online?</p>
                <p className="text-base font-normalFont justify-between p-2 mt-2" >
                  <span className="hidden md:inline text-base font-normalFont">Don’t worry! Sukoon Assistant is available 12 hours a day, 7 days a week to help you with any digital related queries or tasks. </span>
                  <span className="text-base font-normalFont">From everyday requests to learning something new, Sukoon Assistants are here to provide help on demand.</span>
                </p>
              </div>}
            <div className="mt-10">
              {assistantsData?.map((item, index) => (
                <AssistantsAccordion key={index} {...item} />
              ))}
              {showLearnMoreBtn ?
                <Link href='/concierge'>
                  <Btn
                    text={`Call us @ +91${callPhoneNumber}`}
                    color="primaryYellow"
                    customClass="mt-8"
                  />
                </Link> :
                <div key="main-support-call-btn" className="mt-16 mb-16">
                  <div key="support-call-btn" className="flex flex-row justify-center items-center">
                    <Link href={`tel:+91${callPhoneNumber}`} key="call-support">
                      <Btn text={`Call +91${callPhoneNumber}`} key="call-btn" color="primaryYellow" />
                    </Link>
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="hidden lg:block w-[60%] relative aspect-video h-[590px] rounded-3xl overflow-hidden border-4 border-primaryYellow">
            <Image
              src={"/concierge.jpg"}
              alt="assistants-img"
              layout="fill"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default SukoonAssistants;
