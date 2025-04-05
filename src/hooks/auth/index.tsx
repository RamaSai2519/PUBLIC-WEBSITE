import React, { useEffect, useState } from "react";
import Btn from "@/components/button";
import { useAppSelector } from "@/store/store";
import { useAppDispatch } from "@/store/hooks";
import { enableLoginModal } from "@/store/slices/loginModalSlice";
import { refferalDataSet } from "@/utils/constants";
import { trackEvent } from "@/context/Amplitude/AmplitudeInit";
import useDeviceType from "../useDeviceType";
import { ArrowBack, ArrowForwardIos } from "@mui/icons-material";

type SignInButtonProps = {
  buttonText?: string;
  blur?: boolean;
  isInline?: boolean;
};

const SignBtn: React.FC<SignInButtonProps> = (props) => {
  const { buttonText, blur } = props;

  const isOpen = useAppSelector((state) => state.loginModal.showLoginModal);
  const dispatch = useAppDispatch();

  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (!isRendered) {
      setIsRendered(true);
    }
  }, [isRendered]);

  useEffect(() => {
    // Check for refCode in URL
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get("utm_source");

    // If there's a refCode in the URL, open the modal immediately
    if (refCode) {
      const refCodeMeta = refferalDataSet.find(
        (element) =>
          element.key.trim().toLowerCase() == refCode.trim().toLowerCase()
      );
      // trackEvent('loginModal', { onlyShown: true, refCode: refCodeMeta?.heading })
      // dispatch(enableLoginModal({
      //   showLoginModal: true,
      //   modalHeading: refCodeMeta?.heading || '',
      //   modalSubHeading: refCodeMeta?.subHeading,

      // }));
    } else {
      // If there's no refCode, check session storage
      const hasModalOpened = sessionStorage.getItem("modalOpened");

      // if (!hasModalOpened) {
      //   let openTimer = setTimeout(() => {
      //     showLoginModal();
      //     sessionStorage.setItem('modalOpened', 'true'); // Mark that the modal has been shown
      //   }, 5000);

      //   return () => clearTimeout(openTimer);
      // }
    }
  }, []);

  const showLoginModal = () => {
    trackEvent("loginModal", { onlyShown: true });
    dispatch(
      enableLoginModal({
        showLoginModal: true,
      })
    );
  };

  const device = useDeviceType();
  const { isMobile, isTablet } = device;

  const inLineButton = () => {
    return (
      <div className="flex flex-row justify-evenly">
       
        <input
          type="tel"
          accept="number"
          inputMode="numeric"
          onClick={() => showLoginModal()}
          maxLength={10}
          pattern="[0-9]{10}"
          autoComplete="tel"
          className="w-3/4 text-base rahul  p-2 bg-transparent border-black placeholder:text-black active:border-black text-black border-2  rounded-tr-xl rounded-br-xl"
          placeholder="Enter Mobile Number"
        />
        <Btn
          customClass="rounded-r-xl mayank "
          isRounded={false}
          text="Register"
          endIcon={<ArrowForwardIos  fontSize="small" />}
          fontSize="text-lg"
          
          onClick={() => showLoginModal()}
          color="black"
          textColor="white"
          size="small"
        />
        </div>
     
    );
  };
  return props.isInline ? (
    inLineButton()
  ) : (
    <>
      <Btn
        text={buttonText || "Sign In/Sign Up"}
        key={"login-btn"}
        onClick={() => showLoginModal()}
        customClass="border-2 border-black"
        color={"transparent"}
        border="black"
        borderType="rounded"
        fontSize={"text-lg"}
        size="small"
      />
    </>
  );
};

export default React.memo(SignBtn);
