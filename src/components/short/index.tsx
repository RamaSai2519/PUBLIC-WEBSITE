'use client'
import {
  ArrowDownwardRounded,
  ArrowUpwardRounded,
  ChevronLeftRounded,
} from "@mui/icons-material";
import DeskDetails from "./DeskDetails";
import DetailsShort from "./DetailsShort";
import ShortActions from "./ShortActions";
import ShortSarathiDetails from "./ShortSarathiDetails";
import { ShortTypes } from "./interface";
import Link from "next/link";
import { useEffect } from "react";

interface ShortProps {
  shortData: ShortTypes;
}

const Short: React.FC<ShortProps> = ({ shortData }) => {

  useEffect(()=>{
   
  },[shortData.s3Key])
  return (
    <div key={shortData.s3Key} className="flex justify-center overflow-hidden fixed w-screen h-screen border-2 border-red-600">
      {/* MOBILE */}
      <div className="relative inline-block min-[530px]:rounded-3xl overflow-hidden">
        <ShortSarathiDetails shortData={shortData} />
        <video src={`https://d3q8r846m83fir.cloudfront.net/${shortData?.s3Key}.mp4`} autoPlay className="h-full w-full mx-auto" />
        <ShortActions shortData={shortData} />
        <DetailsShort shortData={shortData} />
      </div>
      {/* MOBILE */}

      {/* DESKTOP */}
      <DeskDetails shortData={shortData} />
      <div className="hidden xl:flex absolute right-20 flex-col gap-5 h-[90%] justify-center items-center">
        <span className="short-arrow-wrapper [&>svg]:hover:-translate-y-0.5 [&>svg]:hover:transition-transform">
          <ArrowUpwardRounded />
        </span>
        
        <span className="short-arrow-wrapper [&>svg]:hover:translate-y-0.5 [&>svg]:hover:transition-transform">
          <ArrowDownwardRounded />
        </span>
      </div>
      <Link  href={"/"} >
      <span className="absolute hidden lg:flex items-centerx left-8 xl:left-16 top-10 gap-1 items-center font-lightFont cursor-pointer">
        <ChevronLeftRounded />
        <span className="hidden xl:flex">Back To Home</span>
      </span>
      </Link>
      {/* DESKTOP  */}
    </div>
  );
};

export default Short;
