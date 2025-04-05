import { SocketCallCompletedData } from "@/utils/socketTypes";

export type ThankYouProps = {
  closeThankYou: () => void;
  callStatus: SocketCallCompletedData | null;
};
