import React from "react";
import { ProfileCardProps } from "./profileCard.interface";

const ProfileCard: React.FC<ProfileCardProps> = (props) => {
  const { Icon, label, title } = props;

  return (
    <div className="p-3 sm:p-3.5 md:p-4 lg:p-5 border rounded-3xl md:max-w-80 w-full border-primaryYellow flex items-center gap-4">
      <div className="size-14 rounded-full overflow-hidden bg-primaryYellow/20 flex justify-center items-center text-primaryYellow [&>svg]:text-3xl">
        {Icon}
      </div>
      <div>
        <p className="text-sm text-gray-700"> {label} </p>
        <h5 className="text-lg"> {title} </h5>
      </div>
    </div>
  );
};

export default ProfileCard;
