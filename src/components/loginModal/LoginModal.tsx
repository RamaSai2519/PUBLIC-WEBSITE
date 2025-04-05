import React, { useEffect, useId } from "react";
import { useAppSelector } from "@/store/store";
import { useAppDispatch } from "@/store/hooks";
import { disableLoginModal, } from "@/store/slices/loginModalSlice";
import SigninModal from "../Modal/signInModal";
import CaptureUserNumber from "../captureUserNumber";
import RegisterAccount from "../partialViews/Register";
import LazyLoad from "../lazyLoad";
import Link from "next/link";
import { setEnableCallPrompt } from "@/store/slices/loadingSlice";

const LoginModal = () => {
  const isShowLogin = useAppSelector(
    (state) => state.loginModal.showLoginModal
  );
  const modalHeading = useAppSelector(
    (state) => state.loginModal.modalHeading
  );

  const modalSubHeading = useAppSelector(
    (state) => state.loginModal.modalSubHeading
  );

  const modalDescription = useAppSelector(
    (state) => state.loginModal.modalDescription
  );

  const uniqueKey = useId();
  const userDetailPostLogin = useAppSelector(
    (state) => state.authUserReducer.data
  );

  const dispatcher = useAppDispatch();

  const close = () => {
    dispatcher(disableLoginModal());
  };

  useEffect(() => {
    if (userDetailPostLogin?.phoneNumber) {
      dispatcher(setEnableCallPrompt(true));
    }

    if (userDetailPostLogin?.birthDate && userDetailPostLogin?.name) {
      dispatcher(disableLoginModal());
    }
  }, [userDetailPostLogin]);

  return (
    <SigninModal
      open={Boolean(isShowLogin)}
      key={uniqueKey}
      modalTitle={
        userDetailPostLogin?._id
          ? "We would love to know about you!"
          : "We are so happy to see you!"
      }
      name="login-modal-clicked"
      bgColor="white"
      closable={false}
      onClose={() => close()}
      fullScreen={false}
    >
      <div className="my-7">
        {!userDetailPostLogin?._id ? (
          <h1 className="font-lightFont text-4xl leading-8">
            <span className="font-heavyFont">{modalHeading}</span>
            <br />

          </h1>
        ) : (
          <h1>
            <h1 className="font-lightFont text-4xl leading-8 uppercase">
              <span className="font-heavyFont">{modalSubHeading}</span>
              <br />
              to know about you!
            </h1>
          </h1>
        )}

        <div className="flex flex-col">
          <p className="font-normalFont text-base  mt-2">
            {modalSubHeading}
          </p>
          <p className="font-normalFont text-base  mt-2">
            {modalDescription}
          </p>
        </div>
      </div>
     
      {!userDetailPostLogin?._id ? (
        <CaptureUserNumber
          key={uniqueKey}
          formStyle="col"
          loginButtonText="  Join Sukoon Community"
        />
      ) : (
        <LazyLoad>
          <RegisterAccount key={uniqueKey} />
        </LazyLoad>
      )}
      { (
        <p className="font-normalFont [&>*]:font-mediumFont text-base text-center">
          By logging in, you agree to our{" "}
          <Link
            href={"/terms-and-conditions"}
            target="_blank"
            className="underline cursor-pointer hover:underline hover:text-green"
          >
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link
            href={"/privacy-policy"}
            target="_blank"
            className="underline cursor-pointer hover:underline hover:text-green"
          >
            Privacy Policy
          </Link>
        </p>
      )}
    </SigninModal>
  );
};
export default LoginModal;
