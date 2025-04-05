import { Box, Typography } from '@mui/material';

const WhatDoWeDO = () => {
  const weDo = {
    sukoon_unlimited: {
      tagline:
        'Sukoon Unlimited offers a range of services and activities to make life more fulfilling for seniors. We help seniors connect with others, discover new interests, and get the support they need to lead happy, healthy lives.',
      sections: [
        {
          title: 'Sarathis',
          description:
            'Our Sarathis are experienced seniors who guide and support others with valuable insights and companionship.',
        },
        {
          title: 'Coaches',
          description:
            'Certified coaches provide emotional support and guidance to help seniors navigate life’s challenges.',
        },
        {
          title: 'Meetups & Events',
          description:
            'Seniors can join or organize meetups, creating opportunities for connection, learning, and fun.',
        },
        {
          title: 'Support Group',
          description:
            'Our support groups offer a safe space for sharing experiences, gaining encouragement, and building community.',
        },
        {
          title: 'Sukoon Assistance',
          description:'We help with daily tasks like doctor appointments, tech support, and event bookings, making life easier.'
        }
      ],
      closing_message:
        'Sukoon Unlimited is all about creating a space where seniors can experience joy, friendship, and support every day. Join us today and start your journey toward a more connected, fulfilling life!',
    },
  };
  return (
    <Box
      id="what-do-we-do-section"
      className="bg-primaryYellow"
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        bgcolor: 'tertiary.main',
        borderRadius: '16px',
        overflow: 'hidden',
        my: { xs: 3, sm: 4, md: 6 },
      }}
    >
      <Box
        sx={{
          width: '50%',
          minWidth: '50%',
          flex: 1,
          display: { xs: 'none', md: 'block' },
          backgroundImage: 'url(/img-5.png)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></Box>
      <Box
        sx={{
          widows: { xs: '100%', md: '50%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: { xs: 1, md: 1 },
          p: 4,
        }}
      >
        <h2 className="text-3xl font-bold">What Do We Do</h2>
        <p className="font-lightFont">{weDo.sukoon_unlimited.tagline}</p>
        {weDo.sukoon_unlimited.sections.map((section, index) => (
          <Box key={index} sx={{ mt: 0 }}>
            <p className="font-extrabold text-lg">{section.title}</p>
            <p className="font-lightFont">{section.description}</p>
          </Box>
        ))}
        <p className='font-lightFont italic'>{weDo.sukoon_unlimited.closing_message}</p>
      </Box>
    </Box>
  );
};

export default WhatDoWeDO;
