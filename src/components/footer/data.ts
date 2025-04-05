import { Icons } from "../Icons";
import { FooterTypes, SocialLinksTypes } from "./interface.footer";

export const links: FooterTypes[] = [
  { label: "Speak with Sarathis", link: "/speak" },
  { label: "Coaches", link: "/coaches" },
  { label: "Meetups", link: "/events" },
  { label: "Sukoon Assistant", link: "/concierge" },
  { label: "Club Sukoon", link: "/subscription" },
  { label: "About us", link: "/about-us" },
  { label: "Terms & Condition", link: "/terms-and-conditions" },
  { label: "Privacy Policy", link: "/privacy-policy" },
];

export const socialLinks: SocialLinksTypes[] = [
  {
    icon: Icons.facebook,
    link: "https://www.facebook.com/profile.php?id=61558380650436",
  },
  {
    icon: Icons.linkedIn,
    link: "https://www.linkedin.com/company/sukoon-unlimited/",
  },
  {
    icon: Icons.youtube,
    link: "https://www.youtube.com/@sukoon_Unlimited",
  },
  {
    icon: Icons.instagram,
    link: "https://www.instagram.com/sukoon_unlimited/",
  }
];
