import React, { useCallback, useEffect, useState } from "react";
import EventsCard from "./EventsCard";
import MaxWidthWrapper from "../maxWidthWrapper";
import { getAllUpcomingEvents } from "@/utils/axiosHelper";
import ChallengesCard from "./ChallengesCard";
import Link from "next/link";

const SukoonEvents = () => {
  const [listEvent, setListOfEvents] = useState<any[]>([]);
  const fetchEvents = useCallback(() => {
    getAllUpcomingEvents({isHomePage:true}).then((res: any) => {
      if (res?.data) setListOfEvents(res?.data?.data);
    });
  }, [listEvent]);
  useEffect(() => {
    if (listEvent.length === 0) fetchEvents();
  }, [listEvent]);
  return (
    <div className="py-8" id="events">
      <MaxWidthWrapper>
        {/* <h1 className="text-2xl md:text-5xl text-center font-heavyFont">
          Sukoon Community Events
        </h1>
        <div className="flex flex-col justify-center">
          <p className="text-center font-lightFont mx-auto mt-2 mb-5">
            Explore wide range of group activities that encourage sharing life experiences, learning and self-care with community.
          </p>
          {listEvent?.length > 2 && <Link href={"/events"} >
            <p className="text-center font font-bold underline">View All Events</p>
          </Link>}
        </div> */}
        <div className="p-2 pt-6 md:p-6 flex gap-2  overflow-hidden">    
          {listEvent?.map((event, index) => (
            event.eventType != 'not_event' && event.eventType !== "challenge" && <div key={`card-${index}`} className="min-w-fit sm:min-w-[365px] md:max-w-[33%]">
              <EventsCard
                key={index}
                title={event?.mainTitle}
                meetingLink={event?.meetingLink}
                {...event}
                img={event?.imageUrl}
                date={event?.validUpto}
                repeat={event?.repeat}
                description={event?.subTitle}
                sarathiName={event?.name}
                hostedBy={event?.hostedBy}
                isUpcoming={true}
                slug={event?.slug}
                isPremiumUserOnly={event?.isPremiumUserOnly}
              />
              <div className="flex  sm:hidden justify-center items-center h-10 mb-7 text-base font-normalFont ">
                  {" << Swipe for more >>"}
                </div>
            </div>
          ))}
          {listEvent?.map((event, index) => (
            event.eventType === "challenge" &&
            <div key={`card-${index}`} className="min-w-fit sm:min-w-[365px] md:max-w-[33%]">
              <ChallengesCard
                key={index}
                title={event?.mainTitle}
                img={event?.imageUrl}
                date={event?.validUpto}
                repeat={event?.repeat}
                isPremiumUserOnly={event?.isPremiumUserOnly}
                description={event?.subTitle}
                sarathiName={event?.name}
                hostedBy={event?.hostedBy}
                startEventDate={event?.startEventDate}
                maxVisitorsAllowed={event?.maxVisitorsAllowed}
                prizeMoney={event?.prizeMoney}
                slug={event?.slug}
              />
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default SukoonEvents;
