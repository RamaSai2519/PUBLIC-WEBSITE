const domainName = 'https://www.sukoonunlimited.com';
const message =
  'I would like to know more about Sukoon Unlimited. Can you please share more details with me?';
const phoneNumber = '+918660610840';
const wabaNumber = '+916362938688';
const nextConfig = {
  // other configs
  reactStrictMode: false,
  images: {
    domains: [
      'sukoon-media.s3.ap-south-1.amazonaws.com',
      's3.ap-south-1.amazonaws.com',
      'images.unsplash.com',
      'd3q8r846m83fir.cloudfront.net',
      'sukoon-media.s3.amazonaws.com',
      'sukoontest.s3.amazonaws.com',
      'sukoon-static-website-content.s3.ap-south-1.amazonaws.com',
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/expert',
        destination: 'http://expert.sukoon.love/expert',
        permanent: true,
      },
      {
        source: '/admin',
        destination: 'http://expert.sukoon.love/admin',
        permanent: true,
      },
      {
        source: '/wa',
        destination: `${domainName}/?utm_source=utm_whatsapp&utm_medium=share&utm_campaign=share`,
        permanent: true,
      },
      {
        source: '/ig',
        destination: `${domainName}/?utm_source=utm_instagram&utm_medium=share&utm_campaign=share`,
        permanent: true,
      },
      {
        source: '/wa-join-events',
        destination: `https://chat.whatsapp.com/FRXZOG3NPMt1AiuNhIiNDj`,
        permanent: true,
      },
      {
        source: '/wa-join-fitness',
        destination: `https://chat.whatsapp.com/KnyLoWDa1MXJp2Obh3N4Wn`,
        permanent: true,
      },
      {
        source: '/wa-join-astrology',
        destination: `https://chat.whatsapp.com/LS0BUc6gCKn3Nmxnmek2G2`,
        permanent: true,
      },
      {
        source: '/wa-join-meditation',
        destination: `https://chat.whatsapp.com/CCkwV2c2tQyJDbDJLvsdH2`,
        permanent: true,
      },
      {
        source: '/wa-join-supportgroup',
        destination: `https://chat.whatsapp.com/Lm36ISyrIeU60V1FxitgWv`,
        permanent: true,
      },
      {
        source: '/wa-join-community',
        destination: `https://chat.whatsapp.com/GWy6vVlxCts7n8JCNhX8qY`,
        permanent: true,
      },
      {
        source: '/join-sukoon',
        destination: `https://chat.whatsapp.com/GWy6vVlxCts7n8JCNhX8qY`,
        permanent: true,
      },
      {
        source: '/music',
        destination: `https://chat.whatsapp.com/HmplUsqQYxd0uwFtp1Zv92`,
        permanent: true,
      },
      {
        source: '/bookClub',
        destination: `https://chat.whatsapp.com/HaNwesAIfgO7xT9WE1XlRb`,
        permanent: true,
      },
      {
        source: '/wa-delhi',
        destination: `https://chat.whatsapp.com/CSlSvUgBckZCDYMelP4DKz`,
        permanent: true,
      },
      {
        source: '/wa-mumbai',
        destination: `https://chat.whatsapp.com/JTmNIzuLokpChVVuK8uNNS`,
        permanent: true,
      },
      {
        source: '/wa-kolkata',
        destination: `https://chat.whatsapp.com/FsZS9pajlvV0U6ke4NTNPd`,
        permanent: true,
      },
      {
        source: '/wa-bangalore',
        destination: `https://chat.whatsapp.com/H5EI23BbnEeFDgEJoLElIM`,
        permanent: true,
      },
      {
        source: '/enjoy',
        destination: `https://www.sukoonunlimited.com/carnival?q=sukoon&type=event&utm=search`,
        permanent: true,
      },
      {
        source: '/waba',
        destination: `https://api.whatsapp.com/send?phone=${wabaNumber}&text=${encodeURIComponent(
          message
        )}`,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
