"use client";
import Btn from "@/components/button";
import CaptureUserNumber from "@/components/captureUserNumber";
import SigninModal from "@/components/Modal/signInModal";
import UserProfileComponent from "@/components/UserProfile/UserProfile";
import { useAppSelector } from "@/store/store";
import { Suspense } from "react";

const User = () => {
  const userDetails = useAppSelector((state) => state.authUserReducer.data);

  return (
    <Suspense>
      {userDetails?.phoneNumber ? (
        <div>
          {/* @ts-ignore */}
          <UserProfileComponent user={userDetails} />
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <div className="text-center flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Please Login</h1>
            <p className="text-black mt-2">
              You need to log in to view this page.
            </p>
            <CaptureUserNumber formStyle="col" />
          </div>
        </div>
      )}
    </Suspense>
  );
};

export default User;
