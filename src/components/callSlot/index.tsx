import React from "react";
import appTheme from "@/theme";
import { Box, alpha } from "@mui/material";
import { CallSlotProps } from "./call.interface";

const CallSlot: React.FC<CallSlotProps> = (props) => {
  const {
    label,
    bgColor = "goldLight",
    textColor = "darkGray",
    isAvailable,
    onSlotClick,
    selected,
  } = props;

  return (
    <Box
      component={"span"}
      className={`py-2 px-4 text-center rounded-2xl font-normalFont w-full text-sm transition-all ${
        isAvailable
          ? "cursor-pointer border-[1.5px]"
          : "cursor-not-allowed pointer-events-none"
      }`}
      onClick={onSlotClick}
      sx={{
        backgroundColor: isAvailable
          ? selected
            ? appTheme.colors[bgColor]
            : alpha(appTheme.colors[bgColor], 0.1)
          : "lightgray",
        borderColor: appTheme.colors[bgColor],
        color: appTheme.colors[textColor],
      }}
    >
      {label}
    </Box>
  );
};

export default CallSlot;
