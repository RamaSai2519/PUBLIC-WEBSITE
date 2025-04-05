"use client";

import MaxWidthWrapper from "@/components/maxWidthWrapper";
import DisplayProfile from "@/components/profile/displayProfile";
import EditProfile from "@/components/profile/editProfile";
import Head from "next/head";

import { useState } from "react";

const Profile = () => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  return (
    <MaxWidthWrapper>
      <div className="px-4">
        {isEditEnabled ? (
          <EditProfile setIsEditEnabled={setIsEditEnabled} />
        ) : (
          <DisplayProfile setIsEditEnabled={setIsEditEnabled} />
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Profile;
