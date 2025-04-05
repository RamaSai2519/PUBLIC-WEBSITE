import React, { useState } from "react";
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  MoneyCollectFilled,
  SoundFilled
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CurrencyRupee, Hail, Person3Rounded, PersonAddAlt, PersonalVideo } from "@mui/icons-material";
import { useAppSelector } from "@/store/store";

const TabNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");
    const userInfo = useAppSelector((state) => state.authUserReducer.data);
  const router = useRouter();

  console.log(userInfo, "USER INFO");
  const tabs = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: <HomeOutlined />,
      color: "#FFC629", // Yellow color for selected icon
    },
    {
      id: "sarathi",
      label: "sarathi",
      path: "/speak?category=sarathi",
      icon: <Person3Rounded />,
      color: "#FFC629",
    },
    
    {
        id: "expert",
        label: "Expert",
        path: "/speak?category=expert",
        icon: <Hail />,
        color: "#FFC629",
      },
      
    {
      id: "event",
      label: "Event",
      path: "/events",
      icon: <CalendarOutlined />,
      color: "#FFC629",
    },
    {
        id: "subscription",
        label: userInfo?._id ? userInfo?.name?.split(" ")[0] ||  'Hello!' : "Login",
        path: "/user",
        icon: <UserOutlined />,
        color: "#FFC629",
      },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black shadow-lg flex justify-around py-3 z-[999]">
      {tabs.map((tab) => (
        <Link href={tab.path} key={tab.id}>
        <button
          key={tab.id}
          onClick={() => {
            setActiveTab(tab.id);
            router.push(tab.path);
          }}
          className="flex flex-col items-center text-sm"
        >
          <div
            className={`text-2xl ${
              activeTab === tab.id ? `text-[${tab.color}]` : "text-white"
            }`}
          >
            {tab.icon}
          </div>
          <span
            className={`${
              activeTab === tab.id ? "text-[#FFC629]" : "text-gray-400"
            }`}
          >
            {tab.label}
          </span>
        </button>
        </Link>
      ))}
    </div>
  );
};

export default TabNavigation;
