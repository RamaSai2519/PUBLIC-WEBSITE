"use client";

import { useState } from "react";
import { ShortTypes } from "./interface";

interface ShortProps {
  shortData: ShortTypes;
}

const DetailsShort: React.FC<ShortProps> = ({ shortData }) => {
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    <div className="block lg:hidden p-4 pb-4 short-detail-gradient absolute bottom-0 left-0 right-0 pt-64">
      <div className="shorts-chip">
        <span className="text-sm font-lightFont"> {shortData?.category} </span>
      </div>
      <h5 className="max-w-[85%] text-xl font-heavyFont mt-3 mb-2 text-white">
        {shortData?.title}
      </h5>
      <p className={`max-w-[85%] font-lightFont text-white/70 max-line-2`}>
        {shortData?.description}
      </p>
    </div>
  );
};

export default DetailsShort;
