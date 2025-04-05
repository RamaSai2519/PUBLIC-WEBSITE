export interface EventsCardTypes {
  img: string;
  title: string;
  isPremiumUserOnly?: boolean;
  sarathiName: string;
  hostedBy: string;
  date: string;
  description: string;
  isUpcoming?: boolean;
  slug?: string;
  meetingLink?: string;
  repeat?: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'once'
}

export interface ChallengesCardTypes {
  img: string;
  title: string;
  sarathiName: string;
  isPremiumUserOnly?: boolean;
  hostedBy?: string;
  date: string;
  description: string;
  isUpcoming?: boolean;
  slug?: string;
  meetingLink?: string;
  repeat?: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'once'
  startEventDate: string;
  maxVisitorsAllowed: number;
  prizeMoney: number;
}
