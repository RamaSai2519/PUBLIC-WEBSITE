import { AWS_URL } from "@/utils/axiosHelper";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserResponse } from "./interface";


export const StatsApi = createApi({
    reducerPath: "statsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: AWS_URL
    }),
    tagTypes: [''],
    endpoints: (builder) => ({
        statsApi: builder.query({
            query: (phoneNumber) => {

                return {
                    url: `actions/user?phoneNumber=${phoneNumber}`
                }
            },
            transformResponse: (baseQueryReturnValue: UserResponse) => {
                return baseQueryReturnValue
            },
        })
    })
})


export const {
    useLazyStatsApiQuery,
    useStatsApiQuery
} = StatsApi