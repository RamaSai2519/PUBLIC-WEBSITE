"use client";

import { Input, Button, Form, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import "tailwindcss/tailwind.css";
import { useAppDispatch } from "@/store/hooks";
import {
  disableFooter,
  disableHeader,
  enableFooter,
  enableHeader,
  hideShare,
} from "@/store/slices/globalConfigSlice";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { AWS_URL, createUserByExternal, Raxios, sendWaMessage } from "@/utils/axiosHelper";
import Link from "next/link";
import Logo from "@/components/logo";
import DateOfBirthInput from "@/components/DateOfBirthInput";
import { differenceInYears, format, parseISO } from "date-fns";
import { setLoading } from "@/store/slices/loadingSlice";
import { trackEvent } from "@/context/Amplitude/AmplitudeInit";
import LoadingComponent from "@/components/loadingComponent/LoadingComponent";
import { checkEligibility, initiatePaymentApi } from "@/utils/paymentUtils";
import { useLazyStatsApiQuery } from "@/store/api/statsApi";
import { useSearchParams } from "next/navigation";
//@ts-ignore
import { load } from "@cashfreepayments/cashfree-js";

const EventRegister: React.FC = () => {
  const searchParams = useSearchParams();
 
  const isCityQueryParam = searchParams.get("isCity") === "1"; // Extract from URL
  const [isCity, setIsCity] = useState(false);
 
  const [userId, setUserId] = useState("");
  useEffect(() => {
    setIsCity(isCityQueryParam);
  }, [isCityQueryParam]);

  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission
  const [successMessage, setSuccessMessage] = useState(
    "Registration successful! Thank you for registration."
  ); // Message to display on success
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [cities, setCities] = useState([
    "Delhi/ NCR",
    "Mumbai",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Dehradun",
    "Goa",
    "Ahmedabad",
  ]);
  const [
    fetchUserDetailByPhone,
    { data: statsData, isError: statsError, isLoading: statsLoading },
  ] = useLazyStatsApiQuery();
  const navigation = useRouter();
  const dispatcher = useAppDispatch();
  const pathName = usePathname();
  const urlEventSlug = pathName.replace("/", "");
  const [formData, setFormData] = useState({
    name: statsData?.output_details.name || "",
    phoneNumber: "",
    city: "",
    dob: null,
  });

  const headerFooterAction = (isVisible: boolean) => {
    if (isVisible) {
      dispatcher(enableHeader());
      dispatcher(enableFooter());
    } else {
      dispatcher(disableHeader());
      dispatcher(disableFooter());
    }
  };

  useEffect(() => {
    headerFooterAction(false);
    return () => headerFooterAction(true);
  }, []);

  const [eventConfig, setEventConfig] = useState({
    _id: "",
    name: "",
    mainTitle: " ",
    subTitle: "",
    description: "",
    slug: "",
    imageUrl: "",
    validUpto: "",
    eventType: "",
    hostedBy: "",
    guestSpeaker: "",
    meetingLink: "",
    startEventDate: "",
    eventPrice: 0,
    isPremiumUserOnly: false,
  });

  const fetchEventConfig = async () => {
    dispatcher(hideShare());
    try {
      const response = await Raxios.get("/actions/list_events", {
        params: { slug: pathName.replace("/", "") },
      });
      setEventConfig(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
    }
  };

  useEffect(() => {
    fetchEventConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: any, dateString: string) => {
    setFormData({
      ...formData,
      //@ts-ignore
      dob: dateString,
    });
  };

  const updatePaymentStatusForUser = async (values: any) => {
    const token = await checkEligibility(
      values._id || userId,
      "perform",
      eventConfig?.isPremiumUserOnly ? "paid_events" : "free_events"
    );
    dispatcher(setLoading(true));

    const response: any = await axios({
      method: "POST",
      url: `${AWS_URL}/actions/upsert_event_user`, // combine full URL
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        phoneNumber: values.phoneNumber.slice(-10),
        isUserPaid: true,
        send_wa: isCity ? false : true,
        source: urlEventSlug ||  eventConfig.slug,
        city: values.city || '',
      },
    }).catch((e) => {
      dispatcher(setLoading(false));
    });

    if (response?.data?.output_status === "SUCCESS") {
      setIsSubmitted(true); // Set submission state to true
      dispatcher(setLoading(false));
      setSuccessMessage("Registration successful! Thank you for registration."); // Set success message
    } else {
      message.error(response?.data?.output_message || "Something went wrong");
      dispatcher(setLoading(false));
    }
  };
  const handleSubmit = async (values: any) => {
    try {
      trackEvent(`user-${eventConfig?.slug} `, {
        ...values,
      });
      dispatcher(setLoading(true));
      const userPhoneNumber = values.phoneNumber.slice(-10);
      const currentDate = new Date();
      if (differenceInYears(currentDate, values?.dob) < 30) {
        message.error("Please enter your Date of Birth");
        dispatcher(setLoading(false));
        return;
      }
      if (isCity && !values.city) {
        message.error("Please select a city");
        dispatcher(setLoading(false));
        return;
      }
      const token = await checkEligibility(
        values._id || userId,
        "perform",
        eventConfig?.isPremiumUserOnly ? "paid_events" : "free_events"
      );
      const dataPayload: any = {
        phoneNumber: userPhoneNumber,
        name: values.name,
        source: urlEventSlug || eventConfig.slug,
        dob: values?.dob ? values?.dob["dob"] : values?.birthDate || null,
        eventName: eventConfig.mainTitle,
        advSeenOn: eventConfig.slug,
        city: values.city || '',
      };
      // Include city in the API payload only if `isCity` is true
      if (isCity) {
        dataPayload.city = values.city;
      }
      const response: any = await axios({
        method: "POST",
        url: `${AWS_URL}/actions/upsert_event_user`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          phoneNumber: values.phoneNumber.slice(-10),
          name: values.name,
          source: urlEventSlug || eventConfig.slug,
          dob: values?.dob ? values?.dob["dob"] : values?.birthDate || null,
          eventName: eventConfig.mainTitle,
          advSeenOn: eventConfig.slug,
          city: values.city || '',
        },
      }).catch((e) => {
        dispatcher(setLoading(false));
        console.log("Axios error:", e.response?.data || e.message);
      });

      if (response?.data?.output_status === "SUCCESS") {
        let userInformation = await fetchUserDetailByPhone(
          values.phoneNumber.slice(-10)
        ).unwrap();

        if (!eventConfig.isPremiumUserOnly) {
          sendWaMessage(userPhoneNumber, {
            topic_name: eventConfig.mainTitle,
            date_and_time: format(
              eventConfig.startEventDate,
              "dd MMM yyyy HH:mm"
            ),
            custom_text: eventConfig.subTitle,
            speakers_name: eventConfig.guestSpeaker,
            event_name: eventConfig.mainTitle,
            image_link: eventConfig.imageUrl,
            phone_number: "+918660610840",
            user_name: values.name || userInformation.output_details.name,
            webinar_link: eventConfig.meetingLink,
            whatsapp_community_link:
              "https://sukoonunlimited.com/wa-join-community",
          });
        }
        if (
          eventConfig.isPremiumUserOnly &&
          !userInformation.output_details.isPaidUser
        ) {
          initiatePayment(
            userInformation.output_details._id,
            eventConfig.eventPrice || 100
          ).then((res) => {
            dispatcher(setLoading(false));
            //@ts-ignore
            if (res == true) {
              sendWaMessage(userPhoneNumber, {
                topic_name: eventConfig.mainTitle,
                date_and_time: format(
                  eventConfig.startEventDate,
                  "dd MMM yyyy HH:mm"
                ),
                custom_text: eventConfig.subTitle,
                speakers_name: eventConfig.guestSpeaker,
                event_name: eventConfig.mainTitle,
                image_link: eventConfig.imageUrl,
                phone_number: "+918660610840",
                user_name: userInformation.output_details.name,
                webinar_link: eventConfig.meetingLink,
                whatsapp_community_link:
                  "https://sukoonunlimited.com/wa-join-community",
              });
            }
          });
        }
        setIsSubmitted(true); // Set submission state to true
        dispatcher(setLoading(false));
        setSuccessMessage(
          "Registration successful! Thank you for registration."
        ); // Set success message
      } else {
        message.error(response?.data?.output_message || "Something went wrong");
        dispatcher(setLoading(false));
      }
    } catch (error) {
      console.error("Submission failed: ", error);
      setSuccessMessage("Registration failed. Please try again."); // Handle error case
    }
  };

  const initiatePayment = async (userId: string, amount: number) => {
    dispatcher(setLoading(true));
    const cashfree = await load({
      mode: "production", //or sandbox || production
    });

    let apiResponse = await initiatePaymentApi({
      user_id: userId,
      event_id: eventConfig.slug || "",
      order_amount: amount,
      pay_type: "event",
    }).catch((err) => {
      dispatcher(setLoading(false));
    });
    let checkoutOptions = {
      paymentSessionId: apiResponse?.output_details?.payment_session_id,
      redirectTarget: "_self", //optional ( _self, _blank, or _top or _modal)
    };
    cashfree
      .checkout(checkoutOptions)
      .then((result: any) => {
        if (result.error) {
          dispatcher(setLoading(false));
          // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
        }
        if (result.redirect) {
          return false;
          dispatcher(setLoading(false));

          // This will be true when the payment redirection page couldnt be opened in the same window
          // This is an exceptional case only when the page is opened inside an inAppBrowser
          // In this case the customer will be redirected to return url once payment is completed
          // console.log(result, "Payment will be redirected");
        }
        if (result.paymentDetails) {
          message.success("Your Payment is successful");
          updatePaymentStatusForUser(statsData?.output_details);
          return true;

          // This will be called whenever the payment is completed irrespective of transaction status
        }
        return false;
      })
      .catch((error: any) => {
        // console.log(error);
        message.destroy();
        message.error("Something went Wrong", 3);
        return false;
        dispatcher(setLoading(false));
      });
  };

  const emptyFunction = () => {

  }
  const validateUserByPhone = async (evt: any) => {
    let phoneNumber = evt.target.value;
    if (phoneNumber.length >= 10) {
      setValidPhoneNumber(true);
      try {
        let userStatsApiResponse = await fetchUserDetailByPhone(
          phoneNumber.slice(-10)
        ).unwrap();
  
        let { name, birthDate, _id } = userStatsApiResponse.output_details;
        setUserId(_id);
  
        if (name && birthDate && !isCity) {
          handleSubmit(userStatsApiResponse.output_details);
        }
      } catch (error) {
        // If fetchUserDetailByPhone throws an error, call createUserByExternal
        //@ts-ignore
        createUserByExternal({
          phoneNumber: phoneNumber.slice(-10),
          name: "",
          refSource: urlEventSlug || eventConfig.slug,
          birthDate: "",
          city: "",
        }).then(async (res)=>{
          let userStatsApiResponse = await fetchUserDetailByPhone(
            phoneNumber.slice(-10)
          ).unwrap();
    
          let { _id } = userStatsApiResponse.output_details;
          setUserId(_id);
        });
      }
    } else {
      setValidPhoneNumber(false);
    }
  };
  // const send_event_wa_message = async () => {
  //   // sendWaMessage()
  // }

  return (
    <>
      <head>
        <title>{eventConfig.mainTitle || "Event"}</title>
        <meta name="description" content={eventConfig.subTitle || "Event"} />
        <meta property="og:title" content={eventConfig.mainTitle || "Event"} />
        <meta
          property="og:description"
          content={eventConfig.subTitle || "Event"}
        />
        <meta property="og:image" content={eventConfig.imageUrl} />
        <meta
          property="og:url"
          content={`https://sukoonunlimited.com/${eventConfig.slug}`}
        />
        <meta property="og:type" content="website" />
      </head>
      <LoadingComponent />
      <div>
        <div className="min-h-screen 0 mx-auto max-w-md h-[1060px] md:h-[1200px] lg:h-[1200px] flex flex-col ">
          <div className="top-0 top-major border-primaryYellow border-1 p-4 gap-4">
            <div className="flex flex-row justify-between">
              <div className="inline-flex gap-2">
                <p className="text-2xl font-base">Sukoon </p>
                <p className="text-2xl font-base">Unlimited</p>
              </div>
              <div className="w-12">
                <Link className="cursor-pointer" href={"/"}>
                  <Logo variant="vertical" />
                </Link>
              </div>
            </div>
          </div>

          {/* Event Image and Title Section */}
          <div style={{ position: "relative", backgroundColor: "white" }}>
            <div className=" w-full p-2 rounded-t-md shadow-sm">
              <span>
                {eventConfig.startEventDate ? (
                  <p className="font-boldFont text-black text-base">{`Event Time: ${format(
                    eventConfig.startEventDate,
                    isCity ? "h a" : "h:mm a"
                  )} Onwards`}</p>
                ) : (
                  ""
                )}
                {!isCity && eventConfig.guestSpeaker ? (
                  <p className="font-mediumFont text-black text-base">{`Speaker: ${eventConfig.guestSpeaker}`}</p>
                ) : (
                  ""
                )}
              </span>
            </div>
            <div className="relative top-5 flex justify-center items-center w-full aspect-square bg-gray-300">
              <Image
                src={eventConfig.imageUrl}
                alt="Event"
                layout="fill"
                objectFit="fill"
                objectPosition="center"
                className="rounded-lg shadow-2xl"
              />
            </div>

            {/* Conditional Rendering for Input Form or Success Message */}
            {!isSubmitted ? (
              <div className="mb-3 ">
                <div className="absolute  p-4 mt-2 rounded-lg shadow-sm">
                  <span>
                    <p
                      className="text-lg font-boldFont"
                      style={{ fontWeight: "bolder" }}
                    >
                      {eventConfig.mainTitle || "EVENT NAME"}
                     
                    </p>

                    <p className="text-sm text-black font-base md:text-sm mt-2">
                      {eventConfig.description || "EVENT NAME"}
                    </p>
                   {isCity && <p className="text-sm text-black font-base md:text-sm mt-2">
                      {(eventConfig.subTitle || "EVENT NAME")
                        .split("/n")
                        .map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            {index !== (eventConfig.subTitle || "EVENT NAME").split("\n").length - 1 && <br />}
                          </React.Fragment>
                        ))}
                    </p>}
                    {eventConfig.isPremiumUserOnly && (
                      <p className="text-base text-gray-500 font-base">
                        Event Price - ₹{eventConfig.eventPrice || "100"}{" "}
                      </p>
                    )}
                  </span>

                  <Form onFinish={handleSubmit} className="mt-4 gap-1">
                    <Form.Item
                      name="phoneNumber"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Phone Number",
                        },
                        {
                          min: 10,
                          message: "Mobile number should be 10 digits",
                        },
                        {
                          max: 15,
                          message: "Mobile number should be 10 digits",
                        },
                      ]}
                      className="font-mono"
                    >
                      <Input
                        name="phoneNumber"
                        autoFocus
                        placeholder="Enter Phone Number"
                        onChangeCapture={validateUserByPhone}
                        minLength={10}
                        maxLength={15}
                        autoComplete="tel"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        inputMode="tel"
                        className="text-lg border-white bg-gray-100 font-normalFont text-black"
                      />
                    </Form.Item>

                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Full Name",
                        },
                      ]}
                    >
                      <Input
                        name="name"
                        disabled={isCity ? false : !validPhoneNumber}
                        placeholder="Enter Full Name"
                        className="text-lg border-white bg-gray-100 font-normalFont text-black"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Form.Item>

                    {isCity && (
                      <Form.Item
                        name="city"
                       
                        rules={[
                          {
                            required: true,
                            message: "Please select your city",
                          },
                        ]}
                      >
                        <Select
                          placeholder="Choose city  for coffee meetup"
                          
                          dropdownStyle={{
                            color:"black"
                          }}
                          style={{color:"black"}}
                          className="text-lg border-white bg-gray-100 font-normalFont text-black"
                          disabled={isCity ? false : !validPhoneNumber}
                        >
                          {cities.map((city, index) => (
                            <Select.Option key={`ra12${index}`} value={city}>
                              {city}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    )}
                    <Form.Item
                      label="Date of Birth"
                      name="dob"
                      rules={[
                        {
                          required: true,
                          message: "Please select your Date of Birth",
                        },
                      ]}
                    >
                      <DateOfBirthInput
                        disabled={isCity ? false : !validPhoneNumber}
                        onChange={(e) => handleDateChange}
                      />
                    </Form.Item>
                   

                    <Form.Item>
                      <Button
                        type="primary"
                        className="bg-primaryYellow text-black"
                        htmlType="submit"
                        block
                      >
                        Register Now
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            ) : (
              <div className="pt-5 p-4 rounded-lg shadow-md w-full items-center justify-center">
                <h2 className="text-lg font-semibold text-green-800">
                  Success!
                </h2>
                <p className="text-green-700">{successMessage}</p>
                {!isCity && <Button
                  type="primary"
                  
                  className="bg-primaryYellow text-black w-full"
                  onClick={() =>
                    navigation.push(eventConfig.meetingLink || "/")
                  }
                >
                  Join Now
                </Button>}
              </div>
            )}

            {eventConfig.startEventDate ? (
              <div className="absolute top-20 right-12 bg-yellow-400 shadow-2xl text-white px-3 py-1 rounded-lg z-20">
                <p className="text-black justify-center font-mediumFont text-lg">
                  {format(eventConfig.startEventDate, "MMM").toUpperCase()}
                </p>
                <p className="text-black text-center font-mediumFont text-lg">
                  {format(eventConfig.startEventDate, "dd")}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventRegister;
