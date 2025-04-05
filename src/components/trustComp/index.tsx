import React from "react";
import { trustData } from "./data";
import MaxWidthWrapper from "../maxWidthWrapper";

interface TrustCompProps {
  isParagraph?: boolean;
}
const TrustComp = (props:TrustCompProps) => {
  let {isParagraph=false} = props
  return (
    
      <div className="flex flex-wrap  justify-evenly ">
        {trustData?.map((trust, index) => (
          <div key={index} className="flex flex-col items-center max-w-80">
            <trust.icon />
            <h5 className="text-2xl font-heavyFont mt-4 mb-2">
              {trust?.title}
            </h5>
           {isParagraph ==false &&  <p key={trust?.description} className="text-center font-normalFont text-base"> {trust?.description} </p>}
          {isParagraph ==false &&  <p  key ={trust?.subDescription} className="  text-center font-normalFont text-base"> {trust?.subDescription} </p>}
            
          </div>
        ))}
      </div>
    
  );
};

export default TrustComp;
