import React, { useEffect } from "react";
import { EventsCardTypes } from "./eventsCard.interface";
import Image from "next/legacy/image";
import { format } from "date-fns";
import Btn from "../button";
import { useAppSelector } from "@/store/store";
// import { useCelebrateModal } from "@/context/CelebrateContext";
import { usePremium } from "@/context/PremiumContext";
import { createEventByUserId } from "@/utils/axiosHelper";
import { useDispatch } from "react-redux";
import { enableLoginModal } from "@/store/slices/loginModalSlice";
import { PREMIUM_TEXT } from "@/utils/helpers";
import { trackEvent } from "@/context/Amplitude/AmplitudeInit";
import { getItems } from "@/utils/indexDbUtils";
import LoadingComponent from "../loadingComponent/LoadingComponent";
import { setLoading } from "@/store/slices/loadingSlice";
import { useLazyStatsApiQuery } from "@/store/api/statsApi";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";


import { useRouter } from "next/navigation";
import { checkEligibility } from "@/utils/paymentUtils";
const EventsCard: React.FC<EventsCardTypes> = (props) => {

  const {
    date,
    description,
    img,
    sarathiName,
    meetingLink,
    title,
    slug,
    repeat,
    hostedBy,
    isPremiumUserOnly = false,
  } = props;

  const [trigger, { data: userStatsData }] =
    useLazyStatsApiQuery();
  const userDetailsSelector = useAppSelector(
    (data) => data.authUserReducer.data
  );
  const dispatcher = useDispatch();
   const navigation = useRouter()
  const { openPremiumFeature, isOpen } = usePremium();
  // const { showCelebrateModal } = useCelebrateModal();

  useEffect(() => {
    if (userDetailsSelector?.phoneNumber) {
      trigger(userDetailsSelector?.phoneNumber);
    }
  }, [userDetailsSelector?.phoneNumber]);
  const registerUser = async () => {
    trackEvent("event-card-clicked", { userDetailsSelector });
    if (!userDetailsSelector?._id) {
      dispatcher(
        enableLoginModal({
          showLoginModal: true,
          isPaid: isPremiumUserOnly,
          modalDescription: isPremiumUserOnly ? PREMIUM_TEXT : "",
        })
      );
      return;
    }

    // if ( isPremiumUserOnly) {
    //   let token = await checkEligibility(userDetailsSelector?._id, "perform", "paid_events" );
    //   console.log(token,"qwertyu");
    //   // navigation.push(`/${slug}`)
    //   openPremiumFeature();
    //   return;
    // }
    const getPhoneNumber: any = await getItems();
    if (userDetailsSelector?._id && slug && getPhoneNumber?.phoneNumber) {
      dispatcher(setLoading(true));
      let token = await checkEligibility(userDetailsSelector?._id, "perform", isPremiumUserOnly ? "paid_events" : "free_events").catch(e => {

        navigation.push(`/${slug}`)
        // openPremiumFeature();
        return
      });

      createEventByUserId({
        eventName: title,
        slug: slug || "",
        token: token,
        userId: userDetailsSelector?._id,
        phoneNumber: getPhoneNumber?.phoneNumber,
      })
        .then(() => {
          dispatcher(setLoading(false));

          // showCelebrateModal(`🎉 Congrats! You Are registered for ${title} 🎉`, celebrate);
          userDetailsSelector?._id &&
            trigger(userDetailsSelector?.phoneNumber).unwrap();
          trackEvent('event-registered', { userDetailsSelector });
        })
        .catch(() => {
          dispatcher(setLoading(false));
          // console.log(e)
        });
    }

  };

  let isRegisterdForEvent = false;
  if (
    userStatsData?.output_details.events &&
    userStatsData?.output_details.events?.length > 0
  ) {
    isRegisterdForEvent =
      userStatsData?.output_details.events.findIndex(
        (e) => e.mainTitle === title
      ) != -1
        ? true
        : false;
  }


  const isEventStartingSoon =
    date && new Date().getTime() >= new Date(date).getTime() - 30 * 60 * 1000;

  return (
    <div className="relative mb-1 flex flex-col justify-between bg-[#FFFCF4] h-[415px]  w-[90vw] sm:w-[70vw] md:w-[42vw] lg:w-[22vw] xl:w-[25vw]  2xl:w-[18vw] border border-black border-b-4 border-t-3 border-r-4 rounded-3xl">
      <LoadingComponent />
      {
        <>
          {
            <span className={`absolute text-sm top-5 z-10 right-4 ${isPremiumUserOnly ? 'bg-goldLight text-goldFont' : 'bg-lightGreen text-green'}  rounded-full px-3 py-1`}>
              {isPremiumUserOnly ? "Paid" : "Free"}
            </span>
          }
          <div className="gap-2">
            <div className="  rounded-xl overflow-hidden">
              <div className="relative w-full h-40">
                <img
                  src={img}
                 
                  width={"100%"}
                  // height={200}
                  alt={`${title}-img`}
                  className="object-cover object-top rounded-t-3xl"
                />
              </div>
            </div>
            <div className="px-3">
              <Tooltip title={title} color="black" trigger={"click"}>
                <h5 className="font-boldFont text-[18px] mt-3 line-clamp-1">{title}</h5>
              </Tooltip>
              <p className="mt-1">
                <span className="font-lightFont text-darkGray">Hosted by </span>{" "}
                <span className="font-normalFont capitalize text-lavender">
                  {hostedBy || sarathiName}
                </span>
              </p>
              {date && (
                <div className="text-darkGray justify-start flex [&>*]:flex [&>*]:gap-2 [&>*]:items-center gap-8 my-1">
                  <div>
                    <CalendarOutlined />
                    <span className="font-lightFont">
                      {repeat == "daily"
                        ? "Daily"
                        : format(date, "dd MMM yyyy")}
                    </span>
                  </div>
                  <div>
                    <ClockCircleOutlined />
                    <span className="font-lightFont">
                      {format(date, "hh:mm a")}
                    </span>
                  </div>
                </div>
              )}
              <Tooltip title={description} color="black">
                <p className="font-lightFont mb-4 line-clamp-3">
                  {description}
                </p>
              </Tooltip>
            </div>
            <div className="p-2">
              <Btn
                isDisabled={isRegisterdForEvent && !isEventStartingSoon}
                text={
                  isEventStartingSoon && isRegisterdForEvent
                    ? "Join Now"
                    : isRegisterdForEvent
                      ? "Registered"
                      : "Register Now"
                }
                size="small"
                
                onClick={() => {
                  if (isEventStartingSoon && isRegisterdForEvent) {
                    // Open the meeting link in a new tab
                    window.open(meetingLink, "_blank");
                  } else {
                    registerUser();
                  }
                }}
                isFullWidth
                textColor={isEventStartingSoon && isRegisterdForEvent ? "white" : "black"}
                color={isEventStartingSoon && isRegisterdForEvent ? "greenMainColor" : "primaryYellow"}
              />
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default EventsCard;
