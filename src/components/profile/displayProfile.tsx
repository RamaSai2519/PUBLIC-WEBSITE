import ProfileCard from "@/components/profileCard.tsx";
import { useUpdateUserMetaOrReferralMutation } from "@/store/api/newLoginApi";
import { useAppDispatch } from "@/store/hooks";
import { setLoading } from "@/store/slices/loadingSlice";
import { useAppSelector } from "@/store/store";
import { getItems } from "@/utils/indexDbUtils";
import { format } from "date-fns";
import {
  DateRangeOutlined,
  EditRounded,
  PlaceOutlined,
  Share,
  Translate,
} from "@mui/icons-material";
import Image from "next/legacy/image";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import ReferAndEarnCard from "../ReferEarn";

interface DisplayProfile {
  setIsEditEnabled: Dispatch<SetStateAction<boolean>>;
}

const DisplayProfile: React.FC<DisplayProfile> = (props) => {
  const { setIsEditEnabled } = props;
  const [updateUserMetaOrReferral, { data: dataUserMetaOrReferral }] = useUpdateUserMetaOrReferralMutation()
  const dispatcher = useAppDispatch();
  const appSelector = useAppSelector(state => state.authUserReducer);
  const init = async () => {
    const getUserMeta = await getItems();
    // @ts-ignore
    if (getUserMeta?.phoneNumber) {
      dispatcher(setLoading(true))
    }
  }
  useEffect(() => {

  }, [])

  return (
    <div>
      <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-heavyFont text-center md:text-left">
        Profile
      </h1>
      <div className="flex flex-col items-center gap-6 md:gap-8 lg:gap-12 md:flex-row">
        <div className="relative size-32 min-w-32 min-h-32 rounded-full overflow-hidden mx-auto md:mx-0 mt-11 mb-7">
          <Image
            layout="fill"
            alt="profile-alt"
            src={"/short.jpg"}
            className="object-top object-cover mx-auto"
          />
        </div>
        <div className="w-full">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <h3 className="text-2xl sm:text-3xl">{appSelector.data?.name || ''}</h3>
            {/* <div
              onClick={() => setIsEditEnabled(true)}
              className="overflow-hidden p-2 md:py-3 md:px-6 rounded-full md:ml-auto flex justify-center items-center bg-primaryYellow cursor-pointer"
            >
              <span className="hidden md:block">Edit Profile</span> &nbsp;
              <EditRounded />
            </div> */}
          </div>
          {/* <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 md:gap-4 justify-center md:justify-start mt-6 md:mt-2">
            {["Daily Life", "Finance", "Dance", "Entertainment"]?.map(
              (item, index) => (
                <span
                  key={index}
                  className="py-2 px-5 rounded-full bg-primaryYellow/25"
                >
                  {item}
                </span>
              )
            )}
          </div> */}
        </div>
      </div>
      <div className="flex flex-wrap gap-5 sm:gap-8 md:gap-11 lg:gap-14 mt-7 sm:mt-9 md:mt-12 lg:mt-15 mb-16">
        <ProfileCard
          Icon={<PlaceOutlined />}
          label="City"
          title={appSelector.data?.city || ''}
        />
        <ProfileCard
          Icon={<DateRangeOutlined />}
          label="DOB"
          title={appSelector.data?.birthDate ? format(appSelector.data?.birthDate, "dd-MM-yyyy") : "May 12, 1989"}
        />
        {/* <ProfileCard
          Icon={<Share />}
          label="Refer & Earn"
          title="English, Hindi"
        /> */}
        <ReferAndEarnCard />
      </div>
    </div>
  );
};

export default DisplayProfile;
