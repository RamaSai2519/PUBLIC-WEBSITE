import React, { useCallback, useEffect, useState } from "react";
import Btn from "@/components/button";
import { useCall } from "@/hooks/useCall";
import { getCookie } from "@/utils/axiosHelper";
import { useAppDispatch } from "@/store/hooks";
import { enableLoginModal } from "@/store/slices/loginModalSlice";
import { useAppSelector } from "@/store/store";
import { SaarthiList } from "@/store/api/interface";
import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";
import ReactGA from 'react-ga4';
import { trackEvent } from "@/context/Amplitude/AmplitudeInit";
import { getItems } from "@/utils/indexDbUtils";
const ConfirmCall = () => {
  const dispatcher = useAppDispatch();

  const userData = useAppSelector(state => state.authUserReducer.data);
  const verifiedUserData = useAppSelector(
    (state) => state.authUserReducer.data
  );
  const { popMsg, loading, makeCall } = useCall();
  const [countdown, setCountdown] = useState(3);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  const makeLocalCall = useCallback(
    async (saarthiId: string, userId: string) => {
      try {
        trackEvent('connect-now-clicked', { sarathi: selectedSarathi?.name || saarthiId, userId: userId, callBalance: userData?.numberOfCalls })
        sendGTMEvent({
          event: "callPlacedClicked",
          value: `${selectedSarathi?.name} - ${verifiedUserData?.name}`,
        });
        ReactGA.event({
          category: "callPlacedClicked",
          action: "autoCall"
        },"autoCall");
        sendGAEvent("button", "Clicked", `${verifiedUserData?.name} ${selectedSarathi?.name} button clicked`);
      } catch (error) {

      }

      const isUserLoggedIn = await getItems();
      //@ts-ignore
      if (!isUserLoggedIn?.phoneNumber) {
        dispatcher(enableLoginModal({
          showLoginModal: true,
          isPaid: true,
          nextStep: makeCall(saarthiId, userId,selectedSarathi?.type || 'saarthi')
        }));
        return;
      }
      makeCall(saarthiId, userId,selectedSarathi?.type || 'saarthi');
    },
    [dispatcher, makeCall]
  );

  // useEffect(() => {
  //   if (isCountdownActive && countdown > 0) {
  //     const timer = setTimeout(() => {
  //       setCountdown((prev) => prev - 1);
  //     }, 1000);
  //     return () => {
  //       clearTimeout(timer)
  //     };
  //   } else if (countdown === 0 && isCountdownActive) {
  //     //@ts-ignore
  //     makeLocalCall(selectedSarathi?._id || selectedSarathi?.saarthiId)
  //     setIsCountdownActive(false);
  //   }
  // }, [countdown, isCountdownActive]);

  const selectedSarathi = useAppSelector(
    (state) => state.selectedSarathi.selectedSaarthi
  );


  const clickedSaarthi: SaarthiList | undefined = selectedSarathi;
  return (
    <div className="flex flex-col  justify-center p-4 w-full  gap-2">
      <div className="text-2xl justify-center inline-flex my-2">
        <p>Good choice! You are about to Speak with </p>
        <p className="font-heavyFont ml-1 text-green">{` ${clickedSaarthi?.name || ""
          }`}</p>
      </div>
      <ul className="flex flex-col gap-2 mt-4 m-auto">
        <li className="gap-2 font-mediumFont text-base">
          - This is a 100% confidential voice call. Please do not exchange contact details.
        </li>
        {/* <li className="gap-2 font-mediumFont text-base">
          - No details about you are shared with Saarthis, including your
          contact number.
        </li> */}
        <li className="gap-2 font-mediumFont text-base">
          - Please share your details with Saarthis based on your comfort
        </li>
      </ul>
      <div>
        <div className="border-t border-green opacity-10 m-5"></div>
        <div className="mt-2 text-center inline-block font-mediumFont p-1">
          <p className="inline font-mediumFont leading-8 text-gray-700 px-2">
            You will receive a voice call from a secure number <b>+91 8062961440</b> on your registered mobile number. Receiving this call will connect you to Sarathi immediately.
          </p>

        </div>
      </div>

      <div className="mt-6 mb-2 w-52 m-auto">
        <Btn
          onClick={async () => {

            //@ts-ignore
            makeLocalCall(selectedSarathi?._id || selectedSarathi?.saarthiId, userData?._id);

          }}

          color="greenMainColor"
          text={loading ? "Connecting" : isCountdownActive ? `Connecting in ${countdown} seconds` : popMsg?.cta || "Connect Now"}
          isDisabled={Boolean(popMsg.cta)}
          textColor="white"
          isFullWidth
        />
      </div>
      <p className="pt-2 text-center text-gray-700">
        Want to schedule a call for later? Simply call us at{" "}
        <span className="font-heavyFont text-black">+91 8660610840</span> to
        book a call.
      </p>
      {/* <h1 className="text-lg text-center text-gray-700 font-mediumFont mt-2">
        You will get a call from{" "}
        <span className="text-black">+91 8660610840</span> on your registered
        mobile number.
      </h1> */}
    </div>
  );
};

export default React.memo(ConfirmCall);
