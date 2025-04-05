import React from "react";
import { TestimonialsTypes } from "./testimonials.interface";
import Image from "next/legacy/image";
import { Icons } from "../Icons";

const TestimonialCard: React.FC<TestimonialsTypes> = (props) => {
  const { imageUrl, data, userDetail, userName } = props;

  return (
    <div className="m-2 p-5 border-black border-l-2 border-r-2 border-t-2 border-b-2 rounded-tr-[55px] rounded-br-3xl rounded-bl-3xl bg-white">
      <p className="font-lightFont text-base min-h-48">{data}</p>
      <hr className="w-full border-none h-[1px] my-4" />
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="relative size-12 rounded-lg overflow-hidden ">
            <Image
              layout="fill"
              alt={`${userName}-alt`}
              src={imageUrl}
              className="object-cover"
            />
          </div>
          <div>
            <h6 className="text-base"> {userName} </h6>
            <p className="text-base font-lightFont"> {userDetail} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
