"use client";

import MaxWidthWrapper from "@/components/maxWidthWrapper";
import SarathisCard from "@/components/meetSarathis/sarathisCard";
import HelpCard from "@/components/sukoonAssistants/helpCard";
import { Assistance } from "@/components/assistance/Assistance";
import { useSaarthiListApiQuery } from "@/store/api/saarthiListApi";
import { useAppSelector } from "@/store/store"; 

import React, { use, useEffect, useMemo, useState } from "react";
import BecomeSarathiBtn from "@/app/become-saarthi/becomeSarathiBtn";

import Image from "next/legacy/image";

import { ClockCircleFilled, ClockCircleOutlined } from "@ant-design/icons";
import PersonCard from "@/components/PersonLoader";
import PromptsModal from "@/components/promptsModal";
import SpeakFlowModal from "@/components/speakFlowModal";
import {
  get_data_from_firebase,
  write_data_to_firebase,
} from "@/utils/firebase";
// interface SpeakProps {
//   isGame?: boolean;
//   type?: "gk" | "entertainment" | "culture";
// }

const Speak = (props: any) => {
  const { data: saarthiListData, isLoading } = useSaarthiListApiQuery("aa");
  const [promptsModal, setPromptsModal] = useState(false);
  const [flowModal, setFlowModal] = useState(false);
  const userInfo = useAppSelector((state) => state.authUserReducer.data);
  const sortedList = useMemo(() => {
    const onlineArr =
      saarthiListData?.filter((e) => !e.isBusy && e.status === "online") || [];
    const isBusyArr = saarthiListData?.filter((e) => e.isBusy) || [];
    const busyArr =
      saarthiListData?.filter((e) => !e.isBusy && e.status === "busy") || [];
    const offlineArr =
      saarthiListData?.filter((e) => !e.isBusy && e.status === "offline") || [];

    return [...onlineArr, ...isBusyArr, ...busyArr, ...offlineArr]?.filter(
      (e) => e?.type === "expert"
    );
  }, [, saarthiListData]);

  const [coachesPageContent, setCoachesPageContent] = useState({
    mainTitle:
      " Need guidance or support? Sukoon Coaches, with 15+ years of experience, offer personalized, confidential help for senior wellness. You can talk about",
    subText: "family, relationships, children, stress etc.",
    timingText: "Available from 10am-1 pm & 4pm-7pm, all week",
  });
  useEffect(() => {
    get_data_from_firebase("coaches").then((data: any) => {
      if (data) {
        setCoachesPageContent({ ...data });
      }
    });
  }, []);

  return (
    <React.Suspense fallback={<>Loading</>}>
      <MaxWidthWrapper>
        <div className="mb-10  p-5">
          <h1 className="text-3xl">Our Coaches</h1>
          <p className="font-lightFont text-base">
            {coachesPageContent.mainTitle}
            <span className="text-lavender">{coachesPageContent.subText}</span>
          </p>
          <div className="flex flex-row">
            <p className="text-lg font-normalFont">
              <ClockCircleOutlined /> {coachesPageContent.timingText}
            </p>{" "}
            <Image src={"/uparrow.svg"} width={140} height={40} />
          </div>
        </div>
        {isLoading ? (
          <div
            className={`${`grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4`} gap-10 px-4  "mb-8`}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
              <PersonCard key={`card-key-${e}`} />
            ))}
          </div>
        ) : (
          <div
            key={props.type}
            className={`flex flex-wrap gap-10 justify-center mb-8 p-2`}
          >
            {sortedList?.map((saarthi, index) => (
              <React.Fragment key={`main-div-${index}-main`}>
                <div
                  key={`main-div-${index}`}
                  className="w-full xs:w-full sm:w-[50%] md:w-[40%] lg:w-[25%] xl:w-[25%] mb-5 gap-4"
                >
                  <SarathisCard
                    key={saarthi?.name || "sarathi" + index}
                    name={saarthi.name}
                    image={saarthi.profile}
                    saarthiId={saarthi?._id}
                    isBusy={saarthi?.isBusy}
                    languages={saarthi?.languages || []}
                    score={saarthi?.score || 0}
                    sarthiStatus={saarthi?.status}
                    displayScore={saarthi.displayScore || 0}
                    bgColor="white"
                    detailedDetail={saarthi.description}
                    //@ts-ignore
                    highlights={saarthi?.highlights || []}
                    videoUrl={saarthi?.video}
                    type={saarthi?.type}
                    status={saarthi?.status}
                    isActive={
                      userInfo?._id
                        ? saarthi.status == "online"
                          ? true
                          : false
                        : true
                    }
                  />
                </div>
                {sortedList.length - 1 === index && <HelpCard />}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="flex justify-center items-center mb-10">
          <BecomeSarathiBtn />
        </div>

        {promptsModal && (
          <PromptsModal
            setIsModalVisible={setPromptsModal}
            isModalVisible={promptsModal}
          />
        )}
        {flowModal && (
          <SpeakFlowModal
            setIsModalVisible={setFlowModal}
            isModalVisible={flowModal}
          />
        )}
        {/* <div className="relative">
          <Assistance />
        </div> */}
      </MaxWidthWrapper>
    </React.Suspense>
  );
};

export default Speak;
