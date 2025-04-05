import { ChipProps } from "@mui/material";

export type StatusChipProps = ChipProps & {
  status: string;
  isBusy: boolean;
};
