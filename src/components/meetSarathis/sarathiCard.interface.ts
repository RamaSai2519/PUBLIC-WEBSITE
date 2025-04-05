import appTheme from "@/theme";
import { SocketCallExpertData } from "@/utils/socketTypes";

export interface SarathiCardProps {
  saarthiId?: string;
  bgColor?: keyof typeof appTheme.colors;
  image?: string;
  name?: string;
  status?: string;
  gameType?: "gk" | "entertainment" | "culture";
  sarthiStatus?: SocketCallExpertData | null | any;
  score?: number;
  languages?: string[];
  categories?:string[] | [];
  highlights?: { icon?: string; text?: string }[] | [];
  sub_category?:string[] | [];
  type?: "saarthi" | "expert";
  isGame?: boolean;
  isSpeakNowEnabled?: boolean;
  actionCtaText?: string;
  intersts?: string[];
  displayScore?: string | undefined | number;
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
  onClick?: () => void;
  onScheduleCallClick?: () => void;
}
