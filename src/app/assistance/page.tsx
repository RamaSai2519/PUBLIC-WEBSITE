'use client'
import Btn from "@/components/button";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { imageUrl } from "@/utils/constants";
import { get_data_from_firebase, write_data_to_firebase } from "@/utils/firebase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Assistance = () => {

  const [callPhoneNumber,setCallPhoneNumber] = useState('8660610849')
  const [assistanceFirebaseData, setAsistanceData] = useState( [
      {
        title: "Plan your holiday",
        imgUrl: `${imageUrl}navigate.svg`,
      },
      {
        title: "Get things delivered home (Cash on Delivery)",
        imgUrl: `${imageUrl}truck.svg`,
      },
      {
        title: "Ask social media queries",
        imgUrl: `${imageUrl}social.svg`,
      },
      {
        title: "Verify any payment link, phone apps and SMS",
        imgUrl: `${imageUrl}security.svg`,
      },
    ]
  )
  const init = async () => {
    get_data_from_firebase("phoneNumber").then(res => {
      //@ts-ignore
      setCallPhoneNumber(res.number)
    })


    get_data_from_firebase("assistancePage").then(res => {
      //@ts-ignore
      setAsistanceData(res.services)
    })


  }

  useEffect(()=>{
    init();
  },[])

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col  sm:mb-32 p-0 md:p-20">
        <div className="flex flex-col  items-center sm:items-start mb-4 sm:mb-16">
          <h1 className="text-4xl">Sukoon Assistance</h1>
          <p className="font-lightFont">Available 12 hours a day, all week</p>
        </div>
        <div className="flex flex-col-reverse  sm:flex-row  justify-between p-8 sm:p-0 gap-8 sm:gap-0">
          <div className="flex flex-col justify-start  gap-8">
            {assistanceFirebaseData.map((service, index) => {
              return (
                <div
                  className="flex flex-row justify-start  items-start gap-3"
                  key={`${service.title}-${index}`}
                >
                  <Image
                    src={service.imgUrl}
                    alt={"Assistace"}
                    width={50}
                    height={50}
                  />
                  <p>{service.title}</p>
                </div>
              );
            })}
            <Link href={`tel:+91${callPhoneNumber}`} className="w-full">
              <Btn
                isFullWidth={false}
                text={`Call On +91${callPhoneNumber}`}
                color="primaryYellow"
              />
            </Link>
          </div>

          <div>
            <Image
              src={`${imageUrl}assistant.png`}
              alt={"Assistace"}
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Assistance;
