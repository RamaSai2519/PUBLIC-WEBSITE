import React from "react";

const QuickGuide = () => {
  const scrollTo = () => {
    document
      .getElementById("sukoon-video-guide")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      onClick={scrollTo}
      className="rounded-3xl border border-white/30 py-1.5 px-4 flex gap-3 items-center backdrop-blur-3xl /5 hover:bg-primaryYellow/10 transition-all cursor-pointer"
    >
      <div className="rounded-full size-3.5 bg-primaryYellow flex justify-center items-center">
        <span className="rounded-full  size-1/2"></span>
      </div>
      <p className="underline text-white font-lightFont text-sm sm:text-base">
        Take a quick tour of the website
      </p>
    </div>
  );
};

export default QuickGuide;
