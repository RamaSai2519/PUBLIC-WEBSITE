import Image from "next/legacy/image";
import React, { useId, useState } from "react";
import { ConnectSarathiTypes } from "./connectSarathi.interface";
import CustomModal from "../Modal";
import Speak from "../speak";
import Btn from "../button";
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { getCookie } from "@/utils/axiosHelper";
import { enableLoginModal } from "@/store/slices/loginModalSlice";
import PersonCard from "../PersonLoader";
import { usePremium } from "@/context/PremiumContext";
import { useAppSelector } from "@/store/store";
import { getItems } from "@/utils/indexDbUtils";
import { trackEvent } from "@/context/Amplitude/AmplitudeInit";

const ConnectSarathiCard: React.FC<ConnectSarathiTypes> = (props) => {
  const unqiueId = useId();
  const { description, image, reviews, stars, title, buttonText, isDisabled, href, game,type } = props;
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const userSelector =  useAppSelector(state=> state.authUserReducer.data);
  const dispatch = useAppDispatch();

  const { openPremiumFeature } = usePremium();
  const handleClick = async () => {

    trackEvent('dedicated-page-clicked', { title, buttonText })
    // if(!userSelector?.isPaidUser) {
    //   openPremiumFeature();
    //   return
    // }

    if (!href) {
      const getUserToken = await getItems();
      //@ts-ignore
      if (!getUserToken?.phoneNumber) {
        dispatch(enableLoginModal({
          showLoginModal: true,
          isPaid: false,
          nextStep: false
        }));
        return;
      }
      setIsComponentVisible(true);
    }
  };

  return (
    <div key={`ConnectSarathiCard-${unqiueId}-div1`} className="bg-[#FFF6DF] w-full  rounded-3xl pb-6 relative">
      <div key={`ConnectSarathiCard-${unqiueId}-div`} className="relative w-full h-[270px]">
        <Image
          layout="fill"
          alt={`${title}-sukoonunlimited.com`}
          key={`ConnectSarathiCard-${unqiueId}-image`}
          src={image}
          className="object-cover object-top object-[top 50px] rounded-t-3xl"
        />
        <div key={`ConnectSarathiCard-${unqiueId}-div`} className="testimonial-card-gradient w-full h-28 absolute bottom-0 ring-0 left-0 z-10" />
      </div>
      <div className="p-2">
        <h3 key={`ConnectSarathiCard-${unqiueId}-h3`} className="text-center  text-wrap text-base md:text-xl lg:text-2xl">{title}</h3>
        {/* <div className="flex items-center gap-1 md:gap-4 justify-center mt-4 mb-6">
          <span className="font-lightFont">
            <Star /> {stars}
          </span>
          <span>|</span>
          <span className="font-lightFont">{reviews}+ reviews</span>
        </div> */}
        <p key={`ConnectSarathiCard-${unqiueId}-p`} className="text-center font-lightFont mt-4  p-2">{description}</p>
      </div>
      <span key={`ConnectSarathiCard-${unqiueId}-span`} className="absolute left-0 right-0 -bottom-4 mx-auto flex justify-center">
        {href ? <Link key={`${unqiueId}-${href}`} href={href}>
          <Btn text={buttonText} key={`${unqiueId}-${buttonText}`} isDisabled={isDisabled} color="primaryYellow" />
        </Link> :
          <Btn text={buttonText} key={`${unqiueId}-${buttonText}`} isDisabled={isDisabled} color="primaryYellow" onClick={handleClick} />
        }
      </span>
      {isComponentVisible && game &&
        <CustomModal
          open={isComponentVisible}
          onClose={() => setIsComponentVisible(false)}
          titleColor="black"
          bgColor="white"
          isFullWidth={true}
          fullScreen={false}
          modalWidth="lg"
        >

          <h1 className="text-center text-2xl  font-mediumFont p-2 ">Select Sarathi to Play Game</h1>

          <div className="overflow-x-scroll align-baseline justify-start ">

            <Speak isGame={true} type={type} />
          </div>
        </CustomModal>
      }
    </div>
  );
};

export default ConnectSarathiCard;
