import Image from "next/legacy/image";
import React from "react";
import Btn from "../button";
import { ChevronLeftRounded } from "@mui/icons-material";
import { ShortTypes } from "./interface";
import Link from "next/link";

interface ShortProps {
  shortData: ShortTypes;
}

const ShortSarathiDetails: React.FC<ShortProps> = ({ shortData }) => {
  return (
    <div className="block lg:hidden absolute short-sarathi-gradient top-0 left-0 right-0 p-4 h-64">
      <Link  href={"/"} >
        <span className="flex gap-1 items-center font-lightFont text-white  cursor-pointer">
          <ChevronLeftRounded /> Back To Home
        </span>
      </Link>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-2">
          <span className="relative size-9 rounded-full overflow-hidden">
            <Image
              src={"/founder.jpg"}
              alt="video-alt"
              layout="fill"
              className="object-top object-cover"
            />
          </span>
          <p className="text-white text-lg">{shortData?.sarathiName}</p>
        </div>
        <Btn isRounded text="Speak with Sarathi" color="primaryYellow" />
      </div>
    </div>
  );
};

export default ShortSarathiDetails;
