import { useAppDispatch } from "@/store/hooks";
import { setAuthUserDetail } from "@/store/slices/userInfoAuthSlice";
import { useAppSelector } from "@/store/store";
import { Form, Input } from "antd";
import React, { useCallback, useEffect, useId, useState } from "react";
import Btn from "../button";
import { setCallDialog } from "@/store/slices/selectedSarathi";
import { RefreshRounded } from "@mui/icons-material";
import { useSendOtpMutation, useUpdateUserMetaOrReferralMutation, useVerifyOtpMutation } from "@/store/api/newLoginApi";
import useQueryParams from "@/hooks/useQueryParams";
import LoadingComponent from "../loadingComponent/LoadingComponent";
import { setLoading } from "@/store/slices/loadingSlice";
import { addItem, getItems } from "@/utils/indexDbUtils";
import { setAmplitudeUserId, setAmplitudeUserProperties, trackEvent } from "@/context/Amplitude/AmplitudeInit";
import { useRouter } from "next/navigation";

interface CaptureUserNumberProps {
  formStyle?: "row" | "col";
  loginButtonText?: string;
  localPhoneNumber?: string;
  onSubmit?: () => void;
}

const CaptureUserNumber = (props: CaptureUserNumberProps) => {
  const {
    formStyle = "row",
    loginButtonText = "Let's Go",
    localPhoneNumber
  } = props;

  const queryParams = useQueryParams('utm_source');
  const uniqueId = useId();
  const dispatcher = useAppDispatch();
  const showModal = useAppSelector((state) => state.loginModal.showLoginModal);
  const [showVerifyOtp, setVerifyOtp] = useState(false);
  const [savePhoneNumber, setSavePhoneNumber] = useState("")
  const [sendUserOtp, { data }] = useSendOtpMutation();
  const [verifyOtp, { data: dataVerifyOtp }] = useVerifyOtpMutation();
  const [updateUserMetaOrReferral, { data: dataUserMetaOrReferral }] = useUpdateUserMetaOrReferralMutation()
  const [seconds, setSeconds] = useState(30);
  const navigation = useRouter()
  useEffect(() => {
    if (showVerifyOtp && seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds, showVerifyOtp]);

  const formatTime = (time: number) => {
    return time === 1 ? `${time} second` : `${time} seconds`;
  };
  const handleSubmit = async (e: any) => {
    const getIndexDb = await getItems();
    trackEvent('register-process-post-phone-number', { ...e })
    dispatcher(setLoading(true));
    if (typeof e?.phoneNumber === 'string') {
      setSavePhoneNumber(e.phoneNumber)
    }
    let otpSendStatus = await sendUserOtp({ phoneNumber: savePhoneNumber ? savePhoneNumber : e?.phoneNumber }).unwrap();
    trackEvent('otp-status', { ...otpSendStatus })
    if (otpSendStatus.output_status) {
      setVerifyOtp(true);
      setSeconds(30);
      dispatcher(setLoading(false));
    }
    else {
      dispatcher(setLoading(false));
      alert("OTP not sent")
    }
  };

  const setData = useCallback(
    (data: any) => {
      if (data && data._id) dispatcher(setAuthUserDetail(data));
    },
    [dispatcher]
  );

  const verifyOtpHandler = async (element: any) => {
    dispatcher(setLoading(true));
    const response = await verifyOtp({ phoneNumber: savePhoneNumber, otp: element.otp }).unwrap();
 
    if (response.output_status == 'FAILURE') {
      trackEvent('FAILURE-otp-status-validation-while-login', { otpStatus: response.output_status })
      alert("Please check OTP");
      dispatcher(setLoading(false));
      return
    }
    if (response.output_status === 'SUCCESS') {
      trackEvent('SUCCESS-otp-status-validation-post-login', { otpStatus: response.output_status })
      // checking if UTM is Passed or not with valid phone number
      if (typeof queryParams === 'string' && savePhoneNumber) {
        const refCodeStatus = await updateUserMetaOrReferral({ refCode: queryParams, phoneNumber: savePhoneNumber }).unwrap();
        if (refCodeStatus.output_status == 'SUCCESS') {
          trackEvent('SUCCESS-register-ref-params', { refCode: queryParams, phoneNumber: savePhoneNumber })
          dispatcher(setLoading(false));
        }
      }

      if (response.output_details) {
        setData(response.output_details);
        setAmplitudeUserId(savePhoneNumber)
        setAmplitudeUserProperties(response.output_details);
        await addItem(response.output_details)
        dispatcher(setLoading(false));
      } else {
        await updateUserMetaOrReferral({ phoneNumber: savePhoneNumber }).unwrap().catch(e => {
          alert("Something went wrong!!")
        }).then(async (data) => {
          setAmplitudeUserId(savePhoneNumber)
          // @ts-ignore
          setData(data.output_details);
          // @ts-ignore
          await addItem(data.output_details)
        });

        dispatcher(setLoading(false));
      }

      if (showModal === "now") {
        // dispatcher(setCallDialog("now"));
      }
      if (showModal === "schedule") {
        // dispatcher(setCallDialog("schedule"));
      }
    }
  };

  const onPhoneNumberChange = (evt:any) => {
   
    if(evt.target.value.length === 10) {
      handleSubmit({ phoneNumber: evt.target.value })
    }
  }

  const onOtpNumberChange = (evt:any) => {
    if(evt.target.value.length === 4) {
      verifyOtpHandler({ otp: evt.target.value })
    }
  }
  return (
    <React.Fragment key={uniqueId}>
     <LoadingComponent />
      <Form
        key={uniqueId}
        name="captureNumber"
        onFinish={(e) => handleSubmit(e)}
        className={`w-full justify-center flex flex-${formStyle} items-center  gap-1`}
      >
        {!showVerifyOtp &&
          <Form.Item
            key={uniqueId}
            name={"phoneNumber"}
            initialValue={localPhoneNumber}
            required
            className="w-full font-normalFont"
            rules={[
              {
                pattern: /^[6-9]\d{9}$/,
                message: "Please enter 10 digit mobile number",
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
              type="text"
              key={uniqueId}
              prefix="+91 | "
              autoFocus
              minLength={10}
              maxLength={10}
              name="phone"
              onChange={onPhoneNumberChange}
              style={{ fontFamily: "normalFont" }}
              placeholder="Enter mobile number"
              className="text-xl font-normalFont  bg-slate-200 rounded-lg border-1 placeholder:text-gray-600"
            />
          </Form.Item>}
        {formStyle == "row" && (
          <Form.Item name={"submitForm"}>
            <Btn text={loginButtonText} color="primaryYellow" />
          </Form.Item>
        )}
        {formStyle == "col" && !showVerifyOtp && (
          <Form.Item className="w-1/2" name={"submitForm"}>
            <Btn text={loginButtonText} isFullWidth color="primaryYellow" />
          </Form.Item>
        )}
      </Form>
      {showVerifyOtp && <Form onFinish={verifyOtpHandler}>
        <Form.Item className="mb-0" name={"otp"} rules={[{
          required: true,
          message: "Please enter 4 digit OTP"
        }]}>
          <Input
            inputMode="tel"
            key={uniqueId}
            maxLength={4}
            minLength={4}
            onChange={onOtpNumberChange}
            autoFocus
            placeholder="Enter 4 digit OTP"
            size="middle"
            className="font-heavyFont text-center border-gray-400 rounded-full border-1 placeholder:text-gray-600 tracking-[.45em]  placeholder:tracking-[.05em]" />
        </Form.Item>
        <span className="text-sm font-lightFont flex justify-center">You will receive an OTP from TDAD on your registered mobile number.</span>
        <div className="my-2 flex w-full justify-end">
          <p>
            Haven't received the code yet?{" "}
            {seconds > 0 && <span>Request again in {formatTime(seconds)}</span>}
            {seconds < 1 && (
              <span onClick={(e) => handleSubmit(e)} className="hover:underline cursor-pointer">Resend OTP<RefreshRounded /></span>
            )}
          </p>
        </div>
        <Form.Item className="w-1/2 mx-auto" name={"submitOTP"}>
          <Btn text="Verify OTP" isFullWidth color="primaryYellow" />
        </Form.Item>
      </Form>
      }
    </React.Fragment>
  );
};

export default CaptureUserNumber;
