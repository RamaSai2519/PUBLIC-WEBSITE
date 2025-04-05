"use client";

import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material";
import { SocketCallExpertData, StatusJSON } from "@/utils/socketTypes";
import { useSaarthiListApiQuery } from "@/store/api/saarthiListApi";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import HelpCard from "../sukoonAssistants/helpCard";
import { useAppSelector } from "@/store/store";
import SarathisCard from "./sarathisCard";
import Modal from "antd/es/modal/Modal";
import CustomModal from "../Modal";
import PromptsModal from "../promptsModal";
import { Button } from "antd";
import SpeakFlowModal from "../speakFlowModal";
import { set } from "date-fns";

interface Sarathi {
  type?: 'saarthi' | 'expert' | 'talk';
}
const MeetSarathis = (props:Sarathi) => {
  const { data: saarthiListData } = useSaarthiListApiQuery("aa");
  const [flowModal, setFlowModal] = useState(false);
  const[typed,setTyped] = useState(props.type);
  const [promptsModal, setPromptsModal] = useState(false);
  useEffect(() => {
      setTyped(props.type)
   
  }, [props]);
  const arrowStyles = {
    width: 22,
    Height: 22,
    md: {
      width: 30,
      Height: 30,
    },
    color: "white",
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const userInfo = useAppSelector((state) => state.authUserReducer.data);

  const scrollVal = 350;

  const scrollRight = useCallback(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollLeft += scrollVal;
    }
  }, [scrollRef]);

  const scrollLeft = useCallback(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollLeft -= scrollVal;
    }
  }, [scrollRef]);
  const sortedList = useMemo(() => {
    const onlineArr =
      saarthiListData?.filter((e) => !e.isBusy && e.status === "online") || [];
    const isBusyArr = saarthiListData?.filter((e) => e.isBusy) || [];
    const busyArr =
      saarthiListData?.filter((e) => !e.isBusy && e.status === "busy") || [];
    const offlineArr =
      saarthiListData?.filter((e) => !e.isBusy && e.status === "offline") || [];

    if(typed=='talk'){
      return [...onlineArr, ...isBusyArr, ...busyArr, ...offlineArr];
    } 
    return [...onlineArr, ...isBusyArr, ...busyArr, ...offlineArr].filter(e=>e.type ==typed);
  }, [saarthiListData,props.type]);

  return (
    sortedList.length > 0 ? <div className="mt-2">
      {/* <div className="md:flex grid justify-center items-center md:gap-10 gap-5 mb-2">
        <button
          className="p-1 px-2 font-normalFont border-2 border-primaryYellow rounded-full hover:bg-primaryYellow hover:text-black hover:border-primaryYellow"
          onClick={() => setFlowModal(true)}
        >
          How does this work?
        </button>
        <button
          className="p-1 px-2 font-normalFont border-2 border-primaryYellow rounded-full hover:bg-primaryYellow hover:text-black hover:border-primaryYellow"
          onClick={() => setPromptsModal(true)}
        >
          What can I talk about?
        </button>
      </div> */}
      <div className="relative flex bg-transparent justify-center items-center">
        <div className="relative -ml-8 sm:-ml-16 pl-4 sm:pl-16 overflow-hidden">
          <div
            className="flex items-center justify-start w-full gap-8 sm:gap-12 snap-mandatory snap-x overflow-x-auto scroll-smooth no-scrollbar"
            ref={scrollRef}
          >
            {sortedList?.map((saarthi,index) => (
              <div
                key={saarthi?._id}
                className={`snap-center flex-shrink-0 max-w-[90%] sm:max-w-[30%] md:max-w-[20%] lg:max-w-[32%] xl:max-w-[27%] 2xl:max-w-[22%] ${index == 0 ? "ml-16" : ""}`}
              >
                
                <SarathisCard
                  displayScore={saarthi?.displayScore}
                  name={saarthi.name}
                  image={saarthi.profile}
                  saarthiId={saarthi?._id}
                  isBusy={saarthi?.isBusy}
                  //@ts-ignore
                  highlights={saarthi?.highlights || []}
                  intersts={
                    saarthi?.categories?.map((category) => category?.name || "") || []
                  }
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
                      ? saarthi.status === "online"
                        ? true
                        : false
                      : true
                  }
                />
                 <div className="flex sm:hidden justify-center items-center h-10 mb-7 text-base font-normalFont ">
                  {" << Swipe for more >>"}
                </div>
              </div>
            ))}
            
            <div className="snap-center flex-shrink-0 max-w-[90%] sm:max-w-[30%] md:max-w-[20%] lg:max-w-[15%]">
              <HelpCard />
            </div>
          </div>
        </div>


        <div className="hidden bg-transparent sm:flex absolute top-0 bottom-0 left-2 z-50 justify-center items-center">
          <span
            onClick={scrollLeft}
            className="cursor-pointer slider-icon-wrapper [&>svg]:hover:-translate-x-1 z-50 p-2"
          >
            <ArrowBackRounded
              sx={arrowStyles}
              className="transition-transform text-black"
            />
          </span>
        </div>

        <div className="hidden sm:flex absolute top-0 bottom-0 right-2 z-50 justify-center items-center">
          <span
            onClick={scrollRight}
            className="cursor-pointer slider-icon-wrapper [&>svg]:hover:translate-x-1 z-50 p-2"
          >
            <ArrowForwardRounded
              sx={arrowStyles}
              className="transition-transform text-black"
            />
          </span>
        </div>
      </div>

      {flowModal && (
        <SpeakFlowModal
          setIsModalVisible={setFlowModal}
          isModalVisible={flowModal}
        />
      )}
      {promptsModal && (
        <PromptsModal
          setIsModalVisible={setPromptsModal}
          isModalVisible={promptsModal}
        />
      )}
    </div> : <div className="flex justify-center items-center h-[80vh]">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl">Please Wait...</h1>
       
      </div>
      </div>
  );
};

export default MeetSarathis;
