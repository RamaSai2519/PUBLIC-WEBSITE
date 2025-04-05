"use client";
import React, { Suspense } from "react";
// import { ReduxProvider } from "./app/StoreProvider";
// import { GoogleAnalytics } from "@next/third-parties/google";
// import { Alert } from "antd";
// import StickyHelp from "./components/StickyHelp";
import Header from "./components/header";
import LoginModal from "./components/loginModal/LoginModal";
import Footer from "./components/footer";
import { usePathname } from "next/navigation";
import { useAppSelector } from "./store/store";
import { PremiumProvider } from "./context/PremiumContext";
// import { CelebrateModalProvider } from "./context/CelebrateContext";
// import FloatingButton from "./components/ShareReferral";
// import { deviceDetect } from "react-device-detect";
import useDeviceType from "./hooks/useDeviceType";
// import TabNavigation from "./components/BottomFooterForMobile/BottomFooterForMobile";
// import { useAmplitude } from "./context/Amplitude/AmplitudeContext";
import { useAmplitude } from "./context/Amplitude/Amplitude.hooks";
import ReactGA from 'react-ga4';
const ApplicationPages = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = usePathname();

  const appSelecotor = useAppSelector(state => state.globalConfig);
  const customStyle =
    router !== "/" && !router.includes("/learn")
      ? {
        // paddingBlock: "6rem",
      }
      : {};

  const { hideFooter, hideHeader } = appSelecotor
  const { isMobile } = useDeviceType();
  
    useAmplitude(
      process.env.NODE_ENV === 'production'
        ? '576b612c6f85cd6f561e729baa45eaf'
        : 'test'
    );

    ReactGA.initialize('G-6FZ8Y7KBSS');
    ReactGA.event({
      label: 'App Loaded',
      action: 'App Loaded',
      category: 'App Loaded',
    },"App Loaded");
  return (
    <>
      {/* <Suspense>  */}
      <PremiumProvider>
        {/* <CelebrateModalProvider> */}
        <div
          className={`bg-bgColor ${isMobile ? "mt-10" : ""}  ${!hideHeader ? "block" : "hidden"} ${
            router !== "/" && router !== "/success" && router !== "/success_google" ? "mb-12" : "mb-0"
          }`}
        >
          <Header />
        </div>
        {!hideHeader && <LoginModal />}
        {/* <div className="block">
            <StickyHelp />
          </div> */}
        {/* <FloatingButton /> */}
        <div className="bg-bgColor pt-10 min-h-40" style={customStyle}>{children}</div>
        { <Footer />}
        {/* </CelebrateModalProvider> */}
      </PremiumProvider>
      {/* </Suspense>  */}
    </>
  );
};



export default ApplicationPages;
