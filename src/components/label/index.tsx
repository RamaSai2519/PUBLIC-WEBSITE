import { Typography } from "@mui/material";
import { LabelProps } from "./lable.interface";

const Label: React.FC<LabelProps> = (props) => {
  const { children, labelColor, labelSize } = props;
  return (
    <Typography
      sx={{
        pl: 2,
        mb: "2px",
        color: labelColor,
        fontSize: labelSize,
        fontWeight: "400",
      }}
    >
      {children}
    </Typography>
  );
};

export default Label;
