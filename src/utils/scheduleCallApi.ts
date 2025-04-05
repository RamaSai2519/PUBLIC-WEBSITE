import axios from "axios";

/**
 * @who - RAMA is Managing the Backend
 * @where - NOW in digital Ocean later in s3
 */

export interface Slot {
  available: boolean;
  datetime: string;
  slot: string;
}

export type SlotsResponse = Slot[];

export const SCHEDULE_CALL = "https://rama.sukoonunlimited.com/admin/";

/**
 *
 * @param expert | PASS EXPERT OD
 * @param scheduledDateTime| PASS Scheduled Date Time when to scheduled call
 * @param duration  | PASS duration in number NOT in String 🙏🏻
 * @returns
 */

export const fetchFreeScheduledFromParticularSaarthi = (
  expert: string,
  scheduledDateTime: string,
  duration: number = 30
) => {
  /**
     * Sample Body to be sent to the server
      {
    "expert": "6604694542f04a057fa2100f",
    "datetime": "2024-06-21T18:30:00.000Z",
    "duration": "30"
    }
     */

  return axios({
    method: "post",
    baseURL: SCHEDULE_CALL,
    url: "data/slots",
    data: {
      expert: expert,
      datetime: scheduledDateTime,
      duration: duration,
    },
  })
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      if (err) {
        return {
          status: false,
          message: "Something went wrong",
        };
      }
    });
};

export const submitSlot = (user: string, expert: string, datetime: string) => {
  return axios({
    method: "post",
    baseURL: SCHEDULE_CALL,
    url: "data/schedules",
    data: {
      user,
      expert,
      datetime,
    },
  })
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => {
      if (err) {
        return {
          status: false,
          message: "Something went wrong",
        };
      }
    });
};
