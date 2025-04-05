import { AWS_URL } from "@/utils/axiosHelper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthUserDetail, userAuthResponse } from "../slices/userInfoAuthSlice";



interface Event {
    _id: string;
    phoneNumber: string;
    userId: string;
    eventName: string;
    source: string;
    isNewUserRecord: boolean;
    repeat: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    name?: string; // Optional, since it's only present in the first event
}

interface OutputDetails {
    _id: string;
    phoneNumber: string;
    otp: string;
    email: string;
    expiresOtp: string;
    isBusy: boolean;
    active: boolean;
    isPaidUser: boolean;
    birthDate: Date;
    createdDate: string;
    numberOfCalls: number;
    numberOfGames: number;
    profileCompleted: boolean;
    isBlocked: boolean;
    refCode: string;
    name: string;
    calls: any[]; // Assuming this is an array of objects, provide the specific type if known
    events: Event[];
    referrals: any[]; // Assuming this is an array of objects, provide the specific type if known
    customerPersona: Record<string, any>; // Assuming this is an object, replace with specific type if known
}
export interface editProfile {
    name?: string;
    city?: string;
    birthDate?: string;
    userToken: string;
}
interface validateOTPResponse {

    "output_status": "FAILURE" | "SUCCESS",
    "output_message": "Invalid OTP" | "OTP validated successfully",
    "output_details": OutputDetails | {}

}

export interface userPayload {
    "refCode"?: string,
    "city"?: string,
    "email"?: string,
    "birthDate"?: string,
    "name"?: string,
    "phoneNumber": string
}
export const NewLoginApi = createApi({
    reducerPath: "newLoginApi",
    baseQuery: fetchBaseQuery({
        baseUrl: AWS_URL,
    }),
    tagTypes: ["newLoginApi"],
    endpoints: (builder) => ({
        sendOtp: builder.mutation<validateOTPResponse, { phoneNumber: string }>({
            query: ({ phoneNumber }) => {
                return {
                    url: `/actions/send_otp`,
                    method: "POST",
                    body: {
                        phone_number: phoneNumber
                    }
                }
            },
            transformResponse: (response: validateOTPResponse) => {
                return response
            }
        }),
        verifyOtp: builder.mutation<validateOTPResponse, { phoneNumber: string, otp: string }>({
            query: ({ phoneNumber, otp }) => {
                return {
                    url: `/actions/validate_otp`,
                    method: "POST",
                    body: {
                        phone_number: phoneNumber,
                        otp,
                        user_type: "user"
                    },

                }
            },
            transformResponse: (response: validateOTPResponse) => {
                return response
            }
        }),
        updateUserMetaOrReferral: builder.mutation<validateOTPResponse, userPayload>({
            query: (userPayload: userPayload) => {
                return {
                    url: `/actions/user`,
                    method: "POST",
                    body: userPayload
                }
            },
            transformResponse: (response: validateOTPResponse) => {
                return response
            }
        })
    }),

});

export const {
    useSendOtpMutation,
    useVerifyOtpMutation,
    useUpdateUserMetaOrReferralMutation
} = NewLoginApi;
