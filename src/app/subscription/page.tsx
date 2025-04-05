"use client";
import Btn from "@/components/button";
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import PricingTable from "@/components/PricingTable";
import { enableLoginModal } from "@/store/slices/loginModalSlice";
import { useAppSelector } from "@/store/store";
import { getCookie, Raxios } from "@/utils/axiosHelper";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
//@ts-ignore
import { load } from "@cashfreepayments/cashfree-js";
import { initiatePaymentApi } from "@/utils/paymentUtils";
import { setAuthUserDetail } from "@/store/slices/userInfoAuthSlice";
import { useAppDispatch } from "@/store/hooks";
import { setLoading } from "@/store/slices/loadingSlice";
import LoadingComponent from "@/components/loadingComponent/LoadingComponent";
import { message } from "antd";
import { useUpdateUserMetaOrReferralMutation } from "@/store/api/newLoginApi";
import { getItems } from "@/utils/indexDbUtils";
import { basePrice, imageUrl } from "@/utils/constants";
import OfferCard, { OfferCardProps } from "@/components/offerCard/offerCard";
import PricingTableV2 from "@/components/PricingTable/index.v2";
import { get_data_from_firebase, write_data_to_firebase } from "@/utils/firebase";
import { useRouter,useSearchParams } from "next/navigation";


const SubscriptionPage = () => {

  const router = useSearchParams()
  let paymentMode = router.get("mode");
  let paymentpartner = router.get("partner");

  const [loading, setLoadingState] = useState(paymentMode === "initiatePayment");
  const userSelector = useAppSelector(
    (state: any) => state.authUserReducer.data
  );
  const [offers, setOffers] = React.useState([]);
  const dispatchAction = useDispatch();
  const dispatcher = useAppDispatch();

  const [fetchUserProfile, { data, isLoading: isFetching, isSuccess }] =
    useUpdateUserMetaOrReferralMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatchAction(setLoading(false));
    } else if (isFetching) {
      dispatchAction(setLoading(true));
    }
  }, [isFetching, isSuccess, offers]);

  const postPaymentVerifyStatus = async () => {
    const fetchuserToken = await getCookie("userToken");
    const userCookieToken = fetchuserToken?.value?.value;
    const getPhoneNumber = getItems();
    //@ts-ignore
    if (getPhoneNumber?.phoneNumber) {
      fetchUserProfile(userCookieToken).then(async (res: any) => {
        const apiData = res.data;
        if (apiData) dispatcher(setAuthUserDetail(apiData));
      });
    }
  };

  const captureInterst = async () => {
    if (!userSelector?._id) {
      dispatchAction(
        enableLoginModal({
          showLoginModal: true,
          modalHeading: "Hello",
          modalDescription:
            "Don't miss out on exciting features exclusively available for Club Sukoon members. Start the journey now",
        })
      );
      return;
    }
    try {
      await Raxios.post("/actions/club", {
        user_id: userSelector?._id,
        isInterested: true,
      });
      localStorage.setItem("capturedInterst", "1");
    } catch (error) {
      localStorage.setItem("capturedInterst", "1");
    }
  };

  const initiatePayment = async () => {
    captureInterst();
    dispatchAction(setLoading(true));
    const cashfree = await load({
      mode: "production", //or production
    }); 
    let apiResponse = await initiatePaymentApi({
      user_id: userSelector?._id,
      order_amount: paymentpartner ? plansForUser?.offerPriceInNumber : basePrice,
      pay_type: "club",
    }).catch((err) => {
      dispatchAction(setLoading(false));
    });
    let checkoutOptions = {
      paymentSessionId: apiResponse?.output_details?.payment_session_id,
      redirectTarget: "_modal", //optional ( _self, _blank, or _top),
    };
    cashfree
      .checkout(checkoutOptions)
      .then((result: any) => {
        if (result.error) {
          dispatchAction(setLoading(false));
          postPaymentVerifyStatus();
        }
        if (result.redirect) {
          dispatchAction(setLoading(false));
          postPaymentVerifyStatus();
        }
        if (result.paymentDetails) {
          dispatchAction(setLoading(false));

          postPaymentVerifyStatus();
        }
      })
      .catch((error: any) => {
        // console.log(error);
        message.destroy();
        message.error("Something went Wrong", 3);
        dispatchAction(setLoading(false));
      });
  };

  const fetchOffers = async () => {
    try {
      const response = await Raxios.get("/actions/upsert_offer?page=1&size=10");
      if (response.data) {
        setOffers(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const defaultText = {
     descriptionPageText:"As a Club Sukoon member, you get one-on-one conversations with Sarathis, counseling sessions with certified professionals,counselor-led support groups, participation in all community events, and opportunities to volunteer and give back.",
    secondaryText:`Join Club Sukoon for just ₹${basePrice} per year and unlock all the benefits of being part of the Sukoon community!`
  }

  const [plansForUser, setPlansForUser] = useState({
    actualPrice: "₹2,999",
    actualPriceInNumber: 2999,
    offerPriceInNumber:0,
    descriptionPageText:"As a Club Sukoon member, you get one-on-one conversations with Sarathis, counseling sessions with certified professionals,counselor-led support groups, participation in all community events, and opportunities to volunteer and give back.",
    secondaryText:`Join Club Sukoon for just ₹${basePrice} per year and unlock all the benefits of being part of the Sukoon community!`
  })
  const fetchPlansFromFirebase = async () => {
    get_data_from_firebase(`partner_${paymentpartner}`).then((res)=>{
      console.log(res)
      //@ts-ignore
      setPlansForUser(res)
    });
  }

  useEffect(() => {
    // write_data_to_firebase(`partner_`+paymentpartner,{
    //   actualPrice:"₹2,999",
    //   actualPriceInNumber:2999,
    //   offerPrice:"₹1",
    //   offerPriceInNumber:1
    // })
    // write_data_to_firebase("SubscriptionPage",{
    //   title:"Club Sukoon Membership",
    //   description:`As a Club Sukoon member, you get one-on-one conversations with
    //           Sarathis, counseling sessions with certified professionals,
    //           counselor-led support groups, participation in all community
    //           events, and opportunities to volunteer and give back.`
    // });
    fetchPlansFromFirebase()
    fetchOffers();
    
  }, []);

  useEffect(()=>{
    if (paymentMode === "initiatePayment" && plansForUser?.offerPriceInNumber > 0) {
      initiatePayment().finally(() => setLoadingState(false));
    }
  },[plansForUser?.offerPriceInNumber > 0])

  return (
    <div className="px-4 py-4">
      <LoadingComponent />
      <MaxWidthWrapper>
        <div className="flex flex-col items-center justify-center my-4">
          <div className="text-2xl font-normalFont md:text-4xl flex flex-row">
            Club Sukoon Membership
          </div>
          <div className="items-center justify-center gap-2 flex flex-col">
            <p className="text-base font-normalFont text-center">
              {plansForUser?.descriptionPageText || defaultText?.descriptionPageText}
            </p>
            <p className="text-base font-normalFont text-center">
              {plansForUser?.secondaryText || defaultText.secondaryText}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8 justify-center items-center">
          <div className="sm:flex xs:flex md:flex lg:flex xl:hidden flex-col justify-center items-center mt-auto m-2">

            <PricingTableV2 onSubscribeClick={()=> initiatePayment()}  {...plansForUser}   />
          </div>
          <div className="hidden sm:hidden xs:hidden md:hidden lg:hidden xl:flex 2xl:flex   flex-col justify-center items-center  ">

            <PricingTable  onSubscribeClick={()=> initiatePayment()}  {...plansForUser} />

          </div>
        </div>
        {offers?.length > 0 && (
          <div className="flex flex-col gap-8 justify-center items-center mt-16 mb-16">
            <h1 className="text-2xl font-normalFont md:text-4xl flex flex-row">
              {" "}
              OFFERS FOR YOU{" "}
            </h1>
          </div>
        )}

        <div className="flex flex-row flex-wrap gap-4 mt-16 mb-24 justify-center">
          {offers.length > 0 &&
            offers.map((offer: OfferCardProps) => {
              return (
                <OfferCard
                  key={offer._id}
                  buttonText={offer.buttonText}
                  imageUrl={offer.imageUrl}
                  description={offer.description}
                  couponCode={offer.couponCode}
                  discount={offer.discount}
                  imageAlt={offer.imageAlt}
                  title={offer.title}
                  offer_type={offer.offer_type}
                  website={offer.website}
                />
              );
            })}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default SubscriptionPage;
