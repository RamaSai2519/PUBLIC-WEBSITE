export interface saarthiApiResponse {
  output_message?: string;
  display_message?: string;
  output_details?: SaarthiList[];
  output_status?: string;
  //success?: boolean;
  error?: any;
}
export interface SaarthiList {
  displayScore?: string | number | undefined ;
  _id?: string;
  phoneNumber?: string;
  active?: boolean;
  isBusy?: boolean;
  type?: "saarthi" | "expert";
  isDeleted?: boolean;
  status?: string;
  profileCompleted?: boolean;
  createdDate?: string;
  daysLoggedIn?: number;
  name?: string;
  timeSpent?: number;
  languages?: string[];
  description?: string;
  profile?: string;
  total_score?: number;
  score?: number;
  topics?: string;
  highlights?: Highlight[];
  isGamesPlay?:boolean;
  socketId?: string;
  categories?: Category[];
  saarthiId?: string | undefined;
  repeat_score?: number;
  calls_share?: number;
  video?: string;
  
}
export interface Highlight{
  icon?: string;
  text?: string;
}

export interface Category {
  _id?: string;
  name?: string;
  active?: boolean;
  createdDate?: string;
  __v?: number;
}

export interface loginInterface {
  phoneNumber: string;
}



export interface eventProps  {
  selectedCategory?: "support_groups" | "active_together" | "wellness_connect" | "all"
}





export interface UserResponse {
  output_status: string;
  output_message: string;
  output_details: UserDetails;
}

export interface UserDetails {
  _id: string;
  phoneNumber: string;
  otp: string;
  expiresOtp: string;
  isBusy: boolean;
  active: boolean;
  isPaidUser: boolean;
  createdDate: string;
  numberOfCalls: number;
  numberOfGames: number;
  profileCompleted: boolean;
  birthDate: string;
  city: string;
  name: string;
  gender: string;
  wa_opt_out: boolean;
  email: string;
  isBlocked: boolean;
  refCode: string;
  customerPersona: CustomerPersona;
  calls: Call[];
  events: Event[];
  referrals: any[]; // Adjust if you have a specific structure for referrals
  notifications: Notification[];
}

export interface CustomerPersona {
  demographics: Demographics;
  psychographics: Psychographics;
  personality: string;
}

export interface Demographics {
  gender: string;
  ethnicity: string;
  education: string;
  maritalStatus: string;
  income: string;
  livingStatus: string;
  medicalHistory: string;
  location: string;
  techComfort: string;
  standardOfLiving: string;
  familyMembers: string;
  workStatus: string;
  lastCompany: string;
  languagePreference: string;
  physicalState: string;
}

export interface Psychographics {
  needs: string;
  values: string;
  painPoints: string;
  motivators: string;
}

export interface Call {
  _id: string;
  callId: string;
  status: string;
  user: string;
  expert: string;
  user_requested: boolean;
  initiatedTime: string;
  duration: string;
  failedReason: string;
  recording_url: string;
  conversationScore: number | null;
  user_id: string;
  expert_id: string;
  source: string;
}

export interface Event {
  _id: string;
  phoneNumber: string;
  age: string;
  eventName: string;
  source: string;
  repeat: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  name: string;
  city: string;
  dob: string;
  email: string;
  advSeenOn: string;
  mainTitle:string;
  lastModifiedBy: string;
  remarks: string;
  userId: string;
  isNewUserRecord: boolean;
}

export interface Notification {
  _id: string;
  userId: string;
  status: string;
  templateName: string;
  messageId: string;
  requestMeta: string;
  createdAt: string;
  notification_status: string;
}
