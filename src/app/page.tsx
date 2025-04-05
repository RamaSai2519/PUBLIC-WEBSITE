"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { SaarthiList } from "@/store/api/interface";
import { useRouter } from "next/navigation";
import { useCall } from "@/hooks/useCall";
import useDeviceType from "@/hooks/useDeviceType";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Skeleton from "@/components/skeleton/Skeleton";
// import { PartnerGrid } from "@/components/ratingOnPaperGrid/PartnerGrid";
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

const Home = () => {
  const { isMobile } = useDeviceType();
  const [openVideoModal, setOpenVideoModal] = useState<SaarthiList | undefined>();
  const { clickedSaarthi, setClickedSaarthi } = useCall();
  const dispatched = useAppDispatch()
  const router = useRouter();

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
    activateLoading();
  }, []);

  const userData = useAppSelector(state => state.authUserReducer.data);
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
              <Hero />
          </ErrorBoundary>

          <ErrorBoundary>
            <SukoonUnlimited />
          </ErrorBoundary>
        
          <ErrorBoundary>
            <ConnectSarathi />
          </ErrorBoundary>

          {!userData?.isPaidUser ? <ErrorBoundary>
            <div className="sm:flex xs:flex md:flex lg:flex xl:hidden flex-col  items-center mt-auto m-2">
              <div className="ml-2">
                <p className="text-2xl font-extrabold md:text-4xl lg:text-5xl  mb-1">Sukoon Club Membership</p>
                <p className="text-lg">Experience unlimited support, genuine friendships & endless joy—all for just ₹250/month (₹2,999 annually)!</p>
                </div>
              <PricingTableV2 location={'homepage'} onSubscribeClick={() => router.push("/subscription")} />
            </div>
            <div className="hidden sm:hidden xs:hidden md:hidden lg:hidden xl:flex 2xl:flex   flex-col justify-center items-center  ">
              <p className="text-3xl font-extrabold md:text-4xl lg:text-5xl">Sukoon Club Membership</p>
              <p className="text-xl">Experience unlimited support, genuine friendships & endless joy—all for just ₹250/month (₹2,999 annually)!</p>
              <Link href={"/subscription"} >
                <PricingTable />
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

export default Home;
