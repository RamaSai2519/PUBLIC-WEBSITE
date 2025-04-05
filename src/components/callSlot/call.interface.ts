import appTheme from "@/theme";
import { Slot } from "@/utils/scheduleCallApi";

export type CallSlotProps = {
  label: string;
  bgColor?: keyof typeof appTheme.colors;
  textColor?: keyof typeof appTheme.colors;
  isAvailable?: boolean;
  onSlotClick?: () => void;
  selected?: boolean;
};
