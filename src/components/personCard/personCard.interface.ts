import appTheme from "@/theme";
import { SocketCallExpertData } from "@/utils/socketTypes";

export interface PersonCardProps {
  saarthiId?: string;
  displayScore?: string;
  bgColor?: keyof typeof appTheme.colors;
  image?: string;
  name?: string;
  status?: string;
  sarthiStatus: SocketCallExpertData | null;
  score?: number;
  languages?: string[];
  type?: "saarthi" | "expert";
  isSpeakNowEnabled?: boolean;
  actionCtaText?: string;
  intersts?: string[];
  detailedDetail?: string;
  aboutList?: string[];
  isVerified?: boolean;
  isTrusted?: boolean;
  isActive?: boolean;
  isHandpicked?: boolean;
  isRecommended?: boolean;
  isExpert?: boolean;
  isReadMore?: boolean;
  videoUrl?: string;
  isBusy?: boolean;
  onVideoClick?: (sarthiName: string) => void;
  onClick: () => void;
}
