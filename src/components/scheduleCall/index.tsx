import React, { useCallback, useEffect, useState } from "react";
import CallSlot from "../callSlot";
import { timeSlots } from "../meetSarathis/data";
import Btn from "../button";
import {
  Slot,
  fetchFreeScheduledFromParticularSaarthi,
  submitSlot,
} from "@/utils/scheduleCallApi";
import { useAppSelector } from "@/store/store";
import { addDays } from "date-fns";
import { ScheduleCallDialogProps } from "./interface";

/**
 * Functional component for scheduling a call.
 * @param {ScheduleCallDialogProps} props - The props for the ScheduleCall component.
 * @returns JSX element for the ScheduleCall component.
 */
const ScheduleCall: React.FC<ScheduleCallDialogProps> = (props) => {
  const { onClose } = props;

  const today = new Date();
  const tomorrow = addDays(today, 1);

  const [slotsData, setSlotsData] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot>();
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);

  const selectedSarathi = useAppSelector(
    (state) => state.selectedSarathi.selectedSaarthi
  );
  const userInfo = useAppSelector((state) => state.authUserReducer.data);

  const fetchSlots = useCallback(async () => {
    const expert = selectedSarathi?.saarthiId || "";
    const scheduledDateTime = selectedDay?.toISOString() || "";
    const duration = 30;

    try {
      setLoading(true);
      const response = await fetchFreeScheduledFromParticularSaarthi(
        expert,
        scheduledDateTime,
        duration
      );
      setSlotsData(response);

      if (response.status === false) {
        console.error("Error:", response.message);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("API call failed:", error);
    }
  }, [selectedDay, selectedSarathi?.saarthiId]);

  useEffect(() => {
    fetchSlots();
  }, [selectedDay]);

  const onSlotClick = useCallback((slot: Slot) => {
    setSelectedSlot(slot);
  }, []);

  const bookSlot = async () => {
    const expert = selectedSarathi?.saarthiId || "";
    const user = userInfo?._id || "";
    const datetime = selectedSlot?.datetime || "";

    try {
      setLoading(true);
      const response = await submitSlot(user, expert, datetime);

      if (response.status === false) {
        console.error("Error:", response.message);
        setLoading(false);
      } else {
        setShowSuccessAnimation(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("API call failed:", error);
    }
  };

  return (
    <div className="p-5 sm:p-7 md:p-10 lg:p-12 min-w-80">
      <>
        {!showSuccessAnimation ? (
          <>
            <h3 className="text-2xl text-center">Schedule Call</h3>
            <p className="text-lg mt-5 mb-2 font-lightFont">
              What day best for you?
            </p>
            {!loading && (
              <div className="inline-flex items-start gap-2">
                <CallSlot
                  label={"Today"}
                  bgColor="primaryYellow"
                  isAvailable={true}
                  onSlotClick={() => {
                    setSelectedDay(today);
                    setSelectedSlot(undefined);
                  }}
                  selected={selectedDay?.getDay() === today?.getDay()}
                />
                <CallSlot
                  label={"Tomorrow"}
                  bgColor="primaryYellow"
                  isAvailable={true}
                  onSlotClick={() => {
                    setSelectedDay(tomorrow);
                    setSelectedSlot(undefined);
                  }}
                  selected={selectedDay?.getDay() === tomorrow?.getDay()}
                />
              </div>
            )}
            {loading && (
              <div className="inline-flex items-start gap-2 shimmer-wrapper">
                <span className="w-[70px] h-[40px] rounded-3xl shimmer-animate"></span>
                <span className="w-[90px] h-[40px] rounded-3xl shimmer-animate"></span>
              </div>
            )}
            <p className="text-lg mt-5 mb-2 font-lightFont">
              What time best for you?
            </p>
            {!loading && !showSuccessAnimation && (
              <div className={`mt-4 mb-8 ${slotsData.length > 0 && "grid grid-cols-2 md:grid-cols-3 gap-4"}`}>
                {slotsData.length > 0 ? slotsData?.map((slot, index) => (
                  <CallSlot
                    key={index}
                    label={slot?.slot}
                    isAvailable={slot?.available}
                    bgColor="primaryYellow"
                    onSlotClick={() => onSlotClick(slot)}
                    selected={selectedSlot?.slot === slot?.slot}
                  />
                )) :
                  <div className="text-center">
                    <h3 className="text-3xl">No slot available</h3>
                    <p className="font-lightFont mt-4 mb-7 text-lg">
                      No slots available for the selected Sarathi at this time.
                    </p>
                  </div>
                }
              </div>
            )}
            {loading && (
              <div className="gap-4 mt-4 grid grid-cols-2 md:grid-cols-3 mb-8 shimmer-wrapper">
                {Array(10)
                  ?.fill(null)
                  ?.map((_, index) => (
                    <span
                      key={index}
                      className="w-[122px] h-[40px] rounded-3xl shimmer-animate"
                    ></span>
                  ))}
              </div>
            )}

            <Btn
              text="Schedule Call"
              color="primaryYellow"
              isFullWidth
              isDisabled={!selectedSlot}
              customClass={
                selectedSlot ? "cursor-pointer" : "cursor-not-allowed"
              }
              onClick={bookSlot}
            />
          </>
        ) : (
          <>
            {showSuccessAnimation && (
              <div className="py-2">
                <h3 className="text-2xl text-center mb-6">
                  Your call has been successfully scheduled.
                </h3>

                <svg
                  className="checkmark"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className="checkmark__circle"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className="checkmark__check"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default ScheduleCall;
