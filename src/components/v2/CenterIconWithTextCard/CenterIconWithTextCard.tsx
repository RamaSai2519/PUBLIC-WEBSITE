import Btn from "@/components/button";
import Image from "next/image";
import React from "react";

interface CenterIconWithTextCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  buttonText?: string;
  buttonAction?: () => void;
}

export function CenterIconWithTextCard({
  title,
  description,
  imageUrl,
  buttonText,
  buttonAction,
}: CenterIconWithTextCardProps) {
  return (
    <div className="flex flex-col items-center text-center p-6  border-2 border-b-4 border-r-4 bg-[#FFFCF4] border-black rounded-[30px] relative w-full max-w-60">
      <div className="w-16 h-16 absolute -top-10 rounded-full border-black  border-2 flex items-center justify-center mb-4">
        {imageUrl && (
          <div className="w-8 h-8 text-[#FFD700]">
            <Image src={imageUrl} alt="Profile" width={80} height={80} />
          </div>
        )}
      </div>
      <h3 className="text-4xl font-extrabold mb-2">{title}</h3>
      <p className="text-base font-medium mt-2">{description}</p>
      {buttonText && buttonAction && (
        <Btn text={buttonText} onClick={buttonAction} color="yellow" />
      )}
    </div>
  );
}
