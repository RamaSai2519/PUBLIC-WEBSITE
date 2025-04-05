import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import { format } from "date-fns";
import Btn from "../button";
import Image from "next/image"; // Import Image from Next.js for optimized image rendering

interface Call {
  _id: string;
  callId: string;
  status: string;
  user: string;
  expert: string;
  initiatedTime: string;
  duration: string;
  failedReason?: string;
  recording_url?: string;
  expert_image: string;
}

interface Event {
  _id: string;
  name: string;
  subTitle: string;
  mainTitle?: string;
  hostedBy: string;
  imageUrl: string;
  startEventDate: string;
  meetingLink: string;
}

interface UserProfile {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  numberOfCalls: number;
  calls: Call[];
  events: Event[];
}

interface Props {
  user?: UserProfile | null;
}

const UserProfileComponent: React.FC<Props> = ({ user }) => {
  const [callsToShow, setCallsToShow] = useState(10);
  const [eventsToShow, setEventsToShow] = useState(10);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Please Login</h1>
          <p className="text-black mt-2">You need to log in to view this page.</p>
        </div>
      </div>
    );
  }

  // Sort calls and events from latest to old
  const sortedCalls = [...user.calls].sort(
    (a, b) => new Date(b.initiatedTime).getTime() - new Date(a.initiatedTime).getTime()
  );
  const sortedEvents = [...user.events].sort(
    (a, b) => new Date(b.startEventDate).getTime() - new Date(a.startEventDate).getTime()
  );

  const loadMoreCalls = () => {
    setCallsToShow((prev) => Math.min(prev + 10, sortedCalls.length));
  };

  const loadMoreEvents = () => {
    setEventsToShow((prev) => Math.min(prev + 10, sortedEvents.length));
  };

  return (
    <div className={`${isMobile ? "mb-24" : ""} p-4 max-w-screen-lg mx-auto`}>
      {/* Welcome User */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">{`Hi, ${user.name || user.phoneNumber}`}</h1>
      </div>

      {/* User Information */}
      <div className=" shadow-lg rounded-xl p-6 mb-6 flex justify-between items-center">
        <div>
          <p><strong>Phone:</strong> {user.phoneNumber}</p>
          <p><strong>Number of Calls Left:</strong> {user.numberOfCalls}</p>
        </div>
       
      </div>

      {/* Call Log */}
      <div className=" shadow-lg rounded-xl mb-6">
        <h2 className="text-xl font-bold mb-4">Call Log</h2>
        {sortedCalls.length > 0 ? (
          <div>
            {sortedCalls.slice(0, callsToShow).map((call) => (
              <div key={call._id} className="flex items-center border-black border-b-2 border-r-2 border-l-0   p-4 rounded-lg shadow-sm mb-4">
                <Image
                  src={call.expert_image}
                  alt={call.expert}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                  width={48} // Image width
                  height={48} // Image height
                />
                <div>
                  <p><strong>Expert:</strong> {call.expert}</p>
                  <p><strong>Status:</strong> {call.status}</p>
                  <p><strong>Initiated:</strong> {format(new Date(call.initiatedTime), "dd/MM hh:mm a")}</p>
                  <p><strong>Duration:</strong> {call.duration}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No calls recorded.</p>
        )}
        {callsToShow < sortedCalls.length && (
          <Btn
            text="Load More Calls"
            color="primaryYellow"
            isFullWidth
            onClick={loadMoreCalls}
            customClass="mt-4"
          />
        )}
      </div>

      {/* Event Attend List */}
      <div className=" shadow-lg rounded-xl ">
        <h2 className="text-xl font-bold mb-4">Event Attend List</h2>
        {sortedEvents.length > 0 ? (
          <div>
            {sortedEvents.slice(0, eventsToShow).map((event) => (
              <div key={event._id} className="flex items-center border-black border-b-2 border-r-2 border-l-0  p-4 rounded-lg shadow-sm mb-4">
                <Image
                  src={event.imageUrl}
                  alt={event.name}
                  className="w-16 h-16 rounded-lg object-cover mr-4"
                  width={64} // Image width
                  height={64} // Image height
                />
                <div>
                  <p><strong>Event:</strong> {event?.mainTitle}</p>
                  {/* <p><strong>Hosted By:</strong> {event.hostedBy}</p> */}
                  <p><strong>Date:</strong> {format(new Date(event.startEventDate), "dd/MM hh:mm a")}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No events attended yet.</p>
        )}
        {eventsToShow < sortedEvents.length && (
          <Btn
            text="Load More Events"
            color="primaryYellow"
            isFullWidth
            onClick={loadMoreEvents}
            customClass="mt-4"
          />
        )}
      </div>

      <Btn
        text="Logout"
        color="primaryYellow"
        isFullWidth
        onClick={() => {
          // Logout user logic here
        }}
        customClass="mt-6"
      />
    </div>
  );
};

export default UserProfileComponent;
