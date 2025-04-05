import Link from "next/link";
import React from "react";
import Btn from "../button";

const AssistanceBtn = () => {
  return (
    <Link href={"/concierge"}>
      <Btn text="Personal Assistance" textColor="black" />
    </Link>
  );
};

export default AssistanceBtn;
