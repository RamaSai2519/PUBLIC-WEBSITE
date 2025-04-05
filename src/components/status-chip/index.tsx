import { getStatusColor } from "@/utils/helpers";
import { Chip, ChipProps } from "@mui/material";
import React, { useMemo } from "react";
import { StatusChipProps } from "./statusChip.interface";

const StatusChip: React.FC<StatusChipProps> = ({
  status,
  isBusy,
  ...props
}) => {
  const newStatus = useMemo(
    () => (status === "offline" ? "offline" : isBusy ? "busy" : status),
    [isBusy, status]
  );

  return (
    <>
      <Chip
        size="small"
        sx={{
          color:
            status?.toLowerCase() === "offline" && !isBusy
              ? "#000"
              : "grey.100",
          bgcolor: getStatusColor(newStatus?.toLowerCase()),
          fontWeight: "100",
          textTransform: "capitalize",
        }}
        label={newStatus === "online" ? "available" : newStatus}
        {...props}
      />
    </>
  );
};

export default StatusChip;
