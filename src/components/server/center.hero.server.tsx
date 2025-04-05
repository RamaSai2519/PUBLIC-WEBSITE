import Link from 'next/link';
import Btn from '../button';
import { Metadata } from 'next';
import Image from 'next/image';
import { SukoonReferral } from '@/app/a/[id]/page';
import axios from 'axios';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Hero Section',
    description: 'Community for Seniors by Seniors',
  };
}

const fetchHeroData = async () => {
  const response = await axios.get(
    `https://sukoonunlimited.com/api/firebase?document=hero`
  );
  if (response.status !== 200) {
    throw new Error('Failed to fetch hero data');
  }
  return response.data;
};

const CenterHero = async (props:SukoonReferral) => {
  const {highlight=[],heading="Sukoon Meetups!",fillerHeading="Welcome to "} = props;
  console.log("props",props.highlight)
  // const heroData = await fetchHeroData();

  // const {
  //   title = 'Spreading Joy, Every Moment',
  //   subtitle = 'Community for Seniors by Seniors',
  //   btnText = 'Register Now',
  //   appBtnText = 'Download the App',
  // } = heroData || {};

  const features = [
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
];
  return (
    <section className="py-12 bg-white text-center sm:text-left">
      <div className="container mx-auto px-6 sm:px-12 lg:px-20  align-middle">
        {/* Heading */}
        <h1 className="text-3xl font-lightFont mb-8 sm:text-4xl lg:text-5xl justify-center self-center text-center">
          {fillerHeading} <br /> <span className="text-black">{heading}</span>
        </h1>

        {/* Features */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {highlight.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center sm:items-center text-center sm:text-left p-6  justify-center"
            >
              <div className="text-4xl mb-4 bg-gradient-to-b from-[#FFC629] to-[#FEE998] text-white rounded-full p-4">
                <Image alt={feature.heading} src={{src:feature.icon,width:50,height:50}} width={50} height={50} />
              </div>
              <h2 className="text-2xl font-extrabold  mb-2">{feature.heading}</h2>
              <p className="font-boldFont ">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CenterHero;
