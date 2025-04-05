import { useLazyGetUserStatsQuery } from '@/store/api/loginApi';
import { useEffect, useState } from 'react';

interface LoginData {
  _id?: string;
  name?: string;
  phoneNumber?: string;
  city?: string;
  isBusy?: boolean;
  active?: boolean;
  birthDate?: string;
  createdDate?: string;
  numberOfCalls?: number;
  customerPersona?: string;
  profileCompleted?: boolean;
}

interface UserStats {
  user: LoginData;
  calls: {
    data: any[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalRecords: number;
    };
  };
  events: {
    data: {
      eventName: string;
      source: string;
      repeat: string;
      dob: string;
    }[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalRecords: number;
    };
  };
}

interface UseUserStatsReturn {
  userStats: UserStats | null;
  error: any;
  isLoading: boolean;
}

const useUserStats = (userId: string): UseUserStatsReturn => {
  const [trigger, { data, error, isLoading }] = useLazyGetUserStatsQuery();
  const [userStats, setUserStats] = useState<UserStats | null>(null);

  useEffect(() => {
    if (userId) {
      trigger(userId)
        .unwrap()
        .then((response) => {
          setUserStats(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user stats:', error);
        });
    }
  }, [userId, trigger]);

  return { userStats, error, isLoading };
};

export default useUserStats;
