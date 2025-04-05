import { alpha } from "@/utils/helpers";
import { ChipProps } from "@mui/material";
import appTheme from "@/theme";

export type CustomChipProps = ChipProps & {
  title: string;
  showWords?: 'limited' | 'all';
  bgColor?: keyof typeof appTheme.colors;
  textColor?: keyof typeof appTheme.colors;
  bgAlpha?: number;
  charactersToShow?: number;
};
