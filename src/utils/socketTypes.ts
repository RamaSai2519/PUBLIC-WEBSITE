export type SocketCallCompletedData = {
  userId: string;
  expertName: string;
  duration: string;
  isSuccess: boolean;
};

export type SocketCallExpertData = {
  expertId: string;
  status: string | null;
};

export type StatusJSON = {
  type: "expertStatus" | "callCompleted";
  data: SocketCallCompletedData | SocketCallExpertData;
};
