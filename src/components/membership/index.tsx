import Btn from "../button";
import MaxWidthWrapper from "../maxWidthWrapper";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { PAID, UNPAID } from "@/utils/constants";

const Membership = () => {
  const navigation = useRouter();
  const userInfo = useAppSelector((state) => state.authUserReducer.data);

  const captureRecord = async () => {
    try {
      navigation.push('/subscription')
      return;
    } catch (error) {
      navigation.push('/subscription')
    }

  }
  return (
    <MaxWidthWrapper>
      <div className="mx-6 m-auto flex flex-col lg:flex-row justify-between lg:items-center p-9  shadow-lg border border-primaryYellow rounded-2xl">
        {userInfo?.isPaidUser ?
          <h5 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-7 sm:leading-9 md:leading-10 lg:leading-[50px]">
            <span className="font-lightFont">{PAID.headingTitle}</span><span className="font-heavyFont italic"> {PAID.headingBoldText}</span>
          </h5> :
          <h5 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-7 sm:leading-9 md:leading-10 lg:leading-[50px]">
            <span className="font-lightFont">{UNPAID.headingTitle}</span>
            <br />
            <span className="font-heavyFont italic">{UNPAID.headingBoldText}</span>
          </h5>
        }
        <div>
          <p className="text-base font-normalFont mt-4 mb-6 max-w-[430px]">
            {userInfo?.isPaidUser ? (
              <span className="font-normalFont" dangerouslySetInnerHTML={{ __html: PAID.subHeading }} />
            ) : (
              <span className="font-normalFont" dangerouslySetInnerHTML={{ __html: UNPAID.subHeading }} />
            )}
            <br /><br />
            <span className="mb-2 block"></span>
            {userInfo?.isPaidUser ? (
              <span className="font-normalFont" dangerouslySetInnerHTML={{ __html: PAID.normalText }} />
            ) : (
              <span className="font-normalFont" dangerouslySetInnerHTML={{ __html: UNPAID.normalText }} />
            )}
          </p>
          {userInfo?.isPaidUser ? <></> : <Btn
            text={"I am interested"}
            onClick={captureRecord}
            // endIcon={<ArrowForwardRounded />}
            isFullWidth
            color="primaryYellow"
          // isDisabled={capturedInterst == 1 ? true : false}
          />}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Membership;
