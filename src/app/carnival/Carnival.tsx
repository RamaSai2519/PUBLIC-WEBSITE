'use client';
import React, { useEffect, useState } from 'react';
import { AWS_URL } from '@/utils/axiosHelper';
import RegisterPage from '@/components/server/registerForm.server';
import Image from 'next/image';
import TrustComp from '@/components/trustComp';
import { externalPage as _externalPage } from '@/utils/constants';
import HeroZappy from '@/components/heroZappy';
import useQueryParams from '@/hooks/useQueryParams';
import { get_data_from_firebase, write_data_to_firebase } from '@/utils/firebase';
import EventCard from '@/components/server/Event.card';

const DocumentPage = () => {
  const refSource = useQueryParams('q');
  const type = useQueryParams('type');
  const [externalPage, setExternalPage] = useState(_externalPage);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${AWS_URL}/actions/list_events?fromToday=true&page=1&size=50&isHomePage=false`
        );
        const data = await response.json();
        setEvents(data?.output_details?.data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();

    // write_data_to_firebase(`external_${refSource}`, externalPage);
    get_data_from_firebase(`external_${refSource}`).then((data) => {
      if (data) {
        //@ts-ignore
        setExternalPage(data);
      }
    });
  }, []);

  return (
    <React.Suspense fallback="Loading...">
      <title>{externalPage.hero.titleHeading}</title>
      
      <HeroZappy type={type === 'event' ? 'event' : 'external'} refSource={refSource || 'none'} {...externalPage.hero} />

      {/* Gift Offer Section */}
      <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{externalPage.hero.title}</p>
        <p className="text-2xl sm:text-3xl text-[#A33F90]">{externalPage.hero.subtitle}</p>
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4">{externalPage.hero.offerText}</p>

        <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500 my-8 sm:hidden"></div>

        {/* Offer Benefits */}
        <div className="flex flex-wrap gap-5 justify-center mt-6">
          {externalPage.externalOffer.map((element, index) => (
            <div
              key={index}
              className="flex flex-row items-center gap-4 p-4 border border-t-0 border-r-0 border-l-0 w-full sm:w-[300px]"
              style={{ borderImage: 'linear-gradient(to right, #E1CBB2, #f0870e) 1' }}
            >
              <Image src={element.image} alt={element.title} width={50} height={50} className="mb-4 sm:mb-0" />
              <div className="flex flex-col items-start">
                <p className="text-xl font-bold">{element.title}</p>
                <p className="text-sm font-light">{element.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col items-center px-4 py-8 text-center">
        <p className="text-2xl sm:text-3xl font-bold">{externalPage.about.title}</p>
        <p className="text-md sm:text-lg text-gray-600 max-w-[80%]">{externalPage.about.description}</p>

        <div className="w-full max-w-[80vw] border-black border-2 rounded-lg border-l-0 border-t-0 p-1 mt-4">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={externalPage.about.videoURL}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="flex flex-col items-center justify-center px-4 py-10">
        <p className="text-2xl sm:text-3xl font-bold text-center text-gray-800">With love, Sukoon ❤️</p>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-5xl gap-4">
          
          {externalPage.features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div className="flex flex-col gap-8 ">
      <h1 className="font-bold text-3xl ml-8">Upcoming Events</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {events.slice(0, 5).map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
      </div>

      {/* Registration Section */}
      <div className="bg-[#FCEB99] flex flex-col items-center justify-center px-4 py-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">{externalPage.register.title}</h2>
        <p className="text-gray-700 text-lg sm:text-xl text-center mt-2 max-w-md">{externalPage.register.subtitle}</p>
        <div className="w-full max-w-md sm:max-w-lg mt-6">
          <RegisterPage />
        </div>
      </div>
    </React.Suspense>
  );
};

export default DocumentPage;

const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => {
  return (
    <div className="flex flex-col items-center text-center border border-gray-300 rounded-2xl p-4 shadow-sm w-full sm:w-[250px]">
      <div className="flex items-center justify-center w-16 h-16 rounded-full mb-4">
        <Image src={icon} alt="icon" width={70} height={70} />
      </div>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm mt-2">{description}</p>
    </div>
  );
};
