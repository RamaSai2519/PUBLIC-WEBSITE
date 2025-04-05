import { Favorite, Share, WhatsApp } from "@mui/icons-material";
import React from "react";
import { ShortTypes } from "./interface";

interface ShortProps {
  shortData: ShortTypes;
}

const ShortActions: React.FC<ShortProps> = ({ shortData }) => {
  const iconStyles = {
    width: 27,
    height: 27,
  };

  return (
    <div className="flex lg:hidden absolute right-0 bottom-44 flex-col gap-y-4 pr-5 z-10">
      <div className="flex flex-col justify-center items-center gap-1">
        <span className="short-icon-wrapper">
          <Favorite sx={{ ...iconStyles, color: "#F80000" }} />
        </span>
        <span className="text-white"> {shortData?.likes} </span>
      </div>
      <div className="flex flex-col justify-center items-center gap-1">
        <span className="short-icon-wrapper pr-1">
          <Share sx={{ ...iconStyles, color: "#fff" }} />
        </span>
        <span className="text-white"> {shortData?.shares} </span>
      </div>
      <div className="flex flex-col justify-center items-center gap-1">
        <span className="short-icon-wrapper">
          <WhatsApp sx={{ ...iconStyles, color: "#fff" }} />
        </span>
      </div>
    </div>
  );
};

export default ShortActions;
