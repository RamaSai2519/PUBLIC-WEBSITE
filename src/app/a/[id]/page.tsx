import { Metadata } from 'next';
import { db } from '../../../lib/firebaseAdmin';
import Hero from '@/components/server/Hero.server';
import CenterHero from '@/components/server/center.hero.server';
import Image from 'next/image';
import Btn from '@/components/button';
import { ArrowForward, ArrowForwardIos } from '@mui/icons-material';
import { AWS_URL, getAllUpcomingEvents } from '@/utils/axiosHelper';
import EventCard from '@/components/server/Event.card';
import RegisterPage from '@/components/server/registerForm.server';
import Link from 'next/link';

export interface SukoonReferral {
  id: string;
  highlight?: Highlight[];
  thirdPartyBanner?: ThirdPartyBanner;
  heading?: string;
  fillerHeading?: string;
}

export interface Highlight {
  id: number; // Unique ID for each highlight
  heading: string; // Heading text
  description: string; // Description text
  icon: string; // URL of the icon
}

export interface ThirdPartyBanner {
  button: BannerButton;
  image: string; // URL of the banner image
  fillerThree: string; // Text displayed after the bold value
  fillerOne: string; // Text displayed before the bold value
  boldValue: string; // Bolded text in the banner
  slug?: string;
}

export interface BannerButton {
  link: string; // Link for the button
  text: string; // Text displayed on the button
}


interface DocumentData {
  id: any;
  [key: string]: any;
}

interface Props {
  params: { id: any };
}

let mockData :SukoonReferral = {
  "id": "sukoonrefferal",
  "highlight": [
      {
          "id": 1,
          "heading": "Pursue Your Passions",
          "description": "From singing to painting, explore what you love or try something new.",
          "icon": "https://sukoon-media.s3.ap-south-1.amazonaws.com/pallate.svg"
      },
      {
          "id": 1,
          "heading": "Pursue Your Passions",
          "description": "From singing to painting, explore what you love or try something new.",
          "icon": "https://sukoon-media.s3.ap-south-1.amazonaws.com/pallate.svg"
      },
      {
          "id": 1,
          "heading": "Pursue Your Passions",
          "description": "From singing to painting, explore what you love or try something new.",
          "icon": "https://sukoon-media.s3.ap-south-1.amazonaws.com/pallate.svg"
      },
      {
          "id": 1,
          "heading": "Pursue Your Passions",
          "description": "From singing to painting, explore what you love or try something new.",
          "icon": "https://sukoon-media.s3.ap-south-1.amazonaws.com/pallate.svg"
      },
      {
          "id": 1,
          "heading": "Pursue Your Passions",
          "description": "From singing to painting, explore what you love or try something new.",
          "icon": "https://sukoon-media.s3.ap-south-1.amazonaws.com/pallate.svg"
      }
  ],
  "thirdPartyBanner": {
    'slug': 'deme',
      "button": {
          "link": "/signup",
          "text": "Sign Up"
      },
      "image": "https://sukoon-media.s3.ap-south-1.amazonaws.com/old-a.png",
      "fillerThree": "and make every day exciting!",
      "fillerOne": "Join ",
      "boldValue": "Sukoon Meetups"
  },
  "heading": "Sukoon Unlimited",
  "fillerHeading": "Welcome to"
}

export async function generateMetadata({ params }: any): Promise<any> {
  const docRef = db.collection('public_website_content').doc(params.id);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    return { title: 'Document Not Found' };
  }

  const data = docSnap.data();

  return {
    title: data?.title || 'Document Details',
    description: data?.description || 'Details of the document.',
  };
}

const DocumentPage = async ({ params }: any) => {
  const docRef = db.collection('public_website_content').doc(params.id);
  const docSnap = await docRef.get();

  if (!docSnap.exists) {
    return <div>No data found for the given document ID.</div>;
  }

  let documentData:SukoonReferral = { id: docSnap.id, ...docSnap.data() };
  if (!documentData) {
    documentData = mockData;
  }

  const fetchEvents = async () => {
    const response = await fetch(
      AWS_URL + `/actions/list_events?fromToday=true&page=1&size=50&isHomePage=false`
    );
    const data = await response.json();
    return data;
  };

  return (
    <main>
      {/* <h1>Document: {documentData.id}</h1> */}
      <Hero
        {...(<RegisterPage />)}
        imageUri={documentData.thirdPartyBanner?.image || undefined}
      >
        <div className="flex flex-col items-center justify-center">
          <RegisterPage refSource={documentData.thirdPartyBanner?.slug} />
        </div>
      </Hero>
      <CenterHero {...documentData} />
      <div className="relative flex flex-col items-center justify-center mb-16">
        {/* Image with Gradient Below */}
        <div className="relative  justify-center self-center text-center">
          {
            <Image
              src={{
                //@ts-ignore
                src: documentData.thirdPartyBanner?.image
                  ? documentData.thirdPartyBanner?.image
                  : mockData.thirdPartyBanner?.image,
                width: 500,
                height: 500,
              }}
              alt="Old A"
              width={500}
              height={500}
              className=""
            />
          }
          {/* Gradient Layer */}
          <div className="absolute bottom-0 left-0 right-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Text and Button Section */}
        <h1 className="text-2xl font-lightFont text-center mt-6">
          {documentData.thirdPartyBanner?.fillerOne || 'Join '}{' '}
          <b>{documentData.thirdPartyBanner?.boldValue || 'Sukoon Meetups'}</b>{' '}
          {documentData.thirdPartyBanner?.fillerThree ||
            'and make every day exciting!'}
        </h1>
        <div className="flex flex-row gap-4 w-[200px] mt-4">
          <Link href={'#register-form'}>
            <Btn
              text={documentData.thirdPartyBanner?.button.text || 'Sign Up'}
              href={'#register-form'}
              isFullWidth
              color="primaryYellow"
              endIcon={<ArrowForwardIos fontSize={'inherit'} />}
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-8 ">
        <h1 className="font-bold text-3xl ml-8">Upcoming Events</h1>

        <div className="flex flex-wrap justify-center gap-4">
          {fetchEvents().then((res) =>
            res?.output_details?.data
              ?.slice(0, 5)
              .map((event: any, index: number) => (
                <EventCard key={index} {...event} />
              ))
          )}
        </div>
      </div>
      {/* <pre>{JSON.stringify(documentData, null, 2)}</pre> */}
    </main>
  );
};

export default DocumentPage;
