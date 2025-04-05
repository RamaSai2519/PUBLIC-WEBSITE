import { Favorite, Share } from "@mui/icons-material";
import Image from "next/legacy/image";
import React from "react";
import { ShortTypes } from "./interface";

interface ShortProps {
  shortData: ShortTypes;
}

const DeskDetails: React.FC<ShortProps> = ({ shortData }) => {
  const iconStyles = {
    width: 27,
    height: 27,
  };

  return (
    <div className="hidden lg:flex flex-col gap-6 justify-center relative">
      <div className="shorts-chip">
        <span className="text-sm font-lightFont"> {shortData?.category} </span>
      </div>
      <h1 className="text-4xl font-heavyFont"> {shortData?.title} </h1>
      <p className="font-lightFont mt-2 text-gray-500 max-w-[375px] max-line-12">
        {shortData?.description}
      </p>
      <div>
        <hr className="border-none h-[1px] w-full bg-gray-200 mb-3" />
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center">
            <span className="short-icon-wrapper">
              <Favorite sx={{ ...iconStyles, color: "#F80000" }} />
            </span>
            <span className="text-black"> {shortData?.likes} </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="short-icon-wrapper pr-1">
              <Share sx={{ ...iconStyles }} />
            </span>
            <span className="text-black"> {shortData?.shares} </span>
          </div>
          <button className="py-1.5 px-3.5 rounded-3xl border border-primaryYellow">
            Speak with Sarathi
          </button>
        </div>
        <hr className="border-none h-[1px] w-full bg-gray-200 mt-3" />
      </div>
      <div className="flex items-center gap-2">
        <span className="relative size-12 rounded-full overflow-hidden">
          <Image
            src={"/founder.jpg"}
            alt="video-alt"
            layout="fill"
            className="object-top object-cover"
          />
        </span>
        <p className="text-black text-lg"> {shortData?.sarathiName} </p>
      </div>
    </div>
  );
};

export default DeskDetails;
