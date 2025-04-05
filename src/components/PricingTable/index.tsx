"use client";
import { basePrice } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import Btn from "../button";
import { useAppSelector } from "@/store/store";
import { isMobile } from "react-device-detect";
import { Raxios } from "@/utils/axiosHelper";
import OfferCard, { OfferCardProps } from "../offerCard/offerCard";
import Image from "next/image";
import { ArrowBackIos, ArrowBackIosNewRounded, ArrowForwardIos } from "@mui/icons-material";
import Slider from "react-slick";
import StackedAvatars from "../stackedAvatars/StackedAvatars";
import OfferSlider from "../offerSlider/OfferSlider";
import Link from "next/link";
import { get_data_from_firebase, write_data_to_firebase } from "@/utils/firebase";
import { getPricing } from "@/utils/helpers";

const bgGradient = ` bg-gradient-to-r from-pink-500 to-purple-900`;
export type Plan = {
  name: string;
  price: string;
  features: Record<string, string | JSX.Element>;
};



let currentSlide = 0;
const sliderPosition = (position:number) => {
  currentSlide = currentSlide + 1;
}

const mobilePlans: Plan[] = [
  {
    name: "upgrade",
    price: `₹2,999`,
    features: {
      duration: "1 year",
      "Conversations with Sarathis":
        "unlimited",
      "Counseling  with Sukoon Coaches": "1 evaluation session",
      "Volunteering and Mentoring opportunities": "Unlimited",
      "Community Meetups": "All events (Free + Paid)",
      "Contribute opportunities": "All opportunities",
      "Sukoon Assistance for daily": "Unlimited",
      "button": <div className="bg-black"> 
        <h1 className="font-boldFont text-black">Apple</h1>
        </div>,
    },
  },
];

interface PricingTableProps {
  onSubscribeClick?: () => void;
  actualPrice?: string
  offerPrice?: string
  actualPriceInNumber?:number;
  offerPriceInNumber?:number;
  
}

const PricingTable = (props: PricingTableProps) => {

  const [pricingTableDataFromFirebase, setPricingTableDataFromFirebase] = useState({
    "free": {
        "Sukoon Assistance for daily Needs": "1 per month",
        "Volunteering and Mentoring opportunities": "Unlimited",
        "Conversations with Sarathis": "3 Calls",
        "Community Meetups": "Free events Only",
        "Counseling  with Sukoon Coaches": "Nil",
        "Counselor led Support groups": "Nil"
    },
    "paid": {
        "Sukoon Assistance for daily Needs": "Unlimited",
        "Volunteering and Mentoring opportunities": "Unlimited",
        "Counselor led Support groups": "Unlimited",
        "Counseling  with Sukoon Coaches": "3 Consultations",
        "Community Meetups": "Unlimited",
        "Conversations with Sarathis": "Unlimited"
    }
})
  const [currentPricing, setCurrentPricing] = useState({
    formatPricing: "1,999",
    unformattedPrice: 1999
  })

  useEffect(() => {
    // pricing();
    // get_data_from_firebase('pricingTable').then(res=> {
    //   if(res){
    //     //@ts-ignore
    //     console.log(res,"Pricing Table")
    //     setPricingTableDataFromFirebase(res);
    //   }
    // })
    // fetchOffers();
    setIsClient(true);
  }, []);

  let planPrice = props.actualPrice || '₹2,999'
  let planPriceInNumber = props.actualPriceInNumber || 2999;

  if(props.offerPrice && props.offerPriceInNumber) {
    planPrice = props.offerPrice
    planPriceInNumber = props.offerPriceInNumber
  }
  
  const plans: Plan[] = [
    {
      name: "upgrade",
      price: currentPricing.formatPricing,
      features: {
        ...pricingTableDataFromFirebase.free,
       
        button: (
          <div className="flex flex-col justify-start bg-[#FFF2CD] w-full p-2 gap-2">
            <h1 className="font-boldFont text-darkGray text-2xl">Free</h1>
            {/* <p className="font-normal text-base text-darkGray">&nbsp;</p> */}
            {/* <p className="font-normal text-base text-darkGray">&nbsp;</p> */}
  
            <p className="text-gray-700 font-lightFont">
              Enjoy free access to community events and daily assistance
            </p>
            {/* <h1 className="font-extrabold text-black  text-4xl">&nbsp;</h1> */}
            <p className="font-normal text-base text-darkGray">&nbsp;</p>
            <Btn color="black" textColor="white" text="Free" />
          </div>
        ),
      },
    },
    {
      name: "FREE Plans",
      price: "₹0",
      features: {
        ...pricingTableDataFromFirebase.paid,
        button: (
          <div className="flex flex-col justify-start bg-[#FFF2CD] w-full p-2 gap-2">
            <p className="font-boldFont text-darkGray text-2xl">Annual Plan</p>
            {props.offerPrice ? <div className="flex flex-row gap-2 align-middle items-center">
              <p className="text-black  text-2xl line-through">{props.actualPrice}</p>
              <p className="font-extrabold text-black  text-4xl">{props.offerPrice}</p>
            </div> : <p className="text-black  text-4xl ">{props.actualPrice || '₹2,999'}</p>}
            {planPriceInNumber > 12 && <p className="font-normal text-base text-darkGray">(₹{Math.ceil(planPriceInNumber/12)}/mo)</p>}
  
            <OfferSlider />
              <Btn
                color="black"
                textColor="white"
                isFullWidth
                onClick={() => props.onSubscribeClick ? props.onSubscribeClick() : console.log('no')}
                text="Get Now"
                customClass="px-4 py-3 text-sm text-center bg-gradient-to-r from-pink-500 to-purple-900"
              />
          </div>
        ),
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

 

  const paidPlans = isClient && isMobile ? mobilePlans : plans;

  return (
    <div className="flex flex-col rounded-2xl p-4 md:p-6 lg:p-8 justify-center items-center">
      <div className="overflow-x-auto">
        {!isPaidUser ? <table className="min-w-full divide-y divide-lightGray border-gray-500 border-spacing-x-4 border-separate ">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-2xl font-medium  ">
                Key Feature
              </th>
             
            </tr>
          </thead>
          <tbody className=" divide-y divide-lightGray">
            {allFeatures.map((feature, index) => (
              <tr key={index}>
                <td
                  className={`px-4 py-3 font-normalFont flex ${
                    feature == "button" ? "justify-end" : "justify-start"
                  } text-lg  text-darkGray`}
                >
                  {feature == "button" ? (
                    <Image
                      className={"justify-end"}
                      src={"/man.png"}
                      width={400}
                      height={300}
                      alt="apple"
                    />
                  ) : (
                    feature
                  )}
                </td>
                {paidPlans.map((plan, planIndex) => {
                  return (
                    <td
                      key={planIndex}
                      className={`text-3xl  ${
                        index === 0 ? "border-t-2 rounded-t-lg" : ""
                      }  ${
                        typeof plan.features[feature] === "string"
                          ? ""
                          : "border-b-2 rounded-b-lg"
                      } text-lg border-l-2 border-r-2  border-black ${
                        typeof plan.features[feature] === "string"
                          ? "text-center py-3"
                          : ""
                      } flex-wrap w-[300px] ${ typeof plan.features[feature] === "string" ?"" :"bg-[#FFF2CD]"}`}
                    >
                      {plan.features[feature]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>: <></>}
      </div>

      {/* Horizontal Scrollable Offers Section */}
      {/* <div className="mt-6 overflow-x-auto max-w-[90vw] sm:max-w-[800px] mb-20">
        <div className="flex flex-row overflow-auto gap-4 no-scrollbar">
          {offers.length > 0 &&
            offers.map((offer: OfferCardProps) =>
              offer.offer_type === "code" ? (
                <div key={offer._id} className="min-w-[400px]">
                  <OfferCard
                    cardType="small"
                    buttonText={offer.buttonText}
                    imageUrl={offer.imageUrl}
                    description={offer.description}
                    couponCode={offer.couponCode}
                    discount={offer.discount}
                    imageAlt={offer.imageAlt}
                    title={offer.title}
                    offer_type={offer.offer_type}
                    website={offer.website}
                  />{" "}
                </div>
              ) : null
            )}
        </div>
      </div> */}

      {/* Subscription Button (if user is not paid) */}
      {/* {!isPaidUser && (
        <Btn
          color="black"
          onClick={props.onSubscribeClick}
          textColor="white"
          isFullWidth={isMobile ? true : false}
          customClass="px-4 py-3 text-sm text-center bg-gradient-to-r from-pink-500 to-purple-900"
          text="Subscribe Now"
        />
      )} */}
    </div>
  );
};

export default PricingTable;
