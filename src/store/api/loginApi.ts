import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userAuthResponse } from "../slices/userInfoAuthSlice";
import { AWS_URL, setCookie } from "@/utils/axiosHelper";


interface loginResponse {
  success?: boolean;
  data?: loginData;
  error?: any;
}


export interface LoginData {
  _id?: string;
  name?: string;
  phoneNumber?: string;
  city?: string;
  isBusy?: boolean;
  active?: boolean;
  birthDate?: string;
  createdDate?: string;
  numberOfCalls?: number;
  customerPersona?: string;
  isPaidUser?: boolean;
  profileCompleted?: boolean;
}

export interface UserStatsResponse {
  success: boolean;
  data: {
    user: LoginData;
    calls: {
      data: any[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
      };
    };
    events: {
      data: {
        eventName: string;
        source: string;
        repeat: string;
        dob: string;
      }[];
      pagination: {
        currentPage: number;
        totalPages: number;
        totalRecords: number;
      };
    };
  };
  error?: any;
}

interface otpDataResponse {
  token?: string;
  data?: loginData
}
interface otpResponse {
  success?: boolean;
  data?: otpDataResponse;
  error?: any;
}
interface editProfileResponse {
  success?: boolean;
  data?: loginData;
  error?: any;
}
interface loginData {
  _id?: string;
  name?: string;
  phoneNumber?: string;
  city?: string;
  isBusy?: boolean;
  active?: boolean;
  birthDate?: string;
  createdDate?: string;
  numberOfCalls?: number;
  customerPersona?: string;
  profileCompleted?: boolean;
}
export interface editProfile {
  name?: string;
  city?: string;
  birthDate?: string;
  userToken: string;
}

export const LoginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: AWS_URL,
  }),
  tagTypes: ["loginApi"],
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (token) => {
        return {
          url: `/user/profile`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        };
      },
      transformResponse: (response: userAuthResponse) => {
        return response?.data ? response.data : {};
      },
    }),
    editProfile: builder.mutation({
      query: (body: editProfile) => {
        return {
          url: `/user/edit`,
          method: "POST",
          body: body
        };
      },
      transformResponse: (response: editProfileResponse) => {
        return response;
      },
    }),
    getUserStats: builder.query<UserStatsResponse, string>({
      query: (userId) => ({
        url: `actions/user`,
        params: { user_id:userId },
      }),
      keepUnusedDataFor: 300, // Cache for 5 minutes
    }),
    getUserStatsByPhone: builder.query<UserStatsResponse, string>({
      query: (phoneNumber: string) => ({
        url: `actions/user`,
        params: { phoneNumber: phoneNumber },
      }),
      keepUnusedDataFor: 300, // Cache for 5 minutes
    }),
  }),

});





export const {
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
  useEditProfileMutation,
  useLazyGetUserStatsQuery,
  useGetUserStatsQuery,
  useGetUserStatsByPhoneQuery,
  useLazyGetUserStatsByPhoneQuery
} = LoginApi;
