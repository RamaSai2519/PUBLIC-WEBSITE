import React, { useState, useEffect, useRef } from "react";
import { Form, Input } from "antd";
import useDeviceType from "@/hooks/useDeviceType";

interface DateOfBirth {
  dob: Date | null;
}

interface DateOfBirthInputProps {
  idPrefix?: string;
  onChange: (dob: DateOfBirth) => void;
  disabled?: boolean
}

const DateOfBirthInput: React.FC<DateOfBirthInputProps> = ({
  idPrefix = "",
  onChange,
  disabled=false
}) => {
  const [dobDD, setDobDD] = useState("");
  const [dobMM, setDobMM] = useState("");
  const [dobYY, setDobYY] = useState("");

  const dobMMRef = useRef<any>(null);
  const dobYYRef = useRef<any>(null);

  const isMobile = useDeviceType();

  useEffect(() => {
    const dateOfBirth = constructDateOfBirth(dobDD, dobMM, dobYY);
    onChange({ dob: dateOfBirth });
  }, [dobDD, dobMM, dobYY]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    const value = e.target.value;
    switch (name) {
      case "dobDD":
        setDobDD(value);
        if (value.length === e.target.maxLength) {
          dobMMRef.current?.focus();
        }
        break;
      case "dobMM":
        setDobMM(value);
        if (value.length === e.target.maxLength) {
          dobYYRef.current?.focus();
        }
        break;
      case "dobYY":
        setDobYY(value);
        break;
      default:
        break;
    }
  };

  const validateDay = (_: any, value: string) => {
    const day = parseInt(value, 10);
    if (day >= 1 && day <= 31) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Date must be between 1 and 31"));
  };

  const validateMonth = (_: any, value: string) => {
    const month = parseInt(value, 10);
    if (month >= 1 && month <= 12) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Month must be between 1 and 12"));
  };

  const validateYear = (_: any, value: string) => {
    const year = parseInt(value, 10);
    const currentYear = new Date().getFullYear();
    if (year >= 1900 && year <= currentYear - 18) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Year must be valid and you must be 35+"));
  };

  return (
    <div className="flex flex-row gap-4">
      <Form.Item
        className="w-1/3"
        name={`${idPrefix}dobDD`}
        rules={[
          { required: true, message: "Date is required" },
          { validator: validateDay }
        ]}
      >
        <Input
          value={dobDD}
          disabled={disabled}
          onChange={(e) => handleInputChange(e, "dobDD")}
          inputMode="tel"
          maxLength={2}
          id={`${idPrefix}dobDD`}
          type="number"
          addonBefore={isMobile ? "" : "Date"}
          className="text-lg font-heavyFont"
          placeholder="DD"
        />
      </Form.Item>
      <Form.Item
        className="w-1/3"
        name={`${idPrefix}dobMM`}
        rules={[
          { required: true, message: "Month is required" },
          { validator: validateMonth }
        ]}
      >
        <Input
          ref={dobMMRef}
          disabled={disabled}
          inputMode="tel"
          id={`${idPrefix}dobMM`}
          value={dobMM}
          onChange={(e) => handleInputChange(e, "dobMM")}
          maxLength={2}
          className="text-lg font-heavyFont"
          type="number"
          addonBefore={isMobile ? "" : "Month"}
          placeholder="MM"
        />
      </Form.Item>
      <Form.Item
        className="w-1/3"
        name={`${idPrefix}dobYY`}
        rules={[
          { required: true, message: "Year is required" },
          { validator: validateYear }
        ]}
      >
        <Input
          ref={dobYYRef}
          disabled={disabled}
          id={`${idPrefix}dobYY`}
          inputMode="tel"
          value={dobYY}
          onChange={(e) => handleInputChange(e, "dobYY")}
          maxLength={4}
          className="text-lg font-heavyFont"
          type="number"
          addonBefore={isMobile ? "" : "Year"}
          placeholder="YYYY"
        />
      </Form.Item>
    </div>
  );
};

export const constructDateOfBirth = (
  day: string,
  month: string,
  year: string
): Date | null => {
  if (day && month && year) {
    const parsedDay = parseInt(day, 10);
    const parsedMonth = parseInt(month, 10) - 1; // Month starts from 0 (January is 0)
    const parsedYear = parseInt(year, 10);
    const dateOfBirth = new Date(parsedYear, parsedMonth, parsedDay);

    if (isNaN(dateOfBirth.getTime())) {
      return null;
    }

    // Get the IST offset in minutes (5 hours 30 minutes ahead of UTC)
    const istOffset = 330;
    const istOffsetInMilliseconds = istOffset * 60 * 1000;

    // Apply the IST offset to get the IST date and time
    const istDateOfBirth = new Date(
      dateOfBirth.getTime() + istOffsetInMilliseconds
    );

    return istDateOfBirth;
  }
  return null;
};

export default DateOfBirthInput;
