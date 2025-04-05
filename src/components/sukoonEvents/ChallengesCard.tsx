import React, { useEffect } from "react";
import Btn from "../button";
import Image from "next/legacy/image";
import { format } from "date-fns";
import { ChallengesCardTypes } from "./eventsCard.interface";
import { AccessTimeRounded, CalendarMonthRounded, Group } from "@mui/icons-material";
import { useAppSelector } from "@/store/store";
import { PremiumProvider, usePremium } from "@/context/PremiumContext";
import { createEventByUserId } from "@/utils/axiosHelper";
// import { useCelebrateModal } from "@/context/CelebrateContext";
import celebrate from '../../../public/animation/celebrate.json'
import { useLazyGetUserStatsQuery } from "@/store/api/loginApi";
import { useDispatch } from "react-redux";
import { enableLoginModal } from "@/store/slices/loginModalSlice";
import { PREMIUM_TEXT } from "@/utils/helpers";
import { getItems } from "@/utils/indexDbUtils";
import { checkEligibility } from "@/utils/paymentUtils";
const ChallengesCard: React.FC<ChallengesCardTypes> = (props) => {
    const { openPremiumFeature, isOpen } = usePremium();
    const [trigger, { data, error, isLoading }] = useLazyGetUserStatsQuery();
    const { date, description, img, slug, sarathiName, title, maxVisitorsAllowed, hostedBy, isPremiumUserOnly, startEventDate } =
        props;

    const dispatcher = useDispatch();
    const userDetailsSelector = useAppSelector(data => data.authUserReducer.data);
    const iconSize = {
        width: 20,
        height: 20,
    };

    useEffect(()=>{
        if(userDetailsSelector?._id ) {
            trigger(userDetailsSelector?._id)
        }
    },[userDetailsSelector?._id])
    // const { showCelebrateModal } = useCelebrateModal()

    const registerUser = async () => {
        if (!userDetailsSelector?._id) {
            dispatcher(enableLoginModal({
                showLoginModal: true,
                isPaid: isPremiumUserOnly,
                modalDescription: isPremiumUserOnly ? PREMIUM_TEXT : ''
            }));
            return
        }

        if (!userDetailsSelector?.isPaidUser && isPremiumUserOnly == true) {
            openPremiumFeature()
            return
        }
        const userInfoLocal:any = await getItems();
        if (userDetailsSelector?._id && slug && userInfoLocal.phoneNumber) {
            let token = await checkEligibility(userDetailsSelector?._id,'perform', isPremiumUserOnly ? "paid_events": "free_events")
            if(!token) alert('something went wrong')
          
                createEventByUserId({
                eventName: title,
                slug: slug || '',
                token: token,
                phoneNumber: userInfoLocal.phoneNumber,
                userId:userDetailsSelector._id
            }).then(res => {
                // showCelebrateModal(`🎉 Congrats! You Are registered for ${title} 🎉`, celebrate);
                userDetailsSelector?._id && trigger(userDetailsSelector?._id)

            }).catch(e => {
                // console.log(e)
                userDetailsSelector?._id && trigger(userDetailsSelector?._id)
            })
        }

    }
    let isRegisterdForEvent =data?.data?.events ? data?.data?.events?.data.findIndex(event => event?.source === slug) != -1 ? true : false : false;

    return (
        <div className="relative flex flex-col h-full bg-[#f1e4c7] rounded-xl">
            <div className="rounded-xl overflow-hidden">
                <div className="relative w-full h-60">
                    <Image
                        src={img} layout="fill"
                        alt={`${title}-img`}
                        className="object-cover object-top rounded-t-xl"
                    />
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold">{title}</h3>
                <p>
                    <span className="italic font-lightFont">Host -</span>{" "}
                    <span className="font-heavyFont capitalize">{hostedBy || sarathiName}</span>
                </p>
                {date && (
                    <div className="flex [&>*]:flex [&>*]:gap-2 [&>*]:items-center justify-between gap-8 my-4">
                        <div>
                            <CalendarMonthRounded sx={iconSize} />
                            <span className="font-lightFont">
                                {format(startEventDate, "dd")} - {format(date, "dd MMM yyyy")}
                            </span>
                        </div>
                        <div>
                            <Group sx={iconSize} />
                            <span className="font-mediumFont">Group:</span>{" "}
                            <span className="font-heavyFont">{maxVisitorsAllowed}</span>
                        </div>
                    </div>
                )}
                <p className="font-lightFont">{description}</p>
            </div>
            <div className="border-b border-neutral-300 mx-4" />
            <div className="p-4">
                <div className="flex justify-between items-center w-full">
                    <div>
                        <p>Prize pool</p>
                        <h4 className="font-bold font-heavyFont text-2xl text-green">{props.prizeMoney}₹</h4>
                    </div>

                    <Btn isDisabled={isRegisterdForEvent} text={isRegisterdForEvent ? "Registered" : "Register Now"}  onClick={() => registerUser()}  color="primaryYellow" />

                </div>
            </div>
        </div>

    );
};

export default ChallengesCard;
