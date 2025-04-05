import { message } from "antd";
import { useCallback, useState } from "react";
import { postData } from "../utils/serverHelper";
import { BaseApiResponse } from "./auth/auth.interface";
import { BecomeSaarthiTypes } from "@/app/become-saarthi/becomeSaarthi.interface";
import { duration } from "@mui/material";

export const useBecomeSaarthi = () => {
  const [loading, setLoading] = useState(false);

  const becomeSaarthi = useCallback(
    async (req: any) => {
      try {   
     
        const data = await postData<BaseApiResponse<BecomeSaarthiTypes>, any>(
          "/actions/applicant",
          req
        );
        alert("You have successfully registered for Saarthi Thank you for your interest. We will get back to you soon.");
        window.location.reload();
      console.log(data);
        return data;
      } catch (error: any) {
        alert(error?.response?.data?.output_message || "Something went wrong");
        window.location.reload();
        error;
      }
    },
    []
  );

  return {
    becomeSaarthi,
    loading,
  };
};
