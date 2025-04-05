import appTheme from "@/theme";
import { Card, CardContent, Chip, Typography } from "@mui/material";
import Image from "next/legacy/image";
import LazyLoad from "../lazyLoad";
import SukoonBadge from "./SukoonBadge";

const SukoonAsst = () => {
  const services = [
    "Essential Deliveries",
    "Online Bookings",
    "Home Management",
    "Tech Queries",
    "Social Media queries",
    "And more...",
  ];

  return (
    <div>
      <LazyLoad>
        <div
          className="cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          style={{ position: "relative" }}
        >
          <SukoonBadge />
          <Card
            variant="elevation"
            className="rounded-lg shadow-lg hover:shadow-2xl"
          >
            <CardContent className="flex flex-col ">
              <div className="flex flex-col justify-evenly gap-5">
                <div className="flex flex-row gap-2 justify-between ">
                  <Typography className="font-heavyFont text-lg">
                    Sukoon Assistant
                  </Typography>
                  {/* {user?._id && (
                  <div key={uniqueId} className="gap-2 ">
                    <div key={uniqueId} className="flex gap-1 items-center">
                      <StatusChip
                        key={uniqueId}
                        isBusy={Boolean(isSaarthiBusy)}
                        status={status as string}
                      />
                    </div>
                  </div>
                )} */}
                </div>

                <div className="flex  justify-center rounded-lg relative">
                  <div className="relative h-64 w-[300px]">
                    <Image
                      src={"/img-1.png"}
                      layout="fill"
                      alt={`sukoon-assistant-alt`}
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {services?.map((item, index) => (
                    <Chip
                      size="small"
                      label={item}
                      className="font-lightFont text-2 text-sm p-0 w-[49%]"
                      key={index}
                      sx={{
                        bgcolor: appTheme.colors["blue"],
                        color: appTheme.colors["black"],
                      }}
                    />
                  ))}
                </div>
                <ol className="list-disc [&>*]:font-normalFont pl-4 [&>*]:my-3">
                  <li>Get help with all Sukoon Unlimited services and queries.</li>
                  <li>
                    Get help with any digital queries and tasks in your everyday
                    life
                  </li>
                  <li>
                    Available{" "}
                    <span className="font-mediumFont">9 AM to 9 PM</span>, every
                    day in English and Hindi
                  </li>
                </ol>
                <a
                  href="tel:1234567890"
                  className="w-full bg-green flex justify-center items-center py-2 rounded-md text-white text-base font-normalFont"
                >
                  Speak Now
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </LazyLoad>
    </div>
  );
};

export default SukoonAsst;
