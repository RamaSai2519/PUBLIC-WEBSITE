import WhatDoWeDO from "@/components/WhatDoWeDo";
import WhoWeAre from "@/components/WhoWeAre";
import FAQComp from "@/components/faq";
import Founder from "@/components/founder";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import { get_data_from_firebase, write_data_to_firebase } from "@/utils/firebase";
import Head from "next/head";

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us - Your Site Name</title>
      </Head>
      <div className="px-3">

        <MaxWidthWrapper>
          <Head>
            <title>About Us | Sukoon Unlimited</title>
          </Head>
          <div className="mt-16 sm:mt-2">
            <WhoWeAre />
          </div>
          <WhatDoWeDO />
          {/* <Founder /> */}
          <FAQComp />
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default AboutUs;


export const metadata = {
  title: "Sukoon Unlimited - About Us",
  description: "Learn more about Sukoon Unlimited, your go-to platform for senior care and emotional wellness.",
  keywords: ["Sukoon Unlimited", "senior care", "emotional wellness", "mental health support"],
};
