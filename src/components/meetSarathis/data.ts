type TimeSlots = {
  time: string;
  booked: boolean;
};

export const timeSlots: TimeSlots[] = [
  { time: "09:00 - 09:30", booked: false },
  { time: "09:30 - 10:00", booked: true },
  { time: "10:00 - 10:30", booked: false },
  { time: "10:30 - 11:00", booked: true },
  { time: "11:00 - 11:30", booked: false },
  { time: "11:30 - 12:00", booked: true },
  { time: "12:00 - 12:30", booked: false },
  { time: "12:30 - 13:00", booked: true },
  { time: "13:00 - 13:30", booked: false },
  { time: "13:30 - 14:00", booked: true },
  { time: "14:00 - 14:30", booked: false },
  { time: "14:30 - 15:00", booked: true },
];
