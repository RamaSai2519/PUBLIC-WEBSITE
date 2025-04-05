import useDeviceType from "@/hooks/useDeviceType";
import { editProfile, useEditProfileMutation } from "@/store/api/loginApi";
import React, { useEffect } from "react";
import { getCookie } from "@/utils/axiosHelper";
import { Button, Form, Input } from "antd";
import DateOfBirthInput from "@/components/DateOfBirthInput";
import { useAppDispatch } from "@/store/hooks";
import { disableLoginModal } from "@/store/slices/loginModalSlice";
import {
  getAuthUserDetail,
  setAuthUserDetail,
} from "@/store/slices/userInfoAuthSlice";
import Btn from "@/components/button";
import { useUpdateUserMetaOrReferralMutation } from "@/store/api/newLoginApi";
import { useAppSelector } from "@/store/store";
import { addItem, getItems } from "@/utils/indexDbUtils";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/context/Amplitude/AmplitudeInit";
import { differenceInYears } from 'date-fns';
const RegisterAccount = () => {
  const [getToken, setToken] = React.useState("");
  const dispatcher = useAppDispatch();
  const getUserDetail = dispatcher(getAuthUserDetail());
  const navigation = useRouter();
  const [updateUserMetaOrReferral, { data: dataUserMetaOrReferral }] = useUpdateUserMetaOrReferralMutation()
  let [editProfileApi, { data: editProfileData, isSuccess }] =
    useEditProfileMutation();

  const [editForm, setEditForm] = React.useState<editProfile>({
    name: "",
    city: "",
    userToken: getToken,
    birthDate: "",
  });

  const handleEditProfile = async (e: any) => {
    try {
      const getPhoneNumber = await getItems();
      let editForm = {
        name: e?.name,
        city: e?.city,
        birthDate: e?.birthDate?.dob,
      };
  
      // console.log(getPhoneNumber['phoneNumber'], "edit form");
      //@ts-ignore
      if (getPhoneNumber['phoneNumber']) {
        let getUserDetails:any = await updateUserMetaOrReferral({
          //@ts-ignore
          ...editForm, phoneNumber: getPhoneNumber['phoneNumber']
        }).unwrap()
       
        await addItem(getUserDetails.output_details).catch(e=>{
          console.log(e,"ACTIVE USER ERROR")
        });
         // check the age if greater than 50 then track the event
        if( getUserDetails.output_details?.birthDate && differenceInYears(new Date(), new Date(getUserDetails.output_details?.birthDate)) > 50){
        trackEvent('register-process-post-phone-number', { ...getUserDetails })
        }
        // navigation.push("/success_google")

         window.location.href = '/success_google';
      }
     
      // editProfileApi({
      //   ...editForm,
      //   userToken: userToken?.value?.value,
      // })
      //   .then((res: any) => {

      //   })
      //   .then((e) => {
      //     dispatcher(getAuthUserDetail());
      //   });

    
    } catch (error) {
      console.log(error, "edit profile error");
    }
  };

  useEffect(() => {
    if (editProfileData?.success && isSuccess) {
      if (editProfileData.data) {
        Promise.all([
          dispatcher(setAuthUserDetail(editProfileData?.data)),
          dispatcher(disableLoginModal()),
        ]);
      }
    }
  }, [editProfileData, isSuccess, dispatcher, getUserDetail]);

  return (
    <div className="overflow-hidden">
      <Form
        onFinish={(e) => handleEditProfile(e)}
        className="flex flex-col rounded px-8  mb-4 w-full justify-center gap-1"
      >
        {/* <h1 className="font-heavyFont text-lg">Enter You Name</h1> */}
        <Form.Item
          name={"name"}
          preserve
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
          ]}
        >
          <Input
            id="outlined-basic"
            type="text"
            autoFocus={true}
            autoComplete="name"
            inputMode="text"
            name={"userName"}
            defaultValue={editForm?.name}
            className="sukoon-input"
            placeholder="Enter your Name"
          />
        </Form.Item>

        {/* <h1 className="font-heavyFont text-lg">Enter Your City</h1> */}
        <Form.Item
          key={editForm?.city}
          name={"city"}
          rules={[
            {
              required: true,
              message: "Enter city Name",
            },
          ]}
          required
        >
          <Input
            id="outlined-basic"
            type="text"
            color="error"
            autoComplete="city"
            defaultValue={editForm?.city}
            style={{ fontFamily: "heavyFont" }}
            key={"user-city"}
            // prefix='+91'
            // defaultValue={'+91 '}
            className="sukoon-input"
            placeholder="Enter your City"
          />
        </Form.Item>

        {/* <p className="mt-2 pl-2 text-gray-600 text-sm font-lightFont">
            This will be used to recommend Saarthis in your city
          </p> */}

        <div className="flex flex-col justify-start">
          <h1 className="font-normalFont text-base ">Enter Your DOB</h1>
          <Form.Item name={"birthDate"}>
            <DateOfBirthInput idPrefix="a" onChange={() => { }} />
          </Form.Item>
        </div>
        <Form.Item name={"formSubmit"}>
          <Btn
            text="Let the conversations begin!"
            color="primaryYellow"
            isFullWidth

          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterAccount;
