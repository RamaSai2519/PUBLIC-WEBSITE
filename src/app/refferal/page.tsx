'use client';
import Btn from '@/components/button';
import React from 'react';
import Image from "next/legacy/image";
import ReferAndEarnCard from '@/components/ReferEarn';
import { useDispatch } from 'react-redux';
import { enableLoginModal } from '@/store/slices/loginModalSlice';
import { useAppSelector } from '@/store/hooks';
import { WhatsappShareButton } from 'react-share';

const ReferralPage = () => {
    const dispatcher = useDispatch();
    const appSelector = useAppSelector((state) => state.authUserReducer);
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''; // Get the current domain

    const headerTitle = "Refer & Earn with Sukoon Club!";
    const headerSubtitle = "Invite your friends & win exciting prizes!";

    const mainContent = {
        intro: "Invite your friends & win Rs 200 Amazon Voucher for every Sukoon Club member referred by you! Sukoon Club membership is available at Rs 999 annually for a limited time only!",
        benefit: {
            heading: "It gets better!",
            text: "Your referred friend also gets Rs 100 Amazon Voucher on successfully registering as a Sukoon Club Member.",
        },
        additionalIncentive: {
            heading: "Top 3 Referrers",
            text: "Sukoon users who refer the highest number of Club Sukoon members win cash prizes of INR 3000, 2000, and 1500, respectively. To qualify, a minimum of 15 successful Sukoon Club memberships are required. In the event of a tie, winners will be chosen through a lucky draw.",
        },
        refferalProgram :{
        heading: "Duration",
        text: "This Referral Program is valid till 30th September 2024"
        },
        superReferrer: {
            heading: "Super Referrer of the Month",
            text: "Refer a minimum of 50 people to become Sukoon Club Members, and earn INR 5,000! To qualify, a minimum of 50 successful club memberships are required. In the event of a tie, winners will be chosen through a lucky draw.",
        },
        callToAction: "Start Referring!",
        inviteButtonText: "Click to send an invite to your friend",
        loginButtonText: "Login Now",
    };

    const tableHeaders = {
        members: "Refered Members",
        valueEarned: "Total Amazon Value Earned",
    };

    const trackingData = [
        { members: 0, value: "₹ 0" },

    ];

    const footerTerms = [
        "To become a Club Sukoon member, a user has to pay Rs 999 subscription fees for one year.",
        "This campaign is eligible for Sukoon registered users only.",
        "The Amazon voucher incentive will be realized only if your referral successfully registers as a Sukoon Club member.",
    ];

    const refCode = appSelector?.data?.refCode;
    const userName = appSelector?.data?.name;
    const referMessage = `Hello!

I’m excited to share something special with you— *Sukoon Unlimited!* 🎉 It is India’s first emotional wellness platform made by seniors, for seniors, and it’s designed to enrich our lives.

I am part of Sukoon Unlimited family and would love for you to join too. Enjoy an exclusive offer: sign up for  Sukoon Club membership for Rs 999 annually & enjoy a *₹100 Amazon voucher!* 
    
*Why Sukoon Unlimited?*
*Engage* in community activities and events
*Connect* with like-minded seniors, make new connections, and find support whenever needed
*Participate* in tailor-made wellness programs
    
Don’t miss out—this is a limited-time offer! 🕒
    *CLICK ON THE LINK*`;

    //@ts-ignore
    const onShare = () => {
        if (userName && refCode) {
            return;
        }
        dispatcher(enableLoginModal({
            showLoginModal: true,
            modalHeading: "Refer & Earn",
            modalSubHeading: '',
            modalDescription: "Invite your friends & win Rs 200 Amazon Voucher for every Sukoon Club member referred by you!"
        }));
    };

    return (
        <div className=" min-h-screen flex flex-col items-center p-4">
            {/* Hero Image */}
            <Image
                src="https://s3.ap-south-1.amazonaws.com/sukoon-media/9658504_d57d2722-7dad-4342-9501-0f63faef36b2_Untitled_design.png"
                alt="Hero"
                width={800}
                height={450}
                className="w-full max-w-md mb-6 rounded-lg shadow-lg object-cover"
            />

            {/* Main Container with Max Width */}
            <div className="w-full max-w-md flex flex-col">
                {/* Header Section */}
                <header className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-black mb-2">{headerTitle}</h1>
                    <p className="text-lg text-darkGray">{headerSubtitle}</p>
                </header>

                {/* Main Content Section */}
                <section className="bg-bgColor p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-bold text-black mb-4">How It Works</h2>
                    <p className="text-base text-gray-700 mb-4">{mainContent.intro}</p>
                    <div className="text-base text-gray-700 mb-4">
                        <strong className="text-lg font-heavyFont">{mainContent.benefit.heading}</strong>
                        <p className="font-normalFont">{mainContent.benefit.text}</p>
                    </div>
                    <div className="text-base text-gray-700 mb-4">
                        <strong className="text-lg font-heavyFont">{mainContent.additionalIncentive.heading}</strong>
                        <p className="font-normalFont">{mainContent.additionalIncentive.text}</p>
                    </div>
                    <div className="text-base text-gray-700 mb-4">
                        <strong className="text-lg font-heavyFont">{mainContent.superReferrer.heading}</strong>
                        <p className="font-normalFont">{mainContent.superReferrer.text}</p>
                    </div>

                    <div className="text-base text-gray-700 mb-4">
                        <strong className="text-lg font-heavyFont">{mainContent.refferalProgram.heading}</strong>
                        <p className="font-normalFont">{mainContent.refferalProgram.text}</p>
                    </div>
                    <p className="text-xl font-bold text-gray-700 mb-4">{mainContent.callToAction}</p>
                    {(refCode && referMessage) ? <ReferAndEarnCard url={`${baseUrl}/af/${refCode}`}
                        message={referMessage} /> : <Btn
                        text={mainContent.inviteButtonText}
                        onClick={onShare}
                        color="primaryYellow"
                        isRounded={false}
                        isShadow={true}
                        isFullWidth={true}
                        key={"share"}
                    />}
                </section>

                {/* Tracking Table */}
                <section className="bg-bgColor p-6 rounded-lg shadow-md mb-6 flex-grow">
                    <h2 className="text-2xl font-bold text-black mb-4">{refCode ? "Reffered Club Members" : "Login to see Reffered Club Members"}</h2>
                    {refCode ? <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-green">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                                    {tableHeaders.members}
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-white uppercase tracking-wider">
                                    {tableHeaders.valueEarned}
                                </th>
                            </tr>
                        </thead>
                        <tbody className=" divide-y divide-gray-200">
                            {trackingData.map((data, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.members}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>: <Btn
                        text={mainContent.loginButtonText}
                        onClick={onShare}
                        color="primaryYellow"
                        isRounded={false}
                        isShadow={true}
                        isFullWidth={true}
                        key={"share"}
                    />}
                </section>

                {/* Footer Section */}
                <footer className="mt-6 text-center text-sm text-gray-500">
                    {footerTerms.map((term, index) => (
                        <p key={index} className="mb-2">{`* ${term}`}</p>
                    ))}
                </footer>
            </div>

            {/* Invite Button Section */}
            <div className="flex sm:hidden fixed bottom-0 left-0 right-0 bg-[#FFF6DF] shadow-2xl  items-center  text-center py-4  rounded-t-lg p-8 max-w-md animate-slideUp">
                {userName && refCode ? (
                    <WhatsappShareButton
                        url={`${baseUrl}/af/${refCode}`}
                        className='w-full items-center flex'

                        title={referMessage}
                        separator=":: "
                    >
                        <div className="relative overflow-hidden w-full shadow-lg">
                            <Btn
                                text={mainContent.inviteButtonText}
                                fontSize={'text-2xl'}
                                isFullWidth={true}
                                color="primaryYellow"
                                size="large"
                                isRounded={false}
                                isShadow={true}

                                key={"share"}
                            />
                            {/* Animated Border */}

                        </div>
                    </WhatsappShareButton>
                ) : (
                    <div className="w-full items-center flex shadow-lg">
                        <Btn
                            text={mainContent.inviteButtonText}
                            onClick={onShare}
                            color="primaryYellow"
                            isRounded={false}
                            isShadow={true}
                            isFullWidth={true}
                            key={"share"}
                        />
                        {/* Animated Border */}

                    </div>
                )}
            </div>

        </div>
    );
};

export default ReferralPage;
