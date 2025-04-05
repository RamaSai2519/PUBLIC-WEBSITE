const PAID = {
  headingTitle: `Hurray! You are a part of`,
  headingBoldText: 'Club Sukoon',
  subHeading: '',
  normalText:
    'Enjoy unlimited access to everything at Sukoon Unlimited. Whatever your need, we are always here for you. Connect with Sukoon Sarathis for personal chats, get unlimited confidential advice from our Experts, participate in community events, join therapist-led support groups, or be part of our lively walking group. The choice is yours. Here’s to a fulfilling journey toward a happier and healthier you!',
  isButtonEnabled: false,
};

export const basePrice = 2999;
const UNPAID = {
  headingTitle: `Presenting`,
  headingBoldText: ` Club Sukoon`,
  subHeading: `As a Club Sukoon member, you get one-on-one conversations with Sarathis, counseling sessions with certified professionals, counselor-led support groups, participation in all community events, and opportunities to volunteer and give back.`,
  normalText: `Join Club Sukoon for just <b>₹2999</b> per year and unlock all the benefits of being part of the Sukoon community!
`,
  isButtonEnabled: true,
};

const refferalDataSet = [
  {
    key: 'fancode',
    heading: 'We are happy to see you!',
    subHeading:
      'As a Fancode employee, you will enjoy Club Sukoon membership for Rs 999 only. Sign up now and upgrade to Club membership ! Hurry, this is a limited time offer only.',
  },
  {
    key: 'wcl',
    heading: 'We are happy to see you!',
    subHeading:
      'As a Wisdom Circle member, you will enjoy Club Sukoon membership for Rs 999 only. Sign up now and upgrade to Club membership! Hurry, this is a limited time offer only.',
  },
  {
    key: 'wc',
    heading: 'We are happy to see you!',
    subHeading:
      'As a Wisdom Circle member, you will enjoy Club Sukoon membership for Rs 999 only. Sign up now and upgrade to Club membership! Hurry, this is a limited time offer only.',
  },
  {
    key: 'centa',
    heading: 'We are happy to see you!',
    subHeading:
      'As a CENTA member, you will enjoy additional  benefits on Sukoon along with Club Sukoon membership for Rs 999 only. Sign up now and upgrade to Club membership! Hurry, this is a limited time offer only.',
  },
];

export const imageUrl =
  'https://sukoon-static-website-content.s3.ap-south-1.amazonaws.com/';

export const externalPage = {
  hero: {
    isUnderFifty: true,
    headding: 'Enjoy 2,999 worth of complimentary Sukoon benefits for next 3 months!',
    titleHeading: 'Gift Unlimited Happiness',
    subHeading: 'to your perants with Sukoon',
    title: 'Get community, friendships and support at the comfort of your home!  ',
    subtitle: ' ',
    offerText: 'With love, Sukoon ❤️',
    header: 'Welcome to Sukoon Meetups',
    subHeader: 'Join a community of care and companionship',
    communityText: 'Sukoon is a community of ',
    communityHighlight: '5000+',
    communitySuffix: ' happy senior citizens',
    chatButton: 'Chat with us',
    whatsAppMessageText:'Would like to know more about Us',
    registerButton: 'Register now',
    heroImageUrl:
      'https://sukoon-media.s3.ap-south-1.amazonaws.com/senior+images.png',
  },
  offerBenifits: [
    {
      title: 'Sukoon Sarathis',
      description: 'make friends and talk as much as you want ',
    },
    {
      title: 'Daily Events',
      description: 'Music, quizes, workshops, book clubs, health talks & more! ',
    },
    {
      title: 'Sukoon Assistance',
      description: 'Get help with technology, apps & daily needs. ',
    }
  ],
  externalOffer: [
    {
      title: 'Pursue Your Passions',
      description: 'From singing to painting, explore what you love or try something new.',
      image:
        'https://sukoon-media.s3.ap-south-1.amazonaws.com/healthySure_duration.svg',
    },
    {
      title: 'Meet Amazing People',
      description: 'Connect with like-minded seniors  and make new friends.',
      image:
        'https://sukoon-media.s3.ap-south-1.amazonaws.com/healthySure_sarathi.svg',
    },
    {
      title: 'Host & Shine',
      description: 'Share your talent, passion, or expertise by hosting your own event.',
      image:
        'https://sukoon-media.s3.ap-south-1.amazonaws.com/healthySure_sukoon_assistance.svg',
    },
    {
      title: '50+ Events Monthly',
      description: 'Always something exciting to enjoy and explore together',
      image: 'https://sukoon-media.s3.ap-south-1.amazonaws.com/paid_events.svg',
    },
  ],
  features: [
    {
      icon: 'https://sukoon-media.s3.ap-south-1.amazonaws.com/sarathi.svg',
      title: 'Sukoon Sarathi',
      description:
        'Connect with friends! Sarathis share wisdom and offer a listening ear.',
    },
    {
      icon: 'https://sukoon-media.s3.ap-south-1.amazonaws.com/support_group.svg',
      title: 'Support Groups',
      description:
        'India’s first platform with senior counsellors offering one-on-one support',
    },
    {
      icon: 'https://sukoon-media.s3.ap-south-1.amazonaws.com/events.svg',
      title: 'Community events',
      description:
        'Connect with friends! Sarathis share wisdom and offer a listening ear.',
    },
    {
      icon: 'https://sukoon-media.s3.ap-south-1.amazonaws.com/assistance.svg',
      title: 'Sukoon Assistance',
      description:
        'Connect with friends! Sarathis share wisdom and offer a listening ear.',
    },
  ],
  about: {
    title: 'About Us',
    description: 'India’s Favourite Senior Citizen Community Conversation, Friendship,Joy',
    videoURL: 'https://www.youtube.com/embed/pecU_kh_qHw',
  },
  register: {
    title: 'Ready to gift?',
    subtitle:
      'Simply register now and unlock this special offer for your parents!',
  },

};

export { PAID, UNPAID, refferalDataSet };
