import React from "react";
import { menuLinks } from "./data";
import Link from "next/link";

interface ProfileDropdownTypes {
  userName: string;
  logout: () => void;
  onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownTypes> = (props) => {
  const { userName, logout, onClose } = props;

  return (
    <div className="w-60 p-5 bg-primaryYellow">
      <p className="whitespace-nowrap font-mediumFont text-lg">
        Hello, {userName || "Senior"}
      </p>
      <hr className="w-full bg-black h-[1px] border-none my-3" />
      <div className="flex flex-col">
        {menuLinks?.map((item, index) => (
          <Link
            href={item?.path}
            key={index}
            className="font-lightFont my-1 text-lg cursor-pointer hover:underline"
            onClick={onClose}
          >
            {item?.title}
          </Link>
        ))}
      </div>
      {/* <hr className="w-full bg-black/20 h-[1px] border-none my-3" /> */}
      <p
        className="font-lightFont my-1 text-lg cursor-pointer hover:underline"
        onClick={logout}
      >
        Logout
      </p>
    </div>
  );
};

export default ProfileDropdown;
