'use client';
import { AWS_URL } from '@/utils/axiosHelper';
import { useState, useEffect } from 'react';
import { externalPage as _externalPage } from '@/utils/constants';
import RegisterPage from '@/components/server/registerForm.server';
import Image from 'next/image';
import TrustComp from '@/components/trustComp';
import { externalPage } from '@/utils/constants';
import HeroZappy from '@/components/heroZappy';
import { get_data_from_firebase, write_data_to_firebase } from '@/utils/firebase';

import { usePathname } from 'next/navigation';

const DocumentPage = () => {
  // const refSource = useQueryParams('q');
  const refSource = usePathname();
  
  const [pageData, setPageData] = useState(_externalPage);
  useEffect(() => {
      // write_data_to_firebase(`external_${refSource?.split('/')[2]}`, externalPage);
      get_data_from_firebase(`external_${refSource?.split('/')[2]}`).then((data) => {
       
        if (data) {
          //@ts-ignore
          setPageData(data);
        }
      });
    }, []);
  return (
    <>
      {/* <Hero /> */}
      <HeroZappy  heroImageUrl={pageData?.hero.heroImageUrl} type='external' header={pageData.hero.headding} subHeader={pageData.hero.subHeader}/>
      {/* New Hero as per design 380 */}

      {/* Gift Offer Section */}
      <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          {pageData.hero.title}
        </p>
        <p className="text-2xl sm:text-3xl text-[#A33F90]">
          {pageData.hero.subtitle}
        </p>
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4">
          {pageData.hero.offerText}
        </p>

        {/* Offer Benefits */}
        <div className="flex flex-wrap gap-5 justify-center mt-6">
          {pageData?.offerBenifits && pageData?.offerBenifits?.map((element,index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 p-4 border rounded-lg shadow-md w-full sm:w-[300px]"
            >
              <Image
                src="https://sukoon-media.s3.ap-south-1.amazonaws.com/duration.svg"
                alt="image"
                width={100}
                height={100}
                className="mb-4 sm:mb-0"
              />
              <div className="flex flex-col items-center sm:items-start justify-center">
                <p className="text-xl font-bold text-center sm:text-left">
                  {element.title}
                </p>
                <p className="font-light text-center sm:text-left">
                  {element.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col items-center px-4 py-8 text-center">
        <p className="text-2xl sm:text-3xl font-bold">{pageData.about.title}</p>
        <p className="text-md sm:text-lg text-gray-600 max-w-[80%]">
          {pageData.about.description}
        </p>
        <div className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] mt-4 border-black border-2 rounded-lg border-l-0 border-t-0 p-1">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={pageData.about.videoURL}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="flex flex-col items-center justify-center px-4 py-10">
        <p className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          {pageData.hero.offerText}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 p-6 w-full max-w-5xl mt-6">
          {pageData.features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      {/* Trust Component */}
      <TrustComp isParagraph={true} />

      {/* Registration Section */}
      <div className="bg-[#FCEB99] flex flex-col items-center justify-center px-4 py-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
          {pageData.register.title}
        </h2>
        <p className="text-gray-700 text-lg sm:text-xl text-center mt-2 max-w-md">
          {pageData.register.subtitle}
        </p>
        <div className="w-full max-w-md sm:max-w-lg mt-6">
          <RegisterPage refSource={refSource?.split('/')[2]} />
        </div>
      </div>
    </>
  );
};

export default DocumentPage;

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center border border-gray-300 rounded-2xl p-6 bg-[#F9F7F2] shadow-sm w-full sm:w-[300px]">
      <div className="flex items-center justify-center w-16 h-16 bg-yellow-300 rounded-full mb-4">
        <Image src={icon} alt="icon" width={40} height={40} />
      </div>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="text-gray-600 text-sm mt-2">{description}</p>
    </div>
  );
};
