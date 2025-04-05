import Image from "next/image";
import Link from "next/link";
import Btn from "../button";
import { ArrowForwardIos, PhoneInTalk, WhatsApp } from "@mui/icons-material";
import { imageUrl } from "@/utils/constants";
import { useEffect, useState } from "react";
import {
  get_data_from_firebase,
  write_data_to_firebase,
} from "@/utils/firebase";

export function Assistance() {
  const message = "I am looking for Assistance";
  const wabaNumber = "+916362938688";

  const [page_content, set_page_content] = useState({
    title: "Do you need ",
    subTitle: "Sukoon Assistance?",
    subText:
      "We’re here for you! Our team is available for guidance, just a call or chat away",
    btnText: "Contact Us",
    detailBtnText: "View Details",
  });

  useEffect(() => {
    // write_data_to_firebase('assistance',page_content);
    get_data_from_firebase("assistance").then((res) => {
      if (res) {
        //@ts-ignore
        set_page_content(res);
      }
    });
  }, []);
  return (
    <div
      style={{ backgroundImage: `url(${imageUrl}bg-paper.png)` }}
      className="relative w-full p-2 flex flex-col"
    >
      {/* Full-Width Background Image */}

      <div className="flex flex-row items-end  justify-evenly  pt-8 px-4">
        <div className="flex flex-col-reverse sm:flex-row justify-around">
          <div className="w-full ">
            <Image
              src={`/assistanceNew.svg`}
              alt="Paper"
              width={500}
              height={50}
            />
          </div>
          <div className="h-full flex flex-col justify-end sm:ml-8 md:ml-16 lg:ml-24 xl:ml-32 gap-2">
            <div className="flex flex-col gap-2">
              <h1 className="font-normal text-3xl md:text-4xl lg:text-5xl">
                {page_content.title}
                <span className="font-extrabold text-3xl md:text-4xl lg:text-5xl">
                  {page_content.subTitle}
                </span>
              </h1>
              <h1 className="font-normal text-xl flex-wrap">
                {page_content.subText}
              </h1>
            </div>

            <div className="flex flex-row justify-center  w-auto gap-2">
              <Link
                href={`https://api.whatsapp.com/send?phone=${wabaNumber}&text=${encodeURIComponent(
                  message
                )}`}
                key={"Call"}
              >
                <Btn
                  customClass="rounded-md flex flex-row gap-1 justify-center items-center py-3"
                  size="small"
                  isRounded={false}
                  color="primaryYellow"
                  textColor="black"
                >
                  <p className="text-sm sm:text-lg ">{page_content.btnText}</p>
                  
                </Btn>
              </Link>
              <Link href={"/assistance"} key={"Assistance"}>
                <Btn
                  customClass="rounded-md flex flex-row gap-1 justify-center items-center py-3"
                  border="black"
                  size="small"
                  isRounded={false}
                  fontSize="text-lg"
                  color="transparent"
                  textColor="black"
                >
                  <p className="text-sm sm:text-lg  ">{page_content.detailBtnText}</p>
                  
                </Btn>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
