import { Icons } from "../Icons";
import { AssistantsTypes } from "./interface";

export const assistantsData: AssistantsTypes[] = [
  {
    icon: Icons.scooter,
    title: "Plan your holiday",
    description: [{
      key: "1",
      value: "Search for accommodation options"
    }, {
      key: "2",
      value: "Research different travel options (air/ railways/car)"
    }, {
      key: "3",
      value: "Suggest local places for sightseeing"
    }, {
      key: "4",
      value: "Suggest best travel insurance plans"
    }],
  },
  {
    icon: Icons.plane,
    title: "Get things delivered home (Cash on Delivery)",
    description: [{
      key: '1',
      value: "Food ordering"
    }, {
      key: '2',
      value: "Grocery ordering"
    }, {
      key: '3',
      value: "Medicine ordering"
    }, {
      key: '4',
      value: "Beauty products ordering"
    }, {
      key: '5',
      value: "Stationery ordering"
    },]
  },
  {
    icon: Icons.home,
    title: "Plan for a day out!",
    description: [
      {
        key: '1',
        value: "Restaurant searches and booking"
      }, {
        key: '2',
        value: "Taxi booking - within City"
      }, {
        key: '3',
        value: "Taxi search and booking - inter cities"
      }, {
        key: '4',
        value: "Movie suggestions and options nearby"
      },
    ],
  },
  {
    icon: Icons.google,
    title: "Ask social media queries",
    description: [
      {
        key: '1',
        value: "Create FB, Instagram, YT and Linkedin accounts"
      }, {
        key: '2',
        value: "Create posts, reels, stories"
      }, {
        key: '3',
        value: "Like, share, comment on social media channels"
      }
    ]
  },

//   Verify the genuineness of any payment link or request  received from unknown entities
// Verify genuineness of emails and attachments received
// Validate genuineness of calls received asking for sensitive information
// Assist in using social media safely 
// Guidance in creating strong passwords and authentication.



  {
    icon: Icons.facebookBlack,
    title: " Verify any payment link, phone apps and SMS",
    description: [
      {
        key: '1',
        value: 'Verify the genuineness of any payment link or request  received from unknown entities'
      }, {
        key: '2',
        value: 'Verify genuineness of emails and attachments received'
      },
      {
        key: '3',
        value: 'Validate genuineness of calls received asking for sensitive information'
      },
      {
        key: '4',
        value: 'Assist in using social media safely'
      },
      {
        key: '5',
        value: 'Guidance in creating strong passwords and authentication'
      }
    ],
  },
  // {
  //   icon: Icons.tech,
  //   title: "Home Repair",
  //   description: [
  //     {
  //       key: "1",
  //       value: 'Get suggestions for Plumber, electrician, AC Repairman, Handyman, Cleaner'
  //     }, {
  //       key: "2",
  //       value: 'Get support booking home repair services'
  //     },
  //   ]
  // },
];
