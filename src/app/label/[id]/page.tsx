"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { SaarthiList } from "@/store/api/interface";
import { useRouter,useParams,usePathname } from "next/navigation";
import { useCall } from "@/hooks/useCall";
import useDeviceType from "@/hooks/useDeviceType";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Skeleton from "@/components/skeleton/Skeleton";
import { PartnerGrid } from "@/components/ratingOnPaperGrid/PartnerGrid";
import PricingTableV2 from "@/components/PricingTable/index.v2";
import { Fustat } from 'next/font/google';
import Link from "next/link";
import { get_data_from_firebase } from "@/utils/firebase";
import { useAppDispatch } from "@/store/hooks";
import { setLoading, setPacakgePricing } from "@/store/slices/loadingSlice";
import { useAppSelector } from "@/store/store";


// Dynamically import components with client-side rendering
const Hero = dynamic(() => import("@/components/hero"), { ssr: false, loading: () => <Skeleton/> });
const CustomModal = dynamic(() => import("@/components/Modal"), { ssr: false, loading: () => <Skeleton/>  });
const ConnectSarathi = dynamic(() => import("@/components/connectSarathi"), { ssr: false, loading: () => <Skeleton/>  });
const LazyLoad = dynamic(() => import("@/components/lazyLoad"), { ssr: false });
const SukoonUnlimited = dynamic(() => import("@/components/sukoonUnlimited"), { ssr: false, loading: () => <Skeleton/>  });
const Testimonials = dynamic(() => import("@/components/testimonials"), { ssr: false, loading: () => <Skeleton/>  });
const WhatsAppLink = dynamic(() => import("@/components/whatsAppLink/WhatsAppLink"), { ssr: false });
const ErrorBoundary = dynamic(() => import("@/components/errorBoundry"), { ssr: false });
const PricingTable = dynamic(() => import("@/components/PricingTable"), { ssr: false, loading: () => <Skeleton/>  });

const LabelPage = () => {
  const { isMobile } = useDeviceType();
  
  const [openVideoModal, setOpenVideoModal] = useState<SaarthiList | undefined>();
  const { clickedSaarthi, setClickedSaarthi } = useCall();
  const dispatched = useAppDispatch()
  const router = useRouter();
  const pathNames = usePathname()
  const [basicColor, setBasicColor] = useState("black");
  const partnerName = pathNames?.split("/")[2] || null;
  const [pricingTableOptions,setPricingTableOptions] = useState({
    actualPrice:"₹2,999",
    actualPriceInNumber:2999,
    offerPriceInNumber:0,
    offerPrice:0,
    brandText:"Experience unlimited support, genuine friendships & endless joy—all for just"
  })

 
  const fetchPlansFromFirebase = async () => {
    if (partnerName) {
      get_data_from_firebase(`partner_${partnerName}`).then((res) => {
        console.log(res)
        //@ts-ignore
        setPricingTableOptions(res)
      });
    }
  }
  const activateLoading = async () => {
    const pricingPackage = await get_data_from_firebase('packagePricing');
    //@ts-ignore
    dispatched(setPacakgePricing(pricingPackage.price))
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 1500);
  };

  useEffect(() => {
    fetchPlansFromFirebase()
    activateLoading();
  }, []);

  const userData = useAppSelector(state => state.authUserReducer.data);
  const navigationPaymentLink = partnerName ? `/subscription?mode=initiatePayment&partner=${partnerName}`: `/subscription?mode=initiatePayment&partner=${partnerName}`
  let pricingTextToDisplay = pricingTableOptions.offerPriceInNumber > 0 ? `${pricingTableOptions.brandText}  ${pricingTableOptions.offerPriceInNumber > 12 ? Math.ceil(pricingTableOptions.offerPriceInNumber / 12)+"/Month" : ""} ${pricingTableOptions.offerPrice} annually!` 
  : `${pricingTableOptions.brandText} ${Math.ceil(pricingTableOptions.actualPriceInNumber / 12)}/month (${pricingTableOptions.actualPrice} annually)!`
  return (
    <React.Suspense fallback={<Skeleton/>}>
      
      <main className="mb-24 static sm:mb-0">
        <div className="hidden sm:block">
          <LazyLoad>
            <CustomModal
              open={Boolean(openVideoModal)}
              name={`Sarthi-video-clicked ${clickedSaarthi?.name || ""}`}
              onClose={() => setOpenVideoModal(undefined)}
              bgColor="primaryYellow"
              fullScreen={false}
            >

              <p className="text-center text-2xl mb-2">{openVideoModal?.name}</p>
            </CustomModal>
          </LazyLoad>
        </div>
      
        <div className="flex flex-col justify-center gap-4 sm:gap-4 md:gap-20 lg:gap-4 xl:gap-4">
          <ErrorBoundary>
          
            <Hero title="Presenting India's favourite senior citizens community,"
              subTitle="exclusively for Silver Linings members"
              backgroundImage="/axis_bank_image_des.png" hero_text_color={isMobile ? "text-white" : "black"}
              hero_subText_color={"#EB1165"} getStartedBtnColor={isMobile ? "white" : "black"} />
          </ErrorBoundary>

          <ErrorBoundary>
            <SukoonUnlimited />
          </ErrorBoundary>
        
          {/* <ErrorBoundary>
            <ConnectSarathi />
          </ErrorBoundary> */}

          {!userData?.isPaidUser ? <ErrorBoundary>
            <div className="sm:flex xs:flex md:flex lg:flex xl:hidden flex-col justify-center items-center mt-auto ">
              <p className="text-2xl font-boldFont ml-4">Sukoon Club Membership</p>
              <p className="text-base ml-4">{pricingTextToDisplay}</p>
              {/* @ts-ignore */}
              <PricingTableV2 location={'homepage'} onSubscribeClick={() => router.push(navigationPaymentLink)} {...pricingTableOptions} />
            </div>
            <div className="hidden sm:hidden xs:hidden md:hidden lg:hidden xl:flex 2xl:flex   flex-col justify-center items-center  ml-3 ">
              <p className="text-4xl font-boldFont">Sukoon Club Membership</p>
              <p>{pricingTextToDisplay}</p>
              <Link href={navigationPaymentLink} >
                {/* @ts-ignore */}
                <PricingTable key={'PricingTableForPartner'}  {...pricingTableOptions}  />
              </Link>
            </div>
          </ErrorBoundary> : <></>}
          <div className="fixed bottom-10 right-10">
            <ErrorBoundary>
              <WhatsAppLink />
            </ErrorBoundary>
          </div>
          <ErrorBoundary>
            {/* <PartnerGrid /> */}
            <Testimonials />
          </ErrorBoundary>
        </div>
      </main>
      
    </React.Suspense>
  );
};

export default LabelPage;
