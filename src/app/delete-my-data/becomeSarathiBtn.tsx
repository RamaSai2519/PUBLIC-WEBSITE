import Btn from "@/components/button";
import Link from "next/link";
import React from "react";

const BecomeSarathiBtn = () => {
  return (
    <Link href={"/become-saarthi"}>
      <Btn
        size="large"
        text="Apply to become a Sarathi"
        color="primaryYellow"
        customClass="text-xl"
      />
    </Link>
  );
};

export default BecomeSarathiBtn;
