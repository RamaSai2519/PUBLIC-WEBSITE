import { SaarthiList } from "@/store/api/interface";
import { useSaarthiListApiQuery } from "@/store/api/saarthiListApi";
import { useAlerts } from "@/store/slices/Alerts/action";
import { Raxios } from "@/utils/axiosHelper";
import { checkEligibility } from "@/utils/paymentUtils";

import { useCallback, useState } from "react";

export const useCall = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [clickedSaarthi, setClickedSaarthi] = useState<
    SaarthiList | undefined
  >();
  const { setErrorMessage } = useAlerts();

  const [popMsg, setPopMsg] = useState({
    title: "",
    cta: "",
  });
  const { refetch } = useSaarthiListApiQuery("aa");
  const makeCall = useCallback(
    async (saarthiId: string, userId: string,sarathiDetails:string) => {
     let fetchTokenForCall =  await checkEligibility(userId, "perform", sarathiDetails === 'expert' ? "expert_calls" : "sarathi_calls");
      try {
        setLoading(true);
        await Raxios({
          method: "POST",
          url: "/actions/call",
          data: {
            expert_id: saarthiId,
            user_id: userId,
            wait: false
          },
          headers:{
            Authorization: `Bearer ${fetchTokenForCall}`
          }
        })
        setPopMsg({
          title: "You are speaking with",
          cta: "Ongoing call",
        });
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        if (error?.response?.data?.error?.message === "Saarthi is offline") {
          setClickedSaarthi(undefined);
          refetch();
        }
        setErrorMessage(error?.response?.data?.error?.message);
        // console.log(error, "error making call");
      }
    },
    [refetch, setErrorMessage]
  );

  return {
    makeCall,
    loading,
    popMsg,
    setPopMsg,
    clickedSaarthi,
    setClickedSaarthi,
  };
};
