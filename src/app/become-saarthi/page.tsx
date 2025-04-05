"use client";
import Btn from "@/components/button";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { useBecomeSaarthi } from "@/hooks/useBecomeSaarthi";
import Image from "next/legacy/image";
import React, { useCallback, useState } from "react";
import { Form, Input, Select } from "antd";
import { genders, indianLanguages, working_hours } from "@/utils/helpers";
import DateOfBirthInput from "@/components/DateOfBirthInput";

/**
 * Functional component that renders the BecomeSaarthi form.
 * It uses the useBecomeSaarthi hook to get the necessary data.
 * It manages the user's date of birth state.
 * It captures form data and removes unnecessary fields before rendering the form.
 * @returns JSX element containing the BecomeSaarthi form.
 */
const BecomeSaarthi = () => {
  const { becomeSaarthi } = useBecomeSaarthi();

  const [userDob, setUserDob] = useState('');

  const onDobChange = (e: any) => {
    setUserDob(e);

  };

  const captureFormData = useCallback((formData: any) => {
    try {
      delete formData['dobDD']
      delete formData['dobMM']
      delete formData['dobYY']
    } catch (error) {

    }
    formData['gender'] = formData['gender'][0]
    formData['dateOfBirth'] = formData['dob']['dob']

    let cloneFormData = JSON.stringify(formData);
    cloneFormData = JSON.parse(cloneFormData);
    //@ts-ignore
    delete cloneFormData['dob']

    //@ts-ignore
    cloneFormData['formType'] = 'sarathi';
    becomeSaarthi({
      //@ts-ignore
      ...cloneFormData
    })

  }, [])
  return (
    <MaxWidthWrapper>
      <div className="flex gap-10">
        <div className="hidden md:block relative h-[85vh] w-[40%] rounded-3xl overflow-hidden">
          <Image
            src={"/img-1.png"}
            alt="become-saarthi-img"
            layout="fill"
            className="object-cover"
          />
        </div>
        <div className="block flex-1 py-6 px-4">
          <h1 className="text-4xl text-center md:text-left leading-[40px]">
            <span className="font-lightFont">Application Form</span>{" "}
          </h1>
          <p className="text-gray-700 font-lightFont mt-7 text-lg">
            Thank you for expressing interest in becoming a Sukoon Sarathi!{" "}
            <br />
            <span className="mb-2 block" />
            Sukoon Unlimited is an exclusive platform for Senior Citizens
            to connect, contribute, share, and support each other.

          </p>
          <hr className="w-full h-[1px] border-none bg-gray-200 my-6" />
          <p className="text-gray-700 font-lightFont mt-5 text-lg">
            Please fill in the below form. Have a query? Call us at{" "}
            <span className="font-mediumFont">+91 8660610840</span>
          </p>

          <Form onFinish={captureFormData} className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5 mt-10">
            <Form.Item label="Full Name"
              labelAlign="right"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }} key={'input-user-fullName'} name={"name"} rules={[{ required: true, message: "Enter Full Name" }]}>
              <Input key={'input-user-fullName'} placeholder="Enter Full Name" />
            </Form.Item>

            <Form.Item label="Email"
              labelAlign="right"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }} name={"email"} key={'user-email'} rules={[{ required: true, message: "Enter Email" }]}>
              <Input placeholder="Enter Your Email" key={'input-user-email'} type="email" />
            </Form.Item>

            <Form.Item label="Phone Number"
              labelAlign="right"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }} name={"phoneNumber"} key={'user-phone-number'} rules={[{ required: true, message: "Enter Email" }]}>
              <Input placeholder="Enter Your Phone Number" prefix="+91 " inputMode="tel" key={'input-phone-number'} className="text-lg" />
            </Form.Item>

            <Form.Item label="Your Skills"
              labelAlign="right"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }} name={"skills"} key={'user-skill-area'} rules={[{ required: true, message: "Enter Your Skill" }]}>
              <Input placeholder="Enter Your Skill (Meditation,Finance, Healer,etc)" inputMode="text" key={'input-user-skill-area'} />
            </Form.Item>

            <Form.Item label="Select Languages"
              labelAlign="right"
              name={'languages'}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }} rules={[{ required: true, message: "Select atleast 1 Language" }]}>
              <Select
                className="w-full text-lg" key={"language-select"}
                maxTagCount={3} maxCount={3} showSearch
                placeholder="Select Languages you know"
                mode="tags" options={(indianLanguages).map(
                  (lang) => {
                    return { label: lang.value, value: lang.key }
                  }
                )} >
              </Select>
            </Form.Item>
            <Form.Item label="Select Available Hours"
              name={'workingHours'}
              labelAlign="right"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }} rules={[{ required: true, message: "Select working hours" }]}>
              <Select
                mode="tags"

                className="text-lg" key={"language-select"}
                maxTagCount={1} maxCount={1} showSearch
                placeholder="# of hours available per day"
                options={working_hours} >
              </Select>
            </Form.Item>
            <Form.Item label="Date of Birth"
              labelAlign="right"
              rules={[{ required: true, message: "Please enter dob" }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name={'dob'}
              key={'user-dob'}>
              <DateOfBirthInput key={'input-user-dob'} onChange={onDobChange} />
            </Form.Item>
            <Form.Item label="Select Gender"
              labelAlign="right"
              rules={[{ required: true, message: "Please select Gender" }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name={'gender'}
              key={'user-gender'}>
              <Select
                mode="tags"
                className="text-lg" key={"input-user-gender"}
                maxTagCount={1} maxCount={1} showSearch
                placeholder="Please select Gender"
                options={genders} >
              </Select>
            </Form.Item>
            <Btn
              text="Submit"
              isFullWidth
              color={"yellow"}
              customClass="md:col-span-2 mt-4"
            />

          </Form>

        </div>
      </div>

    </MaxWidthWrapper>
  );
};

export default BecomeSaarthi;
