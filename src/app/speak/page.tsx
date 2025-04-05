"use client";

import React, { useEffect } from "react";
import Speak from "@/components/speak";
import { META_TEXT } from "@/utils/firebase";
import useDeviceType from "@/hooks/useDeviceType";
import MobileSpeak from "@/components/speak/mobile.index";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import useQueryParams from "@/hooks/useQueryParams";

const SpeakPage = () => {

  const { isMobile } = useDeviceType();
  return (
    <React.Suspense fallback={<>Loading</>}>
      { (
        <Speak isGame={false} />
      )}
    </React.Suspense>
  );
};

export default SpeakPage;
