/**
 * personCard component represents a custom card with a title, description, background color, and an optional image.
 *
 * @component
 * @example
 * const cardProps = {
 *   title: 'Card Title',
 *   bgColor: 'goldLight',
 *   image: 'https://example.com/image.jpg'
 * };
 *
 * return (
 *   <personCard {...cardProps} />
 * )
 *
 * @param {CardProps} props - The props object containing the card properties.
 * @param {string} props.title - The title of the card.
 * @param {string} [props.bgColor='goldLight'] - The background color of the card.
 * @param {string} [props.image] - The URL of the image to be displayed on the card.
 * @returns {React.ReactElement} The rendered personCard component.
 */

import React, { useMemo, useState, useId, useEffect } from "react";
import { Card, CardContent, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import appTheme from "@/theme";
import Image from "next/legacy/image";
import { PersonCardProps } from "./personCard.interface";
import Btn from "../button";
import CustomChip from "../chip";
import CustomModal from "../Modal";
import { getStatusColor } from "@/utils/helpers";
import StatusChip from "../status-chip";
import { useAppSelector } from "@/store/store";
import { PlayCircleOutlineOutlined } from "@mui/icons-material";
import { get } from "http";
import { getCookie } from "@/utils/axiosHelper";
import { useAppDispatch } from "@/store/hooks";
import { enableLoginModal } from "@/store/slices/loginModalSlice";
import LazyLoad from "../lazyLoad";
import RegisterAccount from "../partialViews/Register";
import SigninModal from "../Modal/signInModal";
import { getItems } from "@/utils/indexDbUtils";

const PersonCard: React.FC<PersonCardProps> = (props) => {
  const uniqueId = useId();
  const [isReadMoreEnabled, setIsReadMoreEnabled] = useState(false);
  const dispatch = useAppDispatch();
  const readMore = () => {
    setIsReadMoreEnabled(!isReadMoreEnabled);
  };

  const checkForLoginAndCall = async () => {

    const getUserToken = await getItems();
   
    //@ts-ignore
    if (!getUserToken?.phoneNumber) {
      dispatch(enableLoginModal({
        showLoginModal:true,
        isPaid:true,
        nextStep:onClick()
      }));
      return;
    }
    onClick();
  };

  const {
    name = "",
    displayScore ='-',
    bgColor = "goldLight",
    status,
    image,
    languages = [],
    intersts = [],
    aboutList = [],
    detailedDetail = "",
    isActive = false,
    videoUrl,
    score = "0",
    onClick,
    type,
    isBusy,
    onVideoClick,
    sarthiStatus,
  } = props;

  const isOffline = useMemo(
    () => status?.toLowerCase() === "offline",
    [status]
  );

  const user = useAppSelector((state) => state.authUserReducer.data);

  const [isSaarthiBusy, setIsSaarthiBusy] = useState(isBusy);

  useEffect(() => {
    setIsSaarthiBusy(isBusy);
  }, [isBusy]);

  useEffect(() => {
    if (sarthiStatus) {
      const id = sarthiStatus.expertId;
      const propId = props.saarthiId;
      const status = sarthiStatus.status;
      if (id && propId && id === propId) {
        if (status === "busy") {
          setIsSaarthiBusy(true);
        } else if (status === "online") {
          setIsSaarthiBusy(false);
        }
      }
    }
  }, [props.saarthiId, sarthiStatus]);

  const disabledCallBtn = useMemo(
    () => status?.toLowerCase() !== "online" || isSaarthiBusy,
    [isSaarthiBusy, status]
  );

  return (
    <LazyLoad>
      <Card
        key={uniqueId}
        variant="elevation"
        className="rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        style={{ backgroundColor: appTheme.colors[bgColor] }}
      >
        <CustomModal
          key={uniqueId}
          bgColor="bgColor"
          titleColor="green"
          modalTitle={name}
          open={isReadMoreEnabled}
          onClose={() => setIsReadMoreEnabled(false)}
          fullScreen={false}
        >
          {" "}
          <div key={uniqueId} className="flex flex-col container mx-auto p-2">
            {/* <div key={uniqueId} className="m-2">
               <p key={uniqueId} className="font-heavyFont text-xl">
                {name}
              </p> 
            </div> */}
            <div key={uniqueId} className="p-2">
              <div key={uniqueId} className="mt-2 mb-2 text-xl font-heavyFont">
                More about me:
              </div>
              <p key={uniqueId} className="text-gray-700 font-lightFont">{detailedDetail}</p>
            </div>
          </div>
        </CustomModal>
        <CardContent key={uniqueId} className="flex flex-col ">
          <div className="flex flex-col justify-evenly gap-5">
            <div
              key={uniqueId}
              id="sarthi-name-with-status"
              className="flex flex-row gap-2 justify-between "
            >
              <Typography key={uniqueId} className="font-heavyFont text-lg">
                {name}
              </Typography>
              {user?._id && (
                <div key={uniqueId} className="gap-2 ">
                  <div key={uniqueId} className="flex gap-1 items-center">
                    <StatusChip
                      key={uniqueId}
                      isBusy={Boolean(isSaarthiBusy)}
                      status={status as string}
                    />
                  </div>
                </div>
              )}
            </div>

            <div
              id="sarthi-image"
              key={uniqueId}
              className="flex  justify-center rounded-lg relative"
            >
              {image && (
                <div key={uniqueId} className="relative h-64 w-[300px]">
                  <Image
                    key={uniqueId}
                    src={image}
                    onClick={() =>
                      onVideoClick && videoUrl && onVideoClick(videoUrl)
                    }
                    layout="fill"
                    alt={`Our Sukoon Unlimited Sarathi ${name} Image`}
                    className="object-cover object-top"
                  />
                </div>
              )}
              {!image && (
                <Typography className="font-bold self-center">
                  {name.split("")[0]}
                </Typography>
              )}

              {/* {videoUrl && (
                <span className="absolute bottom-0 right-1">
                  <IconButton
                  className="animate-pulse"
                    onClick={() => onVideoClick && onVideoClick(videoUrl)}
                  >
                    <Image
                      src="/play.png"
                      width={50}
                      height={50}
                      alt="play button" />
                  </IconButton>
                </span>
              )} */}
            </div>

            <div
              id="language-with-raiting"
              className="flex flex-row justify-between "
            >
              <div>
                {languages.map((language, index) => {
                  return (
                    <>
                      <span className="text-sm font-semibold text-black">{`${language}${languages.length - 1 != index ? "," : ""
                        }`}</span>
                    </>
                  );
                })}
              </div>

              <div className="flex flex-row  gap-2">
                <Image
                  src="/heart.svg"
                  width={20}
                  height={20}
                  alt="sukoon unlimited  raiting"
                />
                <span className="font-bold font-boldFont">{displayScore || score}</span>
              </div>
            </div>

            {type === 'saarthi' && <div id="sarthi-interst" className="grid grid-cols-3 gap-0.5 justify-between">
              {intersts.length > 0 &&
                intersts?.map((interst, index) => {
                  return (
                    <div key={uniqueId} className="flex gap-2">
                      <Tooltip title={interst} className="font-lightFont">
                        <Chip
                          size="small"
                          label={interst}
                          className="font-bold text-2 text-sm p-0 border border-red-500 w-full"
                          key={interst}
                          sx={{
                            bgcolor: appTheme.colors["blue"],
                            color: appTheme.colors["black"],
                          }}
                        />
                      </Tooltip>
                    </div>
                  );
                })}
            </div>}

            {type === 'expert' && <div id="sarthi-interst" className="grid grid-cols-1 gap-0.5 justify-between">
              {intersts.length > 0 &&
                intersts?.map((interst, index) => {
                  return (
                    <div key={uniqueId} className="flex gap-2">
                      <Tooltip key={uniqueId} title={interst} className="font-lightFont">
                        <Chip
                          size="small"
                          label={interst}
                          className="font-lightFont text-2 text-sm p-0 border border-red-500 w-full"
                          key={interst}
                          sx={{
                            bgcolor: appTheme.colors["blue"],
                            color: appTheme.colors["black"],
                          }}
                        />
                      </Tooltip>
                    </div>
                  );
                })}
            </div>}

            <div

              id="saarthi-about-list"
              className={`grid grid-cols-1 gap-2 `}
            >
              <p
                key={detailedDetail}
                className=" font-normalFont text-black line-clamp-2"
              >
                {detailedDetail}
              </p>
            </div>
            <div
              key={'readMore' + detailedDetail}
              className="flex flex-row justify-end"
              onClick={readMore}
            >
              <Typography
                key={uniqueId}
                className="text-sm font-lightFont text-black underline cursor-pointer"
              >
                Read More
              </Typography>
            </div>
            <Btn
              key={uniqueId}
              text={
                user?._id
                  ? isOffline
                    ? "Sarathi on Break"
                    : isSaarthiBusy
                      ? "Sarathi Busy"
                      : "Speak Now"
                  : "Speak Now"
              }
              // isDisabled={!user?._id ? false : disabledCallBtn}
              color={
                user?._id
                  ? !disabledCallBtn
                    ? "yellow"
                    : "lightGray"
                  : "green"
              }
              onClick={() => checkForLoginAndCall()}
              textColor={user?._id ? "black" : "white"}
            />
          </div>

          {/* <span className='flex flex-1 text-md font-bold text-lightGray  justify-end'>Read more...</span> */}
        </CardContent>
      </Card>
    </LazyLoad>
  );
};

const concatStringWithPipe = (array: string[]) => {
  return array.join(" | ");
};

export default React.memo(PersonCard);
