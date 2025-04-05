"use client";

import React, { FC, useCallback, useEffect, useState } from "react";
import EventsCard from "@/components/sukoonEvents/EventsCard";
import { ArrowDropDownOutlined } from "@mui/icons-material";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { getAllUpcomingEvents } from "@/utils/axiosHelper";
import { Assistance } from "@/components/assistance/Assistance";
import BecomeHostBtn from "../become-host/becomeHostBtn";
import { Dropdown } from "antd";
import useDeviceType from "@/hooks/useDeviceType";
import CustomDropdown from "@/components/dropdown/dropdown";

const eventCats = [
  // {
  //   key: "active_together",
  //   title: "Active Together",
  //   description: "Join our Fitness Adventure for Seniors! Set personal goals, stay active, and celebrate your progress with a supportive community...",
  // },
  {
    key: "support_groups",
    title: "Support Groups",
    description:
      "Weekly support groups, led by caring community members who are trained counselors, create a warm and welcoming space for sharing experiences and healing together.",
  },
  {
    key: "wellness_connect",
    title: "Fun & Learning Events",
    description:
      "Discover a wide range of events hosted by community members and guest speakers, focused on learning something new and having fun together.",
  },
];

const EventsPage: FC<any> = ({ selectedCategory }) => {
  const device = useDeviceType();
  const { isMobile, isTablet } = device;
  const [listEvent, setListOfEvents] = useState<any[]>([]);
  const [selectedCat, setSelectedCat] = useState<any>({
    key: selectedCategory || "all",
    title: "All",
  });

  const fetchEvents = useCallback(() => {
    getAllUpcomingEvents({ fromToday: true }).then((res: any) => {
      if (res?.data) {
        setListOfEvents(res?.data?.data);
      }
    });
  }, []);

  useEffect(() => {
    if (listEvent.length === 0) fetchEvents();
  }, [listEvent, fetchEvents]);

  const renderEvents = (catKey: string) => {
    return (
      <div
        key={"event-list"}
        className={`flex flex-wrap gap-10 justify-center mb-8 p-2`}
      >
        {listEvent
          .filter((event) => catKey === "all" || event.category === catKey)
          .sort(
            (a, b) =>
              new Date(a.validUpto).getTime() - new Date(b.validUpto).getTime()
          ) // Use getTime() for date comparison
          .map((event, index) => (
            <EventsCard
              key={index}
              title={event?.mainTitle}
              {...event}
              img={event?.imageUrl}
              date={event?.validUpto}
              repeat={event?.repeat}
              description={event?.subTitle}
              sarathiName={event?.name}
              meetingLink={event?.meetingLink}
              hostedBy={event?.hostedBy}
              isPremiumUserOnly={event?.isPremiumUserOnly}
              isUpcoming={true}
              slug={event?.slug}
            />
          ))}
      </div>
    );
  };

  return (
    <MaxWidthWrapper>
      {!isMobile && (
        <div className="flex flex-col justify-center items-center w-full pt-8">
          <h1 className="section-title font-lightFont">
            <span className="font-lightFont">Engage with</span>{" "}
            <span className="italic font-heavyFont">Sukoon</span>
          </h1>
          <p className="text-base font-normalFont text-gray-600 text-center px-10">
            Connect, laugh, and grow together at Sukoon Meet-ups! Enjoy fun
            activities, daily events, and the warmth of a supportive community
          </p>
        </div>
      )}
      {eventCats
        .filter(
          (cat) => selectedCat.key === "all" || cat.key === selectedCat.key
        )
        .map((cat, index) => {
          let eventsLength = listEvent
            .filter((event) => cat.key === "all" || event.category === cat.key)
            .sort(
              (a, b) =>
                new Date(a.validUpto).getTime() -
                new Date(b.validUpto).getTime()
            ).length;
          return (
            <div
              key={index}
              className="mb-5 flex flex-col items-center justify-center my-4 pt-4"
            >
              <div className="flex w-full justify-between items-center pl-5">
                {eventsLength > 0 ? (
                  <h1 className="text-2xl md:text-3xl">{cat.title}</h1>
                ) : (
                  <></>
                )}
                {index === 0 && (
                  <div className="flex px-5">
                    <CustomDropdown
                      selectedCat={selectedCat}
                      setSelectedCat={setSelectedCat}
                      options={eventCats}
                    />
                  </div>
                )}
              </div>
              <p className="text-lg font-normalFont text-gray-600 px-5 mb-4">
                {eventsLength > 0 ? cat.description : ""}
              </p>
              {renderEvents(cat.key)}
            </div>
          );
        })}
      <div className="flex w-full items-center justify-center mb-5">
        <BecomeHostBtn />
      </div>
      <div className="relative">
        <Assistance />
      </div>
    </MaxWidthWrapper>
  );
};

export default EventsPage;
