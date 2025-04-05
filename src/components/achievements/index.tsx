"use client";

import React, { useMemo, useId } from "react";
import { achievementsData } from "./data";
import MaxWidthWrapper from "../maxWidthWrapper";

const Achievements = () => {
  const uniqueId = useId();

  return (
    <MaxWidthWrapper>
      <div key={`maindiv-${uniqueId}`} className="m-4 max-w-[340px] md:max-w-full mx-auto section bg-primaryYellow rounded-3xl p-2">
        <div key={`flexmaindiv-${uniqueId}`} className="flex flex-col md:flex-row justify-evenly items-center py-10 border border-black/50 rounded-2xl">
          {achievementsData?.map((item, index) => (
            <React.Fragment key={`achievement-fragment-${uniqueId}-${item.title}-${index}`}>
              <div key={`achievement-item-${uniqueId}-${item.title}-${index}`} className="[&>*]:text-center md:max-w-[200px]">
                <h5 className="font-heavyFont text-[40px]">{item?.title}</h5>
                <p className="font-normalFont text-base">{item?.description}</p>
              </div>
              {achievementsData?.length !== index + 1 && (
                <div key={`horizontal-divider-${uniqueId}-${index}`} className="w-28 h-[1px] my-6 md:hidden bg-black" />
              )}
              {achievementsData?.length !== index + 1 && (
                <div key={`vertical-divider-${uniqueId}-${index}`} className="w-[1px] h-16 mx-6 hidden md:block bg-black" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Achievements;
