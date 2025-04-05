// src/components/PremiumPop.tsx
import React from "react";
import CustomModal from "../Modal";
import Btn from "../button";
import { usePremium } from "@/context/PremiumContext";
import { useAppSelector } from "@/store/store";
import { useRouter } from 'next/navigation';

const PremiumPop = () => {
    const { isOpen, closePremiumFeature } = usePremium();
    const navigation = useRouter()
    const userSelector = useAppSelector(state => state.authUserReducer.data);

    const captureInterst = async () => {
        closePremiumFeature()
        navigation.push("/subscription");
    }

    return (
        <div>
            {isOpen && (
                <CustomModal
                    open={true}
                    onClose={closePremiumFeature}
                    bgColor="white"
                    isFullWidth={false}
                    fullScreen={false}
                >
                    <div className="flex flex-col justify-center items-center p-10 z-[9999]">
                        <img
                            className="m-5"
                            src={`/fullDiamond.png`}
                            alt="Subscription-plan-image"
                            height={180}
                            width={180}
                        />
                        <h1 className="font-heavyFont text-3xl text-center">
                            This is a Premium Feature!!
                        </h1>
                        <p className="text-center">
                            To access this exclusive feature and enjoy a host of
                            other
                            <br /> benefits, you need to be a subscribed member.
                        </p>
                        <Btn
                            onClick={() => captureInterst()}
                            customClass="mt-5"
                            isDisabled={userSelector?.isPaidUser}
                            text={userSelector?.isPaidUser ? "Congratulations on being a Club Sukoon member." : "I am interested"}
                            color="primaryYellow"
                            size="large"
                        />
                    </div>
                </CustomModal>
            )}
        </div>
    );
};

export default PremiumPop;
