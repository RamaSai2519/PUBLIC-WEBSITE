export interface NavLink {
  title: string;
  path: string;
  highlight?: boolean;
}

export const navLinks: NavLink[] = [
  { title: "Home", path: "/" },
  { title: "Sarathis", path: "/speak" },
  { title: "Counselors", path: "/coaches" },
  // { title: "Games with Sarathis", path: "/games" },
  { title: "Meetups", path: "/events" },
  { title: "Sukoon Corner", path: "https://blog.sukoonunlimited.com" },
  { title: "About us", path: "/about-us" },
];
export const menuLinks: NavLink[] = [
  // { title: "Profile", path: "/profile" },
  // { title: "Schedule", path: "/speak" },
  // { title: "Events", path: "/#events" },
];
