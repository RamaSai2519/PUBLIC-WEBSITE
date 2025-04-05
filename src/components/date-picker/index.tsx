import React from "react";
import { DatePickerCompProps } from "./datePicker.interface";
import Input from "../input";

const DatePickerComp: React.FC<DatePickerCompProps> = ({
  label,
  date,
  name,
  setDate,
  ...props
}) => {
  return (
    <Input
      label={label}
      fullWidth
      variant="outlined"
      labelColor={props?.labelColor}
      labelSize={props?.labelSize}
      name={name}
      sx={{
        fontSize: 18,
      }}
      type="date"
      value={date}
      onChange={setDate}
      {...props}
    />
  );
};

export default DatePickerComp;
