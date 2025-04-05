import axios from "axios"
import { AWS_URL } from "./axiosHelper"

const cashfreeConfig = {
    "APP_ID": "TEST102789038ae976e3fbbc30921f6f30987201",
    "SECRET_KEY": "cfsk_ma_test_c05c620df7e15efa2a1aa28db78b812b_581b676c"
}

interface paymentObjInterface {
  user_id: string;
  order_amount: number;
  event_id?: string;
  pay_type?: 'club' | 'event' | 'code' | 'sarathiBal' | 'expertBal';
}

const initiatePaymentApi = async ({
  user_id,
  order_amount,
  event_id = "tes",
  pay_type = "club", 
}: paymentObjInterface) => {
  const paymentResponse = await axios({
    baseURL: AWS_URL + "/actions/create_payment_order",
    method: "POST",
    data: {
      user_id: user_id,
      order_amount: order_amount,
      event_id: event_id  == "tes" ? null : event_id,
      pay_type: pay_type,
      plan:'club'
    },
  });

  return paymentResponse.data;
};

/**
 * 
 * @param user 
 * @param intent | "perform"
 * @param balance | "expert_calls" | "sarathi_calls" | "free_events" | "paid_events"
 * @returns jwt token -> pass it into the actual API 
 */

const checkEligibility = async (user: string,intent="perfrom", balance:"expert_calls" | "sarathi_calls" | "free_events" | "paid_events" ) => {

  const response = await axios({
    baseURL: AWS_URL + "/actions/eligibility",
    method: "POST",
    data: {
      user,
      intent,
      balance
    },
  });

  return response.data.output_details.token;
  
};
export { cashfreeConfig, initiatePaymentApi, checkEligibility }