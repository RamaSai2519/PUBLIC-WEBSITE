'use client'
import { trackEvent } from "@/context/Amplitude/AmplitudeInit";
import { useAppSelector } from "@/store/store";
import { WhatsApp } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { sendGTMEvent } from "@next/third-parties/google";
import React from "react";

const defaultMessage = "Hello, I would like to know more about Sukoon Unlimited.";

export const handleWaClick = (appSelector: any, message: string = defaultMessage) => {
  const phoneNumber = "+916362938688"; 

  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;

  // const url = `tel:${phoneNumber}`;  
  sendGTMEvent({
    event: "whatsAppButton",
    value: `${appSelector?.name || "user-not-logged-in"}`,
  });
  trackEvent('pressed-whatsapp-btn')
  try {
    if (typeof window != undefined) window.location.href = url;
  } catch (error) {
    console.error(error);
  }
};

function WhatsAppLink() {
  const appSelector = useAppSelector((state) => state?.authUserReducer?.data);

  return (
    <img onClick={() => handleWaClick(appSelector)} src="/fullwalogo.png" className="bg-transparent w-16 h-16 z-50" />
  );
}

export default WhatsAppLink;
