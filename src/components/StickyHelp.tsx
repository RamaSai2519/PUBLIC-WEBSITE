'use client';
import appTheme from "@/theme";
import { useAppSelector } from "@/store/store";
import { WhatsApp } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import useDeviceType from "@/hooks/useDeviceType";
import { useEffect, useState } from "react";
import { get_data_from_firebase } from "@/utils/firebase";

const StickyHelp = () => {
  const isMobile = useDeviceType(); // Check if the device is mobile
  const appSelector = useAppSelector((state) => state.authUserReducer.data);

  
  const [callPhoneNumber,setCallPhoneNumber] = useState('8660610849')
  const init = async () => {
    await get_data_from_firebase("phoneNumber").then(res => {
      //@ts-ignore
      setCallPhoneNumber(res.number)
    })
  }

  useEffect(()=>{
    init();
  },[])

  const handleClick = () => {
    const message = ` ${appSelector?.name
      ? `I am ${appSelector?.name}. \n I would like assistance today.`
      : "Hello, I would like assistance today."
      } `;
    const url = `https://api.whatsapp.com/send?phone=+91${callPhoneNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="absolute bottom-0 right-0">
      <Box
        p={1}
        borderRadius={2}
        bgcolor={appTheme.colors.green}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={0.4}
        zIndex={1000}
        sx={{
          position: "fixed",
          bottom: { xxs: 30, xs: 40, sm: 50 },
          right: { xxs: 25, xs: 45, sm: 70 },
          boxShadow: "0px 8px 14px rgba(0,0,0,0.4)",
        }}
      >
        <div onClick={handleClick} className="flex flex-col p-1 justify-center items-center">
          <WhatsApp className="text-white" />
          {!isMobile.isMobile && <span className="text-white">Can we help ?</span>}
        </div>
        <Typography fontSize={16} className="font-heavyFont text-bgColor" />
      </Box>
    </div>
  );
};

export default StickyHelp;
