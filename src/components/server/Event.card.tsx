import Image from "next/image";
import Btn from "../button";
import { ClockCircleFilled, ClockCircleOutlined } from "@ant-design/icons";
import { CalendarMonth } from "@mui/icons-material";

interface EventCardProps {
  id: string; // Added unique key prop
  mainTitle: string;
  subTitle: string;
  imageUrl: string;
  hostedBy: string;
  isPremiumUserOnly: boolean;
  startEventDate: string;
  repeat: string;
  description: string;
  isRegisterdForEvent: boolean;
  registerUser: () => void;
}

const EventCard = ({
  id, // Use id as the unique key
  mainTitle,
  subTitle,
  imageUrl,
  hostedBy,
  isPremiumUserOnly,
  startEventDate,
  repeat,
  description,
  isRegisterdForEvent,
  registerUser,
}: EventCardProps) => {
  return (
    <div
      key={id}
      className="relative mb-5 flex flex-col justify-between bg-[#FFFCF4] w-[90vw] sm:w-[70vw] md:w-[42vw] lg:w-[22vw] xl:w-[25vw] 2xl:w-[18vw] border border-black border-b-4 border-t-3 border-r-4 rounded-3xl"
    >
      <span
        className={`absolute text-sm top-5 z-10 right-4 ${
          isPremiumUserOnly ? "bg-goldLight text-goldFont" : "bg-lightGreen text-green"
        } rounded-full px-3 py-1`}
      >
        {isPremiumUserOnly ? "Paid" : "Free"}
      </span>
      <div className="gap-2">
        <div className="rounded-xl overflow-hidden">
          <div className="relative w-full h-52">
            <Image
              src={{src: imageUrl, width: 200, height: 250}}
              layout="fill"
              
              alt={`${mainTitle}-img`}
              className="object-cover object-top rounded-t-3xl"
            />
          </div>
        </div>
        <div className="px-3">
          <h5 className="font-boldFont text-[18px] mt-3 line-clamp-1">{mainTitle}</h5>
          <p className="mt-1">
            <span className="font-lightFont text-darkGray">Hosted by </span>{" "}
            <span className="font-normalFont capitalize text-lavender">{hostedBy}</span>
          </p>
          {startEventDate && (
            <div className="text-darkGray justify-start flex [&>*]:flex [&>*]:gap-2 [&>*]:items-center gap-8 my-1">
              <div className="flex gap-2">
                <span className="flex font-lightFont text-center gap-2">
                  <CalendarMonth fontSize="inherit" className="mt-1" />
                  {repeat === "daily" ? "Daily" : new Date(startEventDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Kolkata' // Setting time zone to IST
})}
                </span>
              </div>
              <div>
                <span className="flex font-lightFont text-center gap-2">
                <ClockCircleOutlined  />
                  {new Date(startEventDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          )}
          <p className="font-lightFont mb-4 line-clamp-3">{subTitle}</p>
        </div>
        {/* <div className="p-2">
          <Btn
            // onClick={registerUser}
           
           text=  {isRegisterdForEvent ? "Registered" : "Register Now"}
           color="primaryYellow"
           isFullWidth
          />
          
        
        </div> */}
      </div>
    </div>
  );
};

export default EventCard;
