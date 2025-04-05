import Link from 'next/link';
import Btn from '../button';
import { Metadata } from 'next';
import axios from 'axios';
import { ReactNode } from 'react';

export async function generateMetadata(): Promise<any> {
  return {
    title: 'Hero Section',
    description: 'Community for Seniors by Seniors',
  };
}

const fetchHeroData = async () => {
  const response = await axios.get(`https://sukoonunlimited.com/api/firebase?document=hero`);
  if (response.status !== 200) {
    throw new Error('Failed to fetch hero data');
  }
  return response.data;
};

interface HeroProps {
  children?: ReactNode; // Accepts ReactNode as children
  imageUri?: string;
}

const Hero = async ({ children,imageUri }: HeroProps) => {
  const heroData = await fetchHeroData();

  const {
    title = 'Spreading Joy, Every Moment',
    subtitle = 'Community for Seniors by Seniors',
    btnText = 'Register Now',
    appBtnText = 'Download the App',
  } = heroData || {};

  return (
    <div style={{
      backgroundImage: imageUri ? `url(${imageUri})` : "/hero.jpg",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }} className={`hero-section  relative z-0 flex flex-col items-start justify-center ${children ? 'p-4' : 'pl-4'}  sm:pl-6 md:pl-10 lg:pl-24 xl:pl-32 bg-gradient-to-b from-gray-900 to-gray-800 h-[70vh] sm:h-[70vh] md:h-[70vh] lg:h-[95vh] xl:h-[90vh]`}>
      <div className="relative z-10 max-w-full flex flex-col gap-6 sm:max-w-md md:max-w-lg lg:max-w-xl">
        {/* If children are passed, render them; otherwise, use default content */}
        {children || (
          <>
            <h1 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
              {title}
              <br />
              <span className="text-primaryYellow font-bold italic">
                {subtitle}
              </span>
            </h1>

            <span className="flex flex-row gap-4">
              <Link href="/speak">
                <Btn
                  text={btnText}
                  color="transparent"
                  textColor="white"
                  customClass="border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                  border="white"
                  borderType="rounded"
                />
              </Link>
              <Link
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.sukoon.india&hl=en"
              >
                <Btn
                  text={appBtnText}
                  color="primaryYellow"
                  textColor="black"
                  border="black"
                  borderType="3d"
                />
              </Link>
            </span>
          </>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default Hero;
