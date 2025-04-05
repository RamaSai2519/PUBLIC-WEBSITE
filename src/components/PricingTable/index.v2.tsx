"use client";
import { basePrice } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import Btn from "../button";
import { useAppSelector } from "@/store/store";
import { isMobile } from "react-device-detect";
import { Raxios } from "@/utils/axiosHelper";
import OfferCard, { OfferCardProps } from "../offerCard/offerCard";
import Image from "next/image";
import { get_data_from_firebase } from "@/utils/firebase";
import { getPricing } from "@/utils/helpers";
import OfferSlider from "../offerSlider/OfferSlider";
import { ArrowForwardIos } from "@mui/icons-material";

const bgGradient = ` bg-gradient-to-r from-pink-500 to-purple-900`;
export type Plan = {
  name: string;
  price: string;
  features: Record<string, string>;
  onSubscribeClick?: () => void;
};




interface PricingTableProps {
  onSubscribeClick?: () => void;
  location?: "homepage" | "pricingpage";
  actualPrice?: string
  offerPrice?: string
  actualPriceInNumber?:number;
  offerPriceInNumber?:number;
}

const PricingTableV2 = (props: PricingTableProps) => {
  const [pricingTableDataFromFirebase, setPricingTableDataFromFirebase] = useState({
    paid: {
      "Conversations with Sarathis": "unlimited",
      "Counseling  with Sukoon Coaches": "3 Consultations",
      "Counselor led Support groups": "Unlimited",
      "Community Meetups": "unlimited",
      "Volunteering and Mentoring opportunities": "Unlimited",
      "Sukoon Assistance for daily": "Unlimited",
    },
    free: {
      "3 one-on-one therapy sessions with certified counselors": "unlimited",
      "Unlimited access to group counseling sessions for emotional well-being": "Unlimited",
      "Unlimited conversations with Sarathis, your trusted companions": "Unlimited",
      "Unlimited access to digital assistance for tech support": "unlimited",
      "Unlimited access to all community meetups for learning, fun, and friendships": "Unlimited",
    }
  })

  const [currentPricing, setCurrentPricing] = useState({
    //@ts-ignore
    formatPricing:( props?.offerPriceInNumber ) > 0 ? props.offerPrice : props.actualPrice || "₹2,999",
     //@ts-ignore
    unformattedPrice:  (props?.offerPriceInNumber )> 0 ? props.offerPriceInNumber : props.actualPriceInNumber | 2999,
  })
  useEffect(()=>{
    if(props.offerPriceInNumber){
      setCurrentPricing(
        {
           //@ts-ignore
    formatPricing:( props?.offerPriceInNumber ) > 0 ? props.offerPrice : props.actualPrice || "₹2,999",
    //@ts-ignore
   unformattedPrice:  (props?.offerPriceInNumber )> 0 ? props.offerPriceInNumber : props.actualPriceInNumber | 2999,
        }
      )
    }
  },[props?.offerPriceInNumber])
 
  // uncomment after the firebase has been updated
  // useEffect(() => {

  //   get_data_from_firebase('pricingTable').then(res => {
  //     if (res) {
  //       //@ts-ignore
  //       setPricingTableDataFromFirebase(res);
  //     }
  //   })
  //   // fetchOffers();
  //   // setIsClient(true);
  // }, []);

  const plans: Plan[] = [
    {
      name: "FREE Plans",
      price: "₹0",
      features: {
        ...pricingTableDataFromFirebase.free
      },
    },
    {
      name: "upgrade",
      //@ts-ignore
      price: currentPricing.formatPricing,
      features: {
        ...pricingTableDataFromFirebase.paid
      },
    },
  ];


  const [isClient, setIsClient] = useState(false);
  const allFeatures = Object.keys(plans[0].features);
  const userData = useAppSelector((state) => state.authUserReducer.data);
  const isPaidUser = userData?.isPaidUser;

  const [offers, setOffers] = React.useState([]);

  const fetchOffers = async () => {
    try {
      const response = await Raxios.get("/actions/upsert_offer?page=1&size=10");
      if (response.data) {
        setOffers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOffers();
    setIsClient(true);
  }, []);

  const paidPlans = plans;

  return (
    !isPaidUser ? <div key='table-fix' className="flex flex-col  gap- 2 rounded-2xl p-2 md:p-6 lg:p-2 justify-center items-center">
      <div className="max-w-md min-w-full  rounded-2xl ">
        <div className="relative pricing-div p-4  rounded-t-md bg-gradient-to-r from-gradientStart to-gradientEnd  w-full">
          {/* <p className="absolute -top-2 text-black right-2 bg-primaryYellow p-[6px] rounded-lg text-sm font-lightFont">Save ₹200</p> */}
          <p className="text-white text-lg font-heavyFont">Sukoon club membership</p>
          <div className="flex flex-row gap-2">
            <p className="text-white text-xl font-extrabold line-through">{props.actualPrice}  {(props.actualPriceInNumber || 0) > 12 ? `(` + Math.ceil((props.actualPriceInNumber || 0) / 12) + "/mo)" : ''} </p>
            <p className="text-white text-2xl font-extrabold">{currentPricing.formatPricing} only!  {(currentPricing.unformattedPrice || 0) > 12 ? `(` + Math.ceil((currentPricing.unformattedPrice || 0) / 12) + "/mo)" : ''} </p>
          </div>
        </div>
        <div key={'event-key'} className="flex flex-col gap-2 p-4 border-black border-l-2 border-r-2 border-b-4 border-t-2 rounded-b-xl">
          {
            allFeatures.map((item, index) => {
              return <div key={`${item}-${index}`} className="flex flex-row gap-2 items-center">
                <Image alt={`${item}-${index}`} src={"/hearth.svg"} width={20} height={20} />
                <p className="font-boldFont text-xs" key={`${item}-${index}`} >{item}</p>
              </div>
            })
          }
          <hr className="m-3" />
          <OfferSlider />
          <Btn
            text="Get Subscription"
            onClick={props.onSubscribeClick}
            endIcon={<ArrowForwardIos />}
            color="primaryYellow" />
        </div>
      </div>

    </div> : <></>
  );
};

export default PricingTableV2;
