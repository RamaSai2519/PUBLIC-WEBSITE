"use client";
import React, { useMemo, useState, useId, useEffect, useCallback } from "react";
import CustomChip from "../chip";
import Btn from "../button";
import Image from "next/legacy/image";
import {
  ArrowForward,
  ArrowForwardIos,
  ArrowForwardIosOutlined,
  ArrowForwardOutlined,
  ArrowForwardSharp,
  PlayArrow,
  StarRounded,
} from "@mui/icons-material";
import appTheme from "@/theme";
import { SarathiCardProps } from "./sarathiCard.interface";
import { createGame, getCookie } from "@/utils/axiosHelper";
import { enableLoginModal } from "@/store/slices/loginModalSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CustomModal from "../Modal";
import ScheduleCall from "../scheduleCall";
import { v4 as uuidv4 } from "uuid";
import {
  setCallDialog,
  setSelectedSaarthi,
} from "@/store/slices/selectedSarathi";
import ConfirmCall from "../partialViews/Call";
import { useLazyGetUserStatsQuery } from "@/store/api/loginApi";
import { usePremium } from "@/context/PremiumContext";
import LoadingComponent from "../loadingComponent/LoadingComponent";
import { setLoading } from "@/store/slices/loadingSlice";
import { useRouter } from "next/navigation";
import { getItems } from "@/utils/indexDbUtils";
import { trackEvent } from "@/context/Amplitude/AmplitudeInit";

export const categoryMapping = [
  { key: 1, name: "Sarathi Rosy", category: "Counsellor" },
  { key: 2, name: "Sarathi Anubha", category: "Counsellor" },
  { key: 3, name: "Sarathi Sachitra", category: "Counsellor" },
  { key: 4, name: "Sarathi Chandani", category: "Counsellor" },
  { key: 5, name: "Sarathi Anuradha", category: "Counsellor" },
];

const SarathisCard: React.FC<SarathiCardProps> = (props) => {
  const {
    name,
    image,
    score,
    displayScore,
    intersts,
    languages,
    detailedDetail,
    gameType,
    highlights,
    sub_category,
    saarthiId,
    sarthiStatus,
    isBusy,
    status,
    type,
    onScheduleCallClick,
    isGame,
  } = props;

  const userType = type;
  const dispatch = useAppDispatch();
  const uniqueId = useId();
  const router = useRouter();
  const [showCall, setShowCall] = useState(false);
  const [showScheduleCall, setScheduleShowCall] = useState(false);
  const verifiedUserData = useAppSelector(
    (state: any) => state.authUserReducer.data
  );
  const userInfo = useAppSelector((state) => state.authUserReducer.data);
  const callPrompt = useAppSelector(
    (state) => state.loadingReducer.isCallPrompt
  );

  const [trigger, { data, error, isLoading }] = useLazyGetUserStatsQuery();
  const [userLoggedInStatus, setUserLoggedInStatus] = useState(false);

  const { openPremiumFeature, isOpen } = usePremium();
  const selectedSarathi = useAppSelector(
    (state) => state.selectedSarathi.selectedSaarthi
  );
  const callDialog = useAppSelector(
    (state) => state.selectedSarathi.callDialog
  );

  const checkForLoginAndCall = async (type: "schedule" | "now") => {
    //@ts-ignore
    const numberOfCalls = data?.output_details?.numberOfCalls;
    trackEvent("sarathi-card-call-btn-clicked", { type: type });
    dispatch(setSelectedSaarthi(props));
    const getUserToken = await getItems();
    //@ts-ignore
    if (!getUserToken?.phoneNumber) {
      dispatch(
        enableLoginModal({
          showLoginModal: type,
        })
      );
      return;
    } else if (userType == "expert" && userInfo?.isPaidUser != true) {
      openPremiumFeature();
      return;
    } else if (type == "schedule") {
      setScheduleShowCall(true);
      if (numberOfCalls > 0) {
        dispatch(setCallDialog("schedule"));
      } else {
        openPremiumFeature();
        return;
      }
    } else if (type == "now") {
      dispatch(setCallDialog("now"));
      setShowCall(true);
    } else {
      // console.log("Unknown Button clicked");
    }
  };

  const isUserLoggedIn = useCallback(async () => {
    if (verifiedUserData?._id) {
      trigger(verifiedUserData?._id);
      setUserLoggedInStatus(true);
    } else {
      setUserLoggedInStatus(false);
    }
  }, [verifiedUserData?._id]);

  useEffect(() => {
    isUserLoggedIn();
  }, [isUserLoggedIn, userLoggedInStatus]);

  const [isReadMoreEnabled, setIsReadMoreEnabled] = useState(false);

  const newStatus = useMemo(() => {
    return status === "offline"
      ? {
          label: "Offline",
          color: "bg-red-500",
          btnPostLogin: "Sarathi on Break",
          btnBeforeLogin: "Speak Now",
        }
      : isBusy
      ? {
          label: "Busy",
          color: "bg-gray-500",
          btnPostLogin: "Sarathi Busy",
          btnBeforeLogin: "Speak Now",
        }
      : {
          label: "Online",
          color: "bg-green",
          btnPostLogin: "Speak Now",
          btnBeforeLogin: "Speak Now",
        };
  }, [isBusy, status]);

  const handleCardClick = async (
    gameType: "gk" | "entertainment" | "culture" = "gk"
  ) => {
    if (isGame && verifiedUserData?.name) {
      dispatch(setLoading(true));
      const uniqueUuid = uuidv4().toString();
      if (saarthiId && verifiedUserData) {
        const gameData = await createGame(
          saarthiId,
          verifiedUserData?.name?.split(" ")[0],
          verifiedUserData?._id,
          gameType,
          uniqueUuid,
          ""
        ).catch((err) => {
          dispatch(setLoading(false));
          alert("Something Went Wrong");
        });
        if (gameData) {
          let gameLink = gameData.gameLink?.replace(
            "type=sarathi",
            "type=user"
          );
          dispatch(setLoading(false));
          router.push(gameLink);
        }
      }
    }
    if (!verifiedUserData?.name) {
      dispatch(
        enableLoginModal({
          showLoginModal: "now",
        })
      );
      return;
    }
  };

  return (
    <>
      <LoadingComponent />
      <div
        key={`${name}-${uniqueId}`}
        className={`w-[90vw] sm:w-[70vw] md:w-[42vw] lg:w-[28vw] xl:w-[100%] mb-2 pb-0 border-black bg-bgColor border-2 border-b-4 border-r-4 rounded-3xl shadow-xl h-[550px] flex flex-col justify-between ${
          isGame && "cursor-pointer"
        }`}
        onClick={() => handleCardClick(gameType)}
      >
        {/* Image Section */}
        <div key={`${image}-${uniqueId}`} className="relative h-1/2 w-full">
          {image && (
            <div className="relative w-full h-full">
              <Image
                key={`${image}-${uniqueId}-${status}`}
                src={image}
                alt={`sukoon unlimited | ${name} is ${status}`}
                layout="fill"
                style={{ objectFit: "scale-down" }}
                className="rounded-t-3xl"
              />
            </div>
          )}
          {userLoggedInStatus && (
            <span
              key={uuidv4()}
              className="absolute -right-0 top-0 bottom-0  m-2"
            >
              <div key={uuidv4()}>
                <p
                  className={`${newStatus.color} border rounded-md text-white font-lightFont p-1 text-sm`}
                >
                  {newStatus.label}
                </p>
              </div>
            </span>
          )}
        </div>

        {/* Content Section */}
        <div
          className="relative p-4 pt-2 flex flex-col justify-between h-[50%]"
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <h5 className="font-heavyFont text-2xl leading-tight truncate">
                {name}
              </h5>
              <span className="flex items-center gap-1 text-sm text-black font-bold">
                <StarRounded
                  sx={{ color: appTheme.colors.primaryYellow }}
                  className="h-4 w-4"
                />
                {(parseFloat(displayScore?.toString() || "4.8") * 2).toFixed(1) || "9.8"}
              </span>
            </div>
            <p className="font-normalFont text-base text-black truncate">
              {languages}
            </p>
          </div>

          <div className="flex flex-wrap gap-1 overflow-hidden mt-2">
            {highlights?.slice(0, 3).map((item, index) => (
              <p
                key={`highlight-${name}-${index}`}
                className="bg-gray-100 p-1 rounded-lg text-sm font-boldFont truncate"
              >
                {item.text}
              </p>
            ))}
          </div>

          {!isGame && (
            <div className="mt-2 overflow-hidden">
              <p className="font-normalFont text-base line-clamp-2">
                {detailedDetail}
              </p>
              <p
                className="text-right cursor-pointer font-heavyFont underline text-base"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsReadMoreEnabled(true);
                }}
              >
                Read More
              </p>
            </div>
          )}

          {!isGame && (
            <div className="mt-2" onClick={(e) => e.stopPropagation()}>
              <Btn
                isRounded
                text={userLoggedInStatus ? newStatus.btnPostLogin : newStatus.btnBeforeLogin}
                color={
                  !userLoggedInStatus
                    ? "primaryYellow"
                    : status === "online"
                      ? "primaryYellow"
                      : "lightGray"
                }
                isFullWidth
                endIcon={<PlayArrow fontSize={"small"} />}
                onClick={() => {
                  if (status !== "offline") checkForLoginAndCall("now");
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isReadMoreEnabled && (
        <CustomModal
          key={uuidv4()}
          bgColor="white"
          titleColor="green"
          open={isReadMoreEnabled}
          onClose={() => setIsReadMoreEnabled(false)}
          fullScreen={false}
        >
          <div className="p-4 sm:p-5 md:p-8 lg:p-10" key={uuidv4()}>
            <div className="flex items-center gap-4 mb-6" key={uuidv4()}>
              <div
                className="relative size-16 h-14 border-2 border-primaryYellow rounded-full overflow-hidden"
                key={uuidv4()}
              >
                <Image
                  layout="fill"
                  key={uuidv4()}
                  src={image || ""}
                  alt={`${name}-alt`}
                  className="object-cover object-top"
                />
              </div>
              <p key={uuidv4()} className="text-xl">
                {name}
              </p>
            </div>
            <p key={uuidv4()} className="font-normalFont">
              {detailedDetail}
            </p>
          </div>
        </CustomModal>
      )}

      {showScheduleCall && (
        <CustomModal
          key={`Sarthi-clciked scheduleed ${selectedSarathi?.name || ""}`}
          bgColor="white"
          titleColor="green"
          open={callDialog === "schedule"}
          onClose={() => dispatch(setCallDialog(null))}
          fullScreen={false}
        >
          <ScheduleCall
            key={`Sarthi-scheduled-clciked scheduleed ${
              selectedSarathi?.name || ""
            }`}
            onClose={() => dispatch(setCallDialog(null))}
          />
        </CustomModal>
      )}

      {showCall && (
        <CustomModal
          key={`Sarthi-clciked ${selectedSarathi?.name || ""}`}
          name={`Sarthi-clciked ${selectedSarathi?.name || ""}`}
          open={callDialog === "now"}
          onClose={() => dispatch(setCallDialog(null))}
          modalTitle=""
          bgColor="white"
          fullScreen={false}
        >
          <ConfirmCall
            key={`Sarthi-confirm-clciked ${selectedSarathi?.name || ""}`}
          />
        </CustomModal>
      )}
    </>
  );
};

export default SarathisCard;
