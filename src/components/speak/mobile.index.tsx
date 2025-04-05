"use client";

import MaxWidthWrapper from "@/components/maxWidthWrapper";
import SarathisCard from "@/components/meetSarathis/sarathisCard";
import HelpCard from "@/components/sukoonAssistants/helpCard";
import { useSaarthiListApiQuery } from "@/store/api/saarthiListApi";
import { useAppSelector } from "@/store/store";
import { SocketCallExpertData, StatusJSON } from "@/utils/socketTypes";
import React, { useMemo, useState } from "react";
import BecomeSarathiBtn from "@/app/become-saarthi/becomeSarathiBtn";
import PersonCard from "../PersonLoader";
import LazyLoad from "../lazyLoad";
import { useSearchParams } from "next/navigation";
import Image from "next/legacy/image";
import PromptsModal from "../promptsModal";
import SpeakFlowModal from "../speakFlowModal";
import { trackEvent } from "@/context/Amplitude/AmplitudeInit";
import { handleWaClick } from "../whatsAppLink/WhatsAppLink";
import Btn from "../button";
import Link from "next/link";
type singleCategories = "counseller" | "finance" | "law";
interface SpeakProps {
  isGame?: boolean;
  type?: "gk" | "entertainment" | "culture";
  isExpert?: boolean;
  category?: singleCategories[];
}

const MobileSpeak = (props: SpeakProps) => {
  const searchNavigation = useSearchParams();
  const isCategoryExpoert =
    searchNavigation.get("category") === "expert" ? true : false;
  const { data: saarthiListData, isLoading } = useSaarthiListApiQuery("aa");
  const [isSarathiToggle, setIsSarathiToggle] = useState<boolean>(
    isCategoryExpoert || props.isExpert ? false : true
  );
  const [promptsModal, setPromptsModal] = useState(false);
  const [flowModal, setFlowModal] = useState(false);
  const { isGame, type, category = [] } = props;
  const userInfo = useAppSelector((state) => state.authUserReducer.data);

  const sortedList = useMemo(() => {
    const onlineArr =
      saarthiListData?.filter((e) => !e.isBusy && e.status === "online") || [];
    const isBusyArr = saarthiListData?.filter((e) => e.isBusy) || [];
    const busyArr =
      saarthiListData?.filter((e) => !e.isBusy && e.status === "busy") || [];
    const offlineArr =
      saarthiListData?.filter((e) => !e.isBusy && e.status === "offline") || [];

    const selected = isSarathiToggle ? "saarthi" : "expert";
    if (isGame) {
      return [...onlineArr, ...isBusyArr, ...busyArr, ...offlineArr].filter(
        (ele) =>
          ele.isGamesPlay === true &&
          ele?.isBusy === false &&
          ele.active === true &&
          ele.status == "online"
      );
    }

    let sarathiLists: any = [
      ...onlineArr,
      ...isBusyArr,
      ...busyArr,
      ...offlineArr,
    ]?.filter((e) => e?.type === selected);
    if (category && category.length > 0) {
      // console.log(category,"DEBUG",sarathiLists)
      let list = sarathiLists.filter((e: any) => category.includes(e.topics));
      return list.length > 0 ? list : sarathiLists;
    }
    return sarathiLists;
  }, [isSarathiToggle, saarthiListData]);

  const appSelector = useAppSelector((state) => state?.authUserReducer?.data);

  return (
    <React.Suspense fallback={<>Loading</>}>
       
      <MaxWidthWrapper>
        {!isGame && (
          <div className="flex flex-col justify-center items-center shadow-2xl">
            <div className=" bottom-0 w-full border-[0.5px] border-black p-3 pb-5 justify-center overflow-hidden flex items-center gap-5 fixed z-40 ">
              <span
                className="speak-toggle font-boldFont p-2 rounded-full bg-blue"
                onClick={() => {
                  trackEvent("speak-with-experts-clicked");
                  handleWaClick(
                    appSelector,
                    `Hello, I would like to ${
                      isSarathiToggle
                        ? "connect with a Sukoon Sarathi"
                        : "avail the free expert session"
                    }.`
                  );
                }}
              >
                {isSarathiToggle
                  ? "Free conversations with Sarathis"
                  : "Try Free Consultation"}
              </span>
            </div>
          </div>
        )}

        {!isGame && (
          <div>
            {isSarathiToggle ? (
              <span className="p-4 font-normalFont flex items-center text-center">
                Start a conversation with any Sukoon Sarathi today, discover the
                joy of genuine connection and the comfort of being understood.
              </span>
            ) : (
              <span className="p-4 font-normalFont flex items-center text-center">
                Sukoon Experts are chosen for their deep knowledge and certified
                experience
              </span>
            )}
            <div className="flex justify-center my-4 items-center md:gap-10 gap-5">
              <button
                className="p-1 px-2 font-normalFont border-2 border-primaryYellow rounded-full hover:bg-primaryYellow hover:text-black hover:border-primaryYellow"
                onClick={() => setFlowModal(true)}
              >
                How does this work?
              </button>
              {isSarathiToggle == true && (
                <button
                  className="p-1 px-2 font-normalFont border-2 border-primaryYellow rounded-full hover:bg-primaryYellow hover:text-black hover:border-primaryYellow"
                  onClick={() => setPromptsModal(true)}
                >
                  What can I talk about?
                </button>
              )}
            </div>
          </div>
        )}

        {isLoading ? (
          <div
            className={`flex flex-col items-center justify-center`}
          >
            {/* {[1, 2, 3, 4, 5].map(e => <PersonCard key={`card-key-${e}`} />)} */}
          </div>
        ) : (
          <LazyLoad>
            <div
              className={`flex flex-col flex-wrap items-center justify-center`}
            >
              {!isGame &&
                sortedList?.map((saarthi: any, index: any) => (
                  <>
                    <div key={`main-div-${index}`} id={`${index}`}>
                      <SarathisCard
                        key={`sarathi-card-${index}`}
                        name={saarthi.name}
                        image={saarthi.profile}
                        saarthiId={saarthi?._id}
                        isBusy={saarthi?.isBusy}
                        ///@ts-ignore
                        highlights={saarthi?.highlights || []}
                        languages={saarthi?.languages || []}
                        sarthiStatus={saarthi?.status}
                        score={saarthi?.score || 0}
                        displayScore={saarthi.displayScore || 0}
                        bgColor="white"
                        detailedDetail={saarthi.description}
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
                    {/* {sortedList.length - 1 === index && <HelpCard key={`help-card-${index}`} />} */}
                  </>
                ))}
              {isGame && sortedList.length <= 0 ? (
                <div className="flex flex-col items-center justify-start align-middle h-1/2">
                  <Image
                    src={"/hourglass.png"}
                    width={100}
                    height={100}
                    className="m-24"
                    alt="Please wait"
                  />
                  <h1 className="text-2xl mb-16">
                    No sarathis are available at the moment, Please try after
                    sometime.
                  </h1>
                </div>
              ) : (
                isGame &&
                sortedList?.map(
                  (saarthi: any, index: any) =>
                    saarthi.status === "online" && (
                      <>
                        <div key={`main-div-game-${index}`}>
                          <SarathisCard
                            key={`sarathi-card-game-${index}`}
                            name={saarthi.name}
                            gameType={type}
                            image={saarthi.profile}
                            displayScore={saarthi.displayScore || saarthi.score}
                            saarthiId={saarthi?._id}
                            isBusy={saarthi?.isBusy}
                            isGame={true}
                            //@ts-ignore
                            highlights={saarthi?.highlights || []}
                            languages={saarthi?.languages || []}
                            sarthiStatus={saarthi?.status}
                            score={saarthi?.score || 0}
                            bgColor="white"
                            detailedDetail={saarthi.description}
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
                      </>
                    )
                )
              )}
            </div>
          </LazyLoad>
        )}
        {!isGame && (
          <div className="flex justify-center items-center mb-10">
            {!isSarathiToggle ? (
              <Link href={"/events"}>
                <Btn
                  size="large"
                  text="Explore Events"
                  color="primaryYellow"
                  customClass="text-xl"
                />
              </Link>
            ) : (
              <BecomeSarathiBtn />
            )}
          </div>
        )}
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
      </MaxWidthWrapper>
    </React.Suspense>
  );
};

export default MobileSpeak;
