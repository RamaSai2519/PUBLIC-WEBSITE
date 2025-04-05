import { ArrowForward } from "@mui/icons-material";
import { Button, Form, Input } from "antd";
import React from "react";

const CaptureUserNumber = () => {
  const handleSubmit = (e: any) => {
    // // console.log("submitting form", e);
  };

  return (
    <div className="mt-2 bg-blue p-3 rounded-lg w-full sm:w-[400px]">
      <p>Get complimentary access to our services</p>

      <Form
        name="captureNumber"
        onFinish={handleSubmit}
        className="w-full mt-3 flex flex-row gap-2"
      >
        <Form.Item
          name={"phoneNumber"}
          required
          className="w-full"
          rules={[
            {
              message: "Please enter your mobile number",
              max: 10,
              min: 10,
            },
            {
              required: true,
              message: "Please enter your mobile number",
            },
          ]}
        >
          <Input
            inputMode="tel"
            type="tel"
            prefix="+91"
            minLength={10}
            maxLength={10}
            name="phone"
            style={{ fontFamily: "normalFont" }}
            placeholder="Enter mobile number"
            className="font-normal rounded-md w-full h-10 pl-2 placeholder:opacity-70"
          />
        </Form.Item>

        <Form.Item name={"submitForm"}>
          <Button
            htmlType="submit"
            className=" bg-primaryYellow rounded-md h-10 pl-2"
            type="text"
          >
            <ArrowForward sx={{ color: "black" }} />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CaptureUserNumber;
