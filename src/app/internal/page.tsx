'use client'
import Btn from "@/components/button";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import PricingTable from "@/components/PricingTable";
import { usePremium } from "@/context/PremiumContext";
import { enableLoginModal } from "@/store/slices/loginModalSlice";
import { useAppSelector } from "@/store/store";
import { getCookie, Raxios } from "@/utils/axiosHelper";
import axios from "axios";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid4 } from 'uuid';
//@ts-ignore
import { load } from '@cashfreepayments/cashfree-js';
import { initiatePaymentApi } from "@/utils/paymentUtils";
import { useLazyGetUserProfileQuery } from "@/store/api/loginApi";
import { setAuthUserDetail } from "@/store/slices/userInfoAuthSlice";
import { useAppDispatch } from "@/store/hooks";
import { setLoading } from "@/store/slices/loadingSlice";
import LoadingComponent from "@/components/loadingComponent/LoadingComponent";
import { message } from "antd";
import { trackEvent } from "@/context/Amplitude/AmplitudeInit";
import { basePrice } from "@/utils/constants";
const SubscriptionPage = () => {
    const uuid = uuid4();
    const amount = 999;
    const payeeAddress = 'MSTHREEDOTSDASHPRIVATELIMITED.eazypay@icici';
    const payeeName = 'M/S Three Dots & Dash Pvt. Ltd.';
    const transactionNote = 'Payment for Club Sukoon Membership';
    const userSelector = useAppSelector((state: any) => state.authUserReducer.data)
    const upiLink = `upi://pay?pa=${payeeAddress}&pn=${payeeName}&tid=${uuid}&tn=${transactionNote}&am=${basePrice}&cu=INR&gstIn=29AAKCT7222N1ZO&url=https://sukoonunlimited.com/subscription`;

    const dispatchAction = useDispatch();
    const dispatcher = useAppDispatch();
    const { isOpen, closePremiumFeature } = usePremium();
    const navigation = useRouter()
    const [paymentStatus, setPaymentStatus] = useState({})
    const [isInterested, setIsInterested] = useState('0');
    const [fetchUserProfile, { data, isFetching, isLoading, isSuccess }] = useLazyGetUserProfileQuery();

    useEffect(() => {
        if (isSuccess) {
            dispatchAction(setLoading(false))
        }
        else if (isFetching || isLoading) {
            dispatchAction(setLoading(true))
        }
    }, [isLoading, isFetching, isSuccess])
    useEffect(() => {
        try {

            let isLocalIsIntersted = localStorage.getItem("capturedInterst");
            if (isLocalIsIntersted) setIsInterested(isLocalIsIntersted);
        } catch (error) {

        }
    }, [isOpen])

    const postPaymentVerifyStatus = async () => {
        const fetchuserToken = await getCookie("userToken");
        const userCookieToken = fetchuserToken?.value?.value;
        if (userCookieToken) {
            fetchUserProfile(userCookieToken).then(async (res: any) => {
                const apiData = res.data;
                if (apiData) dispatcher(setAuthUserDetail(apiData));
            });
        }
    }

    const captureInterst = async () => {
        if (!userSelector?._id) {
            dispatchAction(enableLoginModal({
                showLoginModal: true,
                modalHeading: "Hello",
                modalDescription: "Don't miss out on exciting features exclusively available for Club Sukoon members. Start the journey now"
            }));
            return
        }
        setIsInterested('1');
        try {
            await Raxios.post('/actions/club', {
                user_id: userSelector?._id,
                isInterested: true
            })
            localStorage.setItem('capturedInterst', '1');
        } catch (error) {
            localStorage.setItem('capturedInterst', '1');
        }
    }


    
    const initiatePayment = async () => {
        trackEvent('subscribe-now-clicked')
        captureInterst()
        dispatchAction(setLoading(true))
        const cashfree = await load({
            mode: "production" //or production
        });
        let apiResponse = await initiatePaymentApi({ user_id: userSelector?._id, order_amount: 2999, pay_type:"club" }).catch(err => {
            dispatchAction(setLoading(false))
        })
        let checkoutOptions = {
            paymentSessionId: apiResponse?.output_details?.payment_session_id,
            redirectTarget: "_self" //optional ( _self, _blank, or _top)
        }
        cashfree.checkout(checkoutOptions).then((result: any) => {
            if (result.error) {
                dispatchAction(setLoading(false))
                // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
                // console.log("User has closed the popup or there is some payment error, Check for Payment Status");
                postPaymentVerifyStatus()
                // console.log(result.error);
            }
            if (result.redirect) {
                dispatchAction(setLoading(false))
                // This will be true when the payment redirection page couldnt be opened in the same window
                // This is an exceptional case only when the page is opened inside an inAppBrowser
                // In this case the customer will be redirected to return url once payment is completed
                // console.log(result, "Payment will be redirected");
                postPaymentVerifyStatus()
            }
            if (result.paymentDetails) {
                // console.log(result, "Payment will be redirected");
                dispatchAction(setLoading(false))
                // This will be called whenever the payment is completed irrespective of transaction status

                postPaymentVerifyStatus()
            }
        }).catch((error: any) => {
            // console.log(error);
            message.destroy();
            message.error("Something went Wrong", 3);
            dispatchAction(setLoading(false))
        });
    }


    return (
        <div className="px-8 py-4 sm:py-4">
            <LoadingComponent />
            {/* {paymentStatus === 'true' ?  <FailedPayment amount={10} transactionId="qs" visible={true} onClose={() =>  setPaymentStatus(false)} /> : <></>} */}
            <MaxWidthWrapper>

                <div className="flex flex-col items-center justify-center my-4">
                    <div className="text-xl mb-2 font-normalFont md:text-4xl flex flex-row">
                        Club Sukoon Membership
                    </div>
                    <div className="items-center justify-center gap-2 flex flex-col">
                        <p className="text-base font-normalFont text-center">
                            Join an exclusive Club of Seniors who will get unlimited benefits and play an integral role in shaping the company. Limited seats available!
                        </p>
                        <p className="text-base font-normalFont text-center">
                            Become Club Sukoon member for ONLY Rs {amount} for one year. This is our way of saying Thank You for being our pioneers.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-8 justify-center items-center">
                    <PricingTable />
                    {!userSelector.isPaidUser ? <Btn text="Subscribe Now" onClick={() => initiatePayment()} color="primaryYellow" size="large" textColor="black" /> :
                        <p className="text-center font-normalFont text-lg">Congratulations on becoming a Club Sukoon member.</p>}

                </div>

                {/* {<>
          {userSelector?._id && isInterested == '1' ? <div className="px-8 py-8">
            <div className="text-3xl font-heavyFont mb-5">Payment Details</div>
            <div className="border-b border-gray-300 mb-8"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col     w-full md:w-1/2 shadow-xl rounded-2xl p-6">
                <div className="flex flex-col items-center justify-center mb-4 ">
                  <Image
                    src="/ClubSukoonQR.jpg"
                    width={160}
                    height={160}
                    alt="QR Code for Payment"
                  />
                  <p className="text-center text-lg font-semibold mt-2">SCAN and Pay</p>
                </div>
                <div className="text-sm text-gray-700 text-center">
                  <p>M/S Three Dots & Dash Pvt. Ltd.</p>
                  <p className="mt-1 font-heavyFont text-wrap flex-wrap break-words">
                    {payeeAddress}
                  </p>
                </div>
              </div>
              <div className="flex flex-col     w-full md:w-1/2 shadow-xl rounded-2xl  p-6">
                <h2 className="text-2xl font-heavyFont mb-4">Details for Bank Transfer</h2>
                <p className="text-gray-700">
                  <span className="font-semibold">Bank Name:</span> ICICI Bank Ltd<br />
                  <span className="font-semibold">Account Name:</span> Three Dots & Dash Pvt. Ltd.<br />
                  <span className="font-semibold text-primaryGreen text-green font-heavyFont">Account Number:</span>
                  <span className="text-primaryGreen text-green font-heavyFont">482105000125</span><br />
                  <span className="font-semibold text-green font-heavyFont">IFSC Code:</span>
                  <span className="text-primaryGreen text-green font-heavyFont">ICIC0000047</span><br />
                  <span className="font-semibold">Address:</span> Koramangala, Bangalore, 560030<br />
                </p>
              </div>

              <div className="flex flex-col    w-full md:w-1/2 shadow-xl rounded-2xl  p-6 md:hidden border-primaryYellow">
                <h2 className="text-2xl font-heavyFont mb-4">UPI Payment</h2>
                <p className="text-gray-700 mb-4">
                  You can also pay using UPI. Click the buttons below to open your UPI payment app and proceed with the payment.
                </p>
                <div className="flex flex-col gap-4">
                  <a
                    href={upiLink}
                    className="bg-green text-white rounded-lg px-4 py-2 text-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open UPI App
                  </a>


                </div>
              </div>
            </div>
          </div> : <div className="flex flex-1 px-8 py-8 justify-center items-center">
            <Btn text="I am Interested" onClick={() => captureInterst()} color="primaryYellow" size="large" textColor="black" />
          </div>
          }
        </>} */}
            </MaxWidthWrapper>
        </div>
    );
};

export default SubscriptionPage;
