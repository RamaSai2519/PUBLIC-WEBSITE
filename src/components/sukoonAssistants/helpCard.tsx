import React, { useEffect, useState } from "react";
import { Icons } from "../Icons";
import Btn from "../button";
import { HelpCardTypes } from "./interface";
import useDeviceType from "@/hooks/useDeviceType";
import { get_data_from_firebase } from "@/utils/firebase";

const HelpCard: React.FC<HelpCardTypes> = (props) => {
  const { isSarathiCard = true } = props;

  const { isMobile } = useDeviceType();
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

  const message = `Hello, I would like to know more`;
  const url = `https://api.whatsapp.com/send?phone=+91${callPhoneNumber}&text=${message}`;

  return (
    <div className="px-4 py-4 mb-[30px] self-stretch border-2 border-primaryYellow rounded-2xl min-w-[300px] flex flex-col items-center snap-center">
      <div className="mt-auto size-52 min-w-5 rounded-full border-4 flex items-end justify-center overflow-hidden border-primaryYellow">
        <Icons.help />
      </div>
      <div className="my-auto px-7">
        <h3 className="text-center text-2xl leading-7">
          Don’t know which Sukoon {isSarathiCard ? "Sarathi" : "Expert"} to
          connect with?
        </h3>
        <h1 className="uppercase font-heavyFont text-center text-3xl mt-2">
          We can help
        </h1>
      </div>
      <a
        className="mt-auto mb-11 w-full"
        href={isMobile ? `tel:+91${callPhoneNumber}` : url}
        target="_blank"
      >
        <Btn text={"Speak Now"} color={"primaryYellow"} isFullWidth />
      </a>
    </div>
  );
};

export default HelpCard;
