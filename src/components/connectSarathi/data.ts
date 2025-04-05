import { ConnectSarathiTypes } from "./connectSarathi.interface";
import CaptureUserNumber from "../captureUserNumber";

export const data: ConnectSarathiTypes[] = [
  {
    image: "/speak.jpg",
    title: "Sukoon Sarathis",
    stars: "4.6",
    reviews: 300,
    buttonText: "Speak Now",
    isDisabled: false,
    href: "/speak",
    description:
      "Enjoy conversations with hand-picked trusted community members, always available for you to talk to.",
  },
  // {
  //   image: "/expert.jpeg",
  //   title: "Sukoon Experts: Finance and Law",
  //   stars: "4.6",
  //   reviews: 300,
  //   buttonText: "Try <span className='font-boldFont'>FREE</span> Consultation",
  //   isDisabled: false,
  //   href: "/speak?category=expert",
  //   description:
  //     "Get personal advice from Community members with 20+ years of experience in Finance and Law",
  // },
  {
    image: "/IMG_1010.JPG",
    title: "Sukoon Experts: Mental Wellbeing",
    stars: "4.6",
    reviews: 300,
    buttonText: "Try <span className='font-boldFont'>FREE</span> Consultation",
    isDisabled: false,
    href: "/speak?category=expert",
    description:
      "Get confidential support from Community members with 10+ years of experience as Counselors and Coaches.",
  },
  {
    image: "/learn.jpg",
    title: "Community Events",
    buttonText: "Join Events for Free",
    isDisabled: false,
    stars: "4.6",
    reviews: 300,
    href: "/events",
    description: "Enjoy, learn, and connect with fellow community members at multiple group events every month",
  },
  // {
  //   image: "/stay-fit.jpg",
  //   title: "Stay fit with Saarthis",
  //   stars: "4.6",
  //   buttonText:'Coming Soon',
  //   isDisabled:true,
  //   reviews: 300,
  //   description:
  //     "Want to stay fit? Participate in group fitness challenges led by Sukoon Sarathis, put your best foot forward and become a lean mean machine! Get rewarded for feeling fab.",
  // },
];
export const gamesData: ConnectSarathiTypes[] = [
  {
    image: "/quiz/gk.jpeg",
    title: "Trivia Time",
    stars: "4.6",
    reviews: 300,
    type: "gk",
    buttonText: "Start Game",
    isPaid: true,
    isDisabled: false,
    game: true,
    description:
      "Expand your knowledge with our General Knowledge Quiz. Answer questions on various topics related to India and World affairs, and learn new things along with Saarthi!",
  },
  {
    image: "/quiz/entertainment.jpeg",
    title: "Filmy Beats",
    type: "entertainment",
    stars: "4.6",
    reviews: 300,
    buttonText: "Start Game",
    isPaid: true,
    isDisabled: false,
    game: true,
    description:
      "Test your movie knowledge with our fun quiz game! Experience Indian films, iconic actors and actresses, directors, music and unforgettable scenes with Saarthis and prove you're a true cinema buff.",
  },
  {
    image: "/quiz/culture.jpeg",
    title: "Vedic Mysteries",
    type: "culture",
    stars: "4.7",
    reviews: 300,
    buttonText: "Start Game",
    isPaid: true,
    isDisabled: false,
    game: true,
    description:
      "Engage with the timeless stories of Indian mythology and religious traditions through this quiz. Discover fascinating facts on ancient lore and deities with Saarthis.",
  },
  // {
  //   image: "/stay-fit.jpg",
  //   title: "Stay fit with Saarthis",
  //   stars: "4.6",
  //   buttonText:'Coming Soon',
  //   isDisabled:true,
  //   reviews: 300,
  //   description:
  //     "Want to stay fit? Participate in group fitness challenges led by Sukoon Sarathis, put your best foot forward and become a lean mean machine! Get rewarded for feeling fab.",
  // },
];
