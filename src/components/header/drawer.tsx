import React from "react";
import Logo from "../logo";
import { Close } from "@mui/icons-material";
import Image from "next/legacy/image";
import { navLinks } from "./data";
import { IconButton } from "@mui/material";
import Link from "next/link";

interface SukoonDrawerTypes {
  close: () => void;
  verifiedUserData: any;
}

const SukoonDrawer: React.FC<SukoonDrawerTypes> = ({
  close,
  verifiedUserData,
}) => {
  const navigateToScreen = () => {
    close();
  };
  return (
    <div className="p-4 w-screen">
      <div className="flex justify-between items-center">
        <span className="w-12">
          <Logo />
        </span>
        <IconButton onClick={close}>
          <Close />
        </IconButton>
      </div>
      <div>
        <div className="flex items-center gap-3 my-8">
          {verifiedUserData?.name && (
            <>
              <span className="size-12 rounded-full flex justify-center items-center p-[2px] bg-primaryYellow/20 border border-primaryYellow">
                <span className="size-full rounded-full overflow-hidden relative">
                  <span className="size-11 backdrop-blur-lg bg-primaryYellow/10 hover:bg-primaryYellow/15 transition-all text-primaryYellow flex justify-center items-center rounded-full text-xl cursor-pointer">
                    {verifiedUserData?.name ? verifiedUserData?.name[0] : ""}
                  </span>
                </span>
              </span>
              <p>Hello {`${verifiedUserData?.name?.split(" ")[0]}`}</p>
            </>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {navLinks?.map((link, index) => (
            <div
              key={index + link?.title}
              className="p-2 shadow-sm rounded-md border border-primaryYellow "
            >
              <Link
                key={index}
                onClick={navigateToScreen}
                href={link?.path}
                className="font-normalFont text-base"
              >
                {link?.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SukoonDrawer;
