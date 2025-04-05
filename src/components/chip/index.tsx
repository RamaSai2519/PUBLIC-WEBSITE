import { Chip } from "@mui/material";
import React from "react";
import { CustomChipProps } from "./chip.interface";
import appTheme from "@/theme";
import { alpha } from "@/utils/helpers";

const CustomChip: React.FC<CustomChipProps> = (props) => {
  const { title = "Chip", bgColor = "blue", textColor = "black",showWords='all',charactersToShow=50, bgAlpha } = props;

  return (
    <Chip
      label={ showWords == 'all' ?  title : title.substring(0,charactersToShow)}
      className={`font-heavyFont p-0 text-center`}
      key={title}
      sx={{
        bgcolor: alpha(appTheme.colors[bgColor], bgAlpha || 1),
        color: appTheme.colors[textColor],
      }}
    />
  );
};

export default CustomChip;
