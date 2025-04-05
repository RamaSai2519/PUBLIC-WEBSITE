import React, { useState } from "react";
import MeetSarathis from "../meetSarathis";
import SukoonEvents from "../sukoonEvents";
import { Assistance } from "../assistance/Assistance";
import MaxWidthWrapper from "../maxWidthWrapper";
import Image from "next/image";

const ConnectSarathi = () => {
  
  const [currentSlide, setCurrentSlide] = useState(0);


  const ContributeDiv = () => {

    return <div className="flex flex-col sm:flex-row gap-6 justify-between items-center  p-4 rounded-lg ">
    {/* Left Section */}
    <div className="w-full sm:w-[50%]">
      <p className="text-lg font-semibold mb-4 text-[#222]">
      Give back to the community through your time, wisdom, experience, and kindness, making a lasting impact.
      </p>
      <ul className="space-y-4 text-base text-[#555]">
        <li className="flex items-center font-normalFont text-black">
          <span className="font-normalFont text-black w-5 h-5 bg-[#FFECB8] rounded-full flex justify-center items-center mr-3">
            ✓
          </span>
          Volunteer: Share your time and wisdom with those who need it—students, professionals, NGOs, and corporate.
        </li>
        <li className="flex items-center font-normalFont text-black">
          <span className="w-5 h-5 bg-[#FFECB8] rounded-full flex justify-center items-center text-black mr-3">
            ✓
          </span>
          Host Events: Lead exciting events on Sukoon and inspire others with your experiences.
        </li>
        <li className="flex items-center font-normalFont text-black">
          <span className="w-5 h-5 bg-[#FFECB8] rounded-full flex justify-center items-center text-black mr-3">
            ✓
          </span>
          Become a Sukoon Leader: Take on meaningful roles within the community as a Sarathi, Coach, or Happiness Ambassador.
        </li>
      </ul>
    </div>
  
    {/* Right Section */}
    <div className="w-full sm:w-[40%] flex justify-center">
      <div className="relative">
        <Image
          src={"/contribute.svg"}
          alt="Contribute"
          width={400}
          height={400}
          className="rounded-lg shadow-lg"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
          <p className="text-sm font-semibold text-yellow-500">Paid</p>
        </div>
      </div>
    </div>
  </div>
  
  }

  const slides = [
    { key: "talk", title: "Talk", description: "", component: <MeetSarathis key={"talk"} type="talk"/> },
    // { key: "sarathis", title: "Sarathis", description: "", component: <MeetSarathis key={"sarathi"} type={'saarthi'} /> },
    // { key: "Coaches", title: "Coaches", description: "", component: <MeetSarathis key={"expert"} type={'expert'} /> },
    { key: "events", title: "Meetups", description: "", component: <SukoonEvents key={"events"} /> },
    // { key: "contribute", title: "Contribute", description: "", component: <ContributeDiv /> },
  ]

  return (
    <div className="flex flex-col w-full items-center justify-start bg-[#FFF9E9] p-4 sm:p-2">
      <h1 className="font-normal text-center text-3xl md:text-4xl lg:text-5xl ">
        Let Sukoon make you feel better,{" "}
        <span className="font-extrabold">Everyday.</span>
      </h1>

      {/* <div
        key={"connect-with-sarathi"}
        className="w-full flex flex-col justify-center items-center relative mt-2 border border-2"
      > */}
      <div className="pl-14 overflow-x-scroll no-scrollbar  flex flex-row  justify-evenly items-center flex-1 w-full gap-10   bottom-0 border border-black  border-primaryYellow/15 border-b-4 border-r-0 border-t-0 border-l-0">
        {slides.map((slide, index) => (
          <div
            key={slide.key}
            className={`cursor-pointer  ${index == 0 ?  'ml-2' :'ml-0'} p-2 z-10 ${
              currentSlide === index
                ? "border-b-4 border-primaryYellow"
                : "text-black"
            }`}
            onClick={() => setCurrentSlide(index)}
          >
            <span className={`text-xl  ${currentSlide === index ? 'font-bold' : 'font-lightFont'} `}>{slide.title}</span>
          </div>
        ))}
      </div>
      {/* </div> */}
      <div className="w-full">
     
          {slides[currentSlide].component}
      </div>
      <div className="relative mt-12">
        <Assistance />
      </div>
    </div>
  );
};

export default ConnectSarathi;
