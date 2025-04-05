import Image from "next/legacy/image";
import React, { Dispatch, SetStateAction } from "react";
import Btn from "../button";
import CheckDropDown from "./checkDropDown";

interface EditProfile {
  setIsEditEnabled: Dispatch<SetStateAction<boolean>>;
}

const EditProfile: React.FC<EditProfile> = (props) => {
  const { setIsEditEnabled } = props;

  return (
    <div>
      <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-heavyFont text-center md:text-left">
        Edit Profile
      </h1>
      <div className="relative size-32 rounded-full overflow-hidden mx-auto md:mx-0 mt-11 mb-7">
        <Image
          layout="fill"
          alt="profile-alt"
          src={"/short.jpg"}
          className="object-top object-cover mx-auto"
        />
      </div>
      <div className="grid grid-cols-1 items-start md:grid-cols-2 gap-5 md:gap-10">
        <div>
          <label htmlFor="name" className="font-lightFont pl-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="sukoon-profile-input"
            placeholder="Your name here"
          />
        </div>
        <div>
          <label htmlFor="name" className="font-lightFont pl-2">
            DOB
          </label>
          <input
            type="text"
            name="name"
            className="sukoon-profile-input"
            placeholder="Enter your birthday"
          />
        </div>
        <div>
          <label htmlFor="name" className="font-lightFont pl-2">
            Preferred Language
          </label>
          <CheckDropDown
            data={["Hindi", "English", "Gujarati", "Bengali", "Marathi"]}
            placeholder="Language"
          />
        </div>
        <div>
          <label htmlFor="name" className="font-lightFont pl-2">
            City
          </label>
          <input
            type="text"
            name="name"
            className="sukoon-profile-input"
            placeholder="Enter your city here"
          />
        </div>
        <div className="">
          <p className="text-base pl-2 font-lightFont">Interests</p>
          <CheckDropDown
            data={["Daily Life", "Entertainment", "Finance", "Dance", "Sing"]}
            placeholder="Interests"
          />
        </div>
      </div>
      <div className="flex justify-center mt-14">
        <Btn
          text="Save changes"
          size="large"
          color="primaryYellow"
          customClass="max-w-sm"
          isFullWidth
          onClick={() => setIsEditEnabled(false)}
        />
      </div>
    </div>
  );
};

export default EditProfile;
