import Btn from "@/components/button";
import Link from "next/link";
import React from "react";

const BecomeHostBtn = () => {
  return (
    <Link href={"/become-host"}>
      <Btn
        size="large"
        text="Apply to host an Online Event"
        color="primaryYellow"
        customClass="text-xl"
      />
    </Link>
  );
};

export default BecomeHostBtn;
