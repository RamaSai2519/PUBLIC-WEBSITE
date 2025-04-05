import { LinkedIn } from "@mui/icons-material";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

const Founder = () => {
  return (
    <div>
      <h1 className="text-2xl md:text-5xl section-title font-bold">
      Note from the Founder
      </h1>
      <div className="py-8 flex flex-col sm:flex-row items-center gap-12">
        <div className="flex flex-col gap-4 min-w-64">
          <div className="rounded-full overflow-hidden h-64 w-full relative border-4 border-primaryYellow">
            <Image
              src={"/founder.jpg"}
              alt="founder-img"
              layout="fill"
              className="object-cover"
            />
          </div>
          <div className="flex justify-center flex-row gap-1">
            <h5 className="text-center text-lg font-semibold">Vibha Singal</h5>
            <Link href={"https://www.linkedin.com/in/vibha-singal/"} target="_blank">
              <LinkedIn />
            </Link>
          </div>
          
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-base font-normalFont">
            Warm greetings from the Singal family!<br/><br/>
            I am Vibha Singal, Founder and CEO of Sukoon Unlimited.
            <br /><br />
            My early years were in Kolkata and Delhi, surrounded by the love of grandparents, parents, uncles, aunts, siblings, and cousins. As a family, we believe in the circle of kindness and being in service to others. It echoes the profound truth that our purpose finds its highest fulfillment in the collective upliftment of others.
          </p>

          <p className="text-base font-normalFont">
          Learning from personal experiences, Sukoon Unlimited is an endeavor to bring joy and comfort to Senior Citizens globally through the power of conversations, connections, and care. My educational background, work experiences, and deep appreciation for my grandparents and parents make me believe this is possible.
          </p>

          <p className="text-base font-normalFont">
          Thank you for being part of our journey. We are just getting started. 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Founder;
