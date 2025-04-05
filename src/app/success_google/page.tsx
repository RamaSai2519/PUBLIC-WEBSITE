'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { SaarthiList } from '@/store/api/interface';
import { useRouter } from 'next/navigation';
import { useCall } from '@/hooks/useCall';
import useDeviceType from '@/hooks/useDeviceType';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { PartnerGrid } from '@/components/ratingOnPaperGrid/PartnerGrid';
import PricingTableV2 from '@/components/PricingTable/index.v2';
import { Fustat } from 'next/font/google';
import Link from 'next/link';

// Dynamically import components with client-side rendering
const CustomModal = dynamic(() => import('@/components/Modal'), { ssr: false });
const ConnectSarathi = dynamic(() => import('@/components/connectSarathi'), {
  ssr: false,
});
const Hero = dynamic(() => import('@/components/hero'), { ssr: false });
const LazyLoad = dynamic(() => import('@/components/lazyLoad'), { ssr: false });
const SukoonUnlimited = dynamic(() => import('@/components/sukoonUnlimited'), {
  ssr: false,
});
const Testimonials = dynamic(() => import('@/components/testimonials'), {
  ssr: false,
});
const WhatsAppLink = dynamic(
  () => import('@/components/whatsAppLink/WhatsAppLink'),
  { ssr: false }
);
const ErrorBoundary = dynamic(() => import('@/components/errorBoundry'), {
  ssr: false,
});
const PricingTable = dynamic(() => import('@/components/PricingTable'), {
  ssr: false,
});

const Home = () => {
  const { isMobile } = useDeviceType();
  const [openVideoModal, setOpenVideoModal] = useState<
    SaarthiList | undefined
  >();
  const { clickedSaarthi, setClickedSaarthi } = useCall();
  const router = useRouter();

  const activateLoading = () => {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      document.body.style.overflow = 'auto';
    }, 1500);
  };

  useEffect(() => {
    activateLoading();
  }, []);

  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <main className="mb-12 sm:mb-0">
        <div className="hidden sm:block">
          <LazyLoad>
            <CustomModal
              open={Boolean(openVideoModal)}
              name={`Sarthi-video-clicked ${clickedSaarthi?.name || ''}`}
              onClose={() => setOpenVideoModal(undefined)}
              bgColor="primaryYellow"
              fullScreen={false}
            >
              <p className="text-center text-2xl mb-2">
                {openVideoModal?.name}
              </p>
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
          <ErrorBoundary>
            <div className="sm:flex xs:flex md:flex lg:flex xl:hidden flex-col justify-center items-center mt-auto m-2">
              <p className="text-2xl font-lightFont">
                Find the <b>right plan for you</b>
              </p>
              <p>
                Plans designed to bring purpose, connection, and ease to your
                journey.
              </p>
              <PricingTableV2
                location={'homepage'}
                onSubscribeClick={() => router.push('/subscription')}
              />
            </div>
            <div className="hidden sm:hidden xs:hidden md:hidden lg:hidden xl:flex 2xl:flex   flex-col justify-center items-center  ">
              <p className="text-4xl font-lightFont">
                Find the <b>right plan for you</b>
              </p>
              <p>
                Plans designed to bring purpose, connection, and ease to your
                journey.
              </p>
              <Link href={'/subscription'}>
                <PricingTable />
              </Link>
            </div>
          </ErrorBoundary>
          <div className="fixed bottom-10 right-10">
            <ErrorBoundary>
              <WhatsAppLink />
            </ErrorBoundary>
          </div>
          <ErrorBoundary>
            <PartnerGrid />
            <Testimonials />
          </ErrorBoundary>
        </div>
      </main>
    </React.Suspense>
  );
};

export default Home;
