import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import { saarthiApiResponse } from "./interface";
import { AWS_URL } from "@/utils/axiosHelper";

// Define a service using a base URL and expected endpoints
export const saarthiList = createApi({
  reducerPath: "saarthiListApi",
  baseQuery: fetchBaseQuery({
    baseUrl: AWS_URL
  }),
  tagTypes: ["saarthiListApi"],
  endpoints: (builder) => ({
    saarthiListApi: builder.query({
      query: () => `actions/expert`,
      keepUnusedDataFor: 0.005,
      transformResponse: (response: saarthiApiResponse, meta, args) => {
        return response?.output_details || [];
      },
    }),
  }),
});

export const { useSaarthiListApiQuery } = saarthiList;
