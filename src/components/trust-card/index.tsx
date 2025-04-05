import React from "react";
import { TrustCardProps } from "./trustCard.interface";

const TrustCard: React.FC<TrustCardProps> = (props) => {
  const {
    description,
    Icon,
    title,
    color = "primaryYellow/20",
    variant = "vertical",
    isFullWidth = false,
    isShadow = false,
  } = props;

  return (
    <>
      {variant === "vertical" ? (
        <div
          className={`flex ${
            isShadow ? "shadow-lg" : ""
          } flex-col items-center flex-1 justify-center relative pt-7 h-full ${
            isFullWidth ? "w-full" : "w-10/12"
          } sm:w-full`}
        >
          <span className=" absolute top-0 rounded-full flex justify-center items-center shadow-lg border-2 border-primaryYellow p-2">
            {Icon}
          </span>
          <div
            className={`bg-${color} p-5 rounded-xl pt-12 flex-1 w-full min-h-[158px]`}
          >
            <h6 className="font-bold text-xl text-center">{title}</h6>
            <h6 className="font-mediumFont text-base text-center mt-3 opacity-70">
              {description}
            </h6>
          </div>
        </div>
      ) : (
        <div
          className={`bg-${color} ${
            isShadow ? "shadow-2xl" : ""
          } w-full flex gap-4 flex-1 relative p-6 h-full w-10/12 rounded-lg sm:w-full`}
        >
          <span>{Icon}</span>
          <div>
            <h6 className="font-bold text-xl">{title}</h6>
            <p className="font-mediumFont text-base mt-2 opacity-70">
              {description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TrustCard;
